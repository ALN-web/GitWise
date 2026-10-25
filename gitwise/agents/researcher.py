"""
GitWise — GitHub Researcher Agent (Issue #2, Teammate A)

Responsible for:
- Retrieving merged GitHub pull requests for a repository and date window.
- Handling pagination, rate limits, and empty results.
- Normalizing source records into validated PullRequestEvidence Pydantic models.
- Preserving real PR numbers, commit counts, and AST file diff hunks.
- Never fabricating records.
"""

from typing import List, Optional
from gitwise.schemas.contracts import PullRequestEvidence
from gitwise.integrations.github_client import GitHubClient


class GitHubResearcherAgent:
    """Agent that extracts and normalizes merged PR evidence from GitHub."""

    def __init__(self, github_token: Optional[str] = None):
        self.client = GitHubClient(token=github_token)

    def fetch_merged_pull_requests(
        self,
        repo: str,
        start_date: str,
        end_date: str
    ) -> List[PullRequestEvidence]:
        """
        Retrieves all merged PRs within the date window.
        Returns validated PullRequestEvidence records with raw diff hunks.
        """
        if not repo or not repo.strip():
            raise ValueError("Repository identifier cannot be empty.")
        if not start_date or not end_date:
            raise ValueError("Both start_date and end_date must be provided.")
        if start_date > end_date:
            raise ValueError(f"Start date ({start_date}) cannot be after end date ({end_date}).")

        evidence = self.client.fetch_merged_pull_requests(repo, start_date, end_date)
        return evidence
