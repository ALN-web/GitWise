"""
GitWise — Shared Pydantic Contracts and Data Schemas

Defines core data models across all agents, orchestrator, persistence, and Streamlit UI.
"""

from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class ChangedFileEvidence(BaseModel):
    """AST-level changed file and diff evidence."""
    filename: str
    status: Literal['added', 'modified', 'removed', 'renamed'] = 'modified'
    additions: int = 0
    deletions: int = 0
    changes: int = 0
    patch: Optional[str] = None
    raw_diff_tokens: List[str] = Field(default_factory=list)


class PullRequestEvidence(BaseModel):
    """Merged pull request record with associated code changes."""
    number: int
    title: str
    body: str = ""
    html_url: str
    merged_at: str
    author: str = "unknown"
    labels: List[str] = Field(default_factory=list)
    changed_files: List[ChangedFileEvidence] = Field(default_factory=list)
    commits_count: int = 1
    is_security_patch: bool = False


class ReleaseClaim(BaseModel):
    """An individual assertion in a release note linked to source evidence."""
    id: str
    section: Literal['features', 'bugFixes', 'breakingChanges', 'internal'] = 'features'
    text: str
    pr_number: int
    pr_url: str
    cited_file: Optional[str] = None


class ReleaseNoteDraft(BaseModel):
    """Synthesized release notes before or after independent verification."""
    title: str
    repo: str
    start_date: str
    end_date: str
    release_type: Literal['Weekly', 'Minor Release', 'Major Release'] = 'Weekly'
    markdown: str
    claims: List[ReleaseClaim] = Field(default_factory=list)
    generated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


FindingStatus = Literal['verified', 'unsupported', 'missing', 'invalid_ref']
FindingSeverity = Literal['low', 'medium', 'high', 'critical']
CheckType = Literal[
    'Deterministic AST Check',
    'Semantic Diff Analysis',
    'Coverage Completeness Check'
]


class VerificationFinding(BaseModel):
    """Audit result for a specific claim or missing pull request."""
    id: str
    claim_id: Optional[str] = None
    claim_text: str
    pr_number: int
    pr_url: Optional[str] = None
    status: FindingStatus
    severity: FindingSeverity
    check_type: CheckType = 'Deterministic AST Check'
    source_file: str = ""
    explanation: str
    diff_evidence: str = ""
    action_taken: str = ""
    correction_suggestion: Optional[str] = None
    confidence_score: float = 0.95


class CheckerResult(BaseModel):
    """Outcome of the Independent Verification Checker Agent."""
    passed: bool
    status: Literal['VERIFIED', 'PARTIAL', 'FAILED']
    total_claims_evaluated: int
    verified_count: int
    unsupported_count: int
    missing_count: int
    invalid_ref_count: int
    grounded_ratio: float  # 0.0 to 1.0
    findings: List[VerificationFinding] = Field(default_factory=list)
    feedback_for_drafter: Optional[str] = None
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class OrchestratorAttempt(BaseModel):
    """Log of a single drafting and verification iteration in the retry loop."""
    attempt_number: int
    timestamp: str
    draft: ReleaseNoteDraft
    checker_result: CheckerResult
    retry_reason: Optional[str] = None


class WorkflowResult(BaseModel):
    """Immutable final report delivered to the UI or persistence layer."""
    run_id: str
    repo: str
    start_date: str
    end_date: str
    release_type: Literal['Weekly', 'Minor Release', 'Major Release']
    success: bool
    final_status: Literal['VERIFIED', 'PARTIAL', 'FAILED']
    attempts_count: int
    max_retries_enforced: int
    duration_ms: float
    evidence: List[PullRequestEvidence] = Field(default_factory=list)
    final_draft: ReleaseNoteDraft
    final_checker_result: CheckerResult
    attempts_history: List[OrchestratorAttempt] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class EvaluationTestCase(BaseModel):
    """Adversarial test case for benchmarking verification accuracy."""
    id: str
    category: str
    title: str
    error_injection_type: Literal['fabricated_ref', 'omit_security', 'hyperbole']
    target_vector: str
    expected_behavior: str


class BenchmarkOutcome(BaseModel):
    """Result of running an individual adversarial test case."""
    case_id: str
    category: str
    title: str
    injected_error_caught: bool
    recovery_successful: bool
    findings_count: int
    initial_status: str
    final_status: str
    explanation: str


class BenchmarkResult(BaseModel):
    """Aggregated metrics across the entire adversarial benchmark suite."""
    total_test_cases: int
    caught_errors_count: int
    false_positives_count: int
    detection_rate: float
    false_positive_rate: float
    detailed_outcomes: List[BenchmarkOutcome] = Field(default_factory=list)
    duration_ms: float = 0.0
