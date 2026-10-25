"""
GitWise — End-to-End Orchestrator Workflow (Issue #5, Teammate D)

Coordinates the multi-agent workflow:
Researcher -> Drafter -> Independent Checker -> Retry Decision -> Reporter
"""

import time
import random
from datetime import datetime, timezone
from typing import Optional, Callable, Literal
from gitwise.schemas.contracts import (
    WorkflowResult,
    OrchestratorAttempt,
    ReleaseNoteDraft,
    CheckerResult,
)
from gitwise.agents.researcher import GitHubResearcherAgent
from gitwise.agents.drafter import ReleaseNoteDrafterAgent
from gitwise.agents.checker import IndependentVerificationCheckerAgent
from gitwise.orchestration.retry_policy import RetryPolicy


class GitWiseWorkflow:
    """Orchestrates the release intelligence pipeline with bounded retries."""

    def __init__(self, github_token: Optional[str] = None):
        self.researcher = GitHubResearcherAgent(github_token=github_token)
        self.drafter = ReleaseNoteDrafterAgent()
        self.checker = IndependentVerificationCheckerAgent()

    def run(
        self,
        repo: str,
        start_date: str,
        end_date: str,
        release_type: Literal['Weekly', 'Minor Release', 'Major Release'] = 'Weekly',
        max_retries: int = 3,
        inject_test_error: Optional[Literal['fabricated_ref', 'omit_security', 'hyperbole']] = None,
        on_stage_change: Optional[Callable[[str], None]] = None,
    ) -> WorkflowResult:
        """
        Executes the linear agent pipeline with feedback retries.
        """
        start_time = time.time()
        run_id = f"GW-{random.randint(1000, 9999)}"
        policy = RetryPolicy(max_retries=max_retries)

        if on_stage_change:
            on_stage_change("1/4: Ingesting GitHub Pull Requests & AST diff tokens...")

        # Stage 1: Researcher retrieves PR evidence
        evidence = self.researcher.fetch_merged_pull_requests(repo, start_date, end_date)
        if not evidence:
            raise ValueError(f"No merged pull requests found for {repo} between {start_date} and {end_date}.")

        attempts_history: list[OrchestratorAttempt] = []
        current_attempt = 1
        feedback_for_drafter: Optional[str] = None

        latest_draft: Optional[ReleaseNoteDraft] = None
        latest_checker_result: Optional[CheckerResult] = None

        # Stage 2, 3 & 4: Bounded Retry Loop
        while current_attempt <= max_retries:
            if on_stage_change:
                on_stage_change(f"2/4: Drafting release notes (Attempt #{current_attempt}/{max_retries})...")

            # Apply test error injection only on attempt 1 if requested
            error_to_inject = inject_test_error if current_attempt == 1 else None

            latest_draft = self.drafter.generate_draft(
                evidence=evidence,
                repo=repo,
                start_date=start_date,
                end_date=end_date,
                release_type=release_type,
                feedback_from_checker=feedback_for_drafter,
                inject_test_error=error_to_inject,
            )

            if on_stage_change:
                on_stage_change(f"3/4: Independently verifying draft claims against diff hunks (Attempt #{current_attempt})...")

            latest_checker_result = self.checker.verify_draft(latest_draft, evidence)

            attempts_history.append(
                OrchestratorAttempt(
                    attempt_number=current_attempt,
                    timestamp=datetime.now(timezone.utc).isoformat(),
                    draft=latest_draft,
                    checker_result=latest_checker_result,
                    retry_reason=policy.get_retry_reason(latest_checker_result) if not latest_checker_result.passed else None,
                )
            )

            # Check convergence
            if latest_checker_result.passed:
                break

            # Check if budget permits retry
            if policy.should_retry(current_attempt, latest_checker_result):
                feedback_for_drafter = latest_checker_result.feedback_for_drafter
                current_attempt += 1
            else:
                # Retry budget exhausted
                break

        if on_stage_change:
            on_stage_change("4/4: Formatting final verified release report...")

        duration_ms = round((time.time() - start_time) * 1000, 2)

        return WorkflowResult(
            run_id=run_id,
            repo=repo,
            start_date=start_date,
            end_date=end_date,
            release_type=release_type,
            success=latest_checker_result.passed,
            final_status=latest_checker_result.status,
            attempts_count=len(attempts_history),
            max_retries_enforced=max_retries,
            duration_ms=duration_ms,
            evidence=evidence,
            final_draft=latest_draft,
            final_checker_result=latest_checker_result,
            attempts_history=attempts_history,
        )
