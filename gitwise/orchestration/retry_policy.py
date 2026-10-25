"""
GitWise — Retry Policy Controller (Issue #5, Teammate D)

Controls retry conditions, budget exhaustion, and feedback propagation between agents.
"""

from typing import Optional
from gitwise.schemas.contracts import CheckerResult


class RetryPolicy:
    """Policy rules governing orchestrator retries and feedback convergence."""

    def __init__(self, max_retries: int = 3):
        self.max_retries = max_retries

    def should_retry(self, attempt_number: int, checker_result: CheckerResult) -> bool:
        """Determines if another drafting attempt should be executed."""
        if checker_result.passed:
            return False
        return attempt_number < self.max_retries

    def get_retry_reason(self, checker_result: CheckerResult) -> Optional[str]:
        """Summarizes why a retry was triggered."""
        if checker_result.passed:
            return None
        reasons = []
        if checker_result.invalid_ref_count > 0:
            reasons.append(f"{checker_result.invalid_ref_count} fabricated PR reference(s)")
        if checker_result.missing_count > 0:
            reasons.append(f"{checker_result.missing_count} missing in-scope PR(s)")
        if checker_result.unsupported_count > 0:
            reasons.append(f"{checker_result.unsupported_count} unsupported claim(s)")
        return "Audit issues detected: " + ", ".join(reasons)
