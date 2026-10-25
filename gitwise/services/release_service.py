"""
GitWise — Release Service Layer

Connects user inputs, workflow execution, and persistent storage.
"""

from typing import Optional, Callable, List, Literal
from gitwise.schemas.contracts import WorkflowResult
from gitwise.orchestration.workflow import GitWiseWorkflow
from gitwise.persistence.repository import SQLiteRunRepository


class ReleaseService:
    """Service mediating release generation and historical run inspection."""

    def __init__(self, db_path: str = "gitwise_runs.db", github_token: Optional[str] = None):
        self.workflow = GitWiseWorkflow(github_token=github_token)
        self.repo_store = SQLiteRunRepository(db_path=db_path)

    def generate_verified_release(
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
        Executes end-to-end agent workflow and saves run to SQLite.
        """
        result = self.workflow.run(
            repo=repo,
            start_date=start_date,
            end_date=end_date,
            release_type=release_type,
            max_retries=max_retries,
            inject_test_error=inject_test_error,
            on_stage_change=on_stage_change,
        )

        # Persist run
        self.repo_store.save_run(result)
        return result

    def get_recent_runs(self, limit: int = 20) -> List[dict]:
        """Returns recent run history."""
        return self.repo_store.list_runs(limit=limit)

    def get_run_details(self, run_id: str) -> Optional[WorkflowResult]:
        """Fetches full run outcome for deep inspection."""
        return self.repo_store.get_run(run_id)
