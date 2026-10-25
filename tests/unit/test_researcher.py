"""
Unit tests for GitHub Researcher Agent (Issue #2, Teammate A)
"""

import pytest
from gitwise.agents.researcher import GitHubResearcherAgent


def test_researcher_fetch_merged_prs():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    assert len(evidence) >= 4
    for pr in evidence:
        assert pr.number > 0
        assert pr.title
        assert pr.html_url.startswith("https://github.com/facebook/react/pull/")
        assert len(pr.changed_files) > 0
        assert pr.changed_files[0].patch is not None


def test_researcher_invalid_dates_validation():
    researcher = GitHubResearcherAgent()
    with pytest.raises(ValueError, match="cannot be after end date"):
        researcher.fetch_merged_pull_requests("facebook/react", "2026-10-21", "2026-10-14")


def test_researcher_empty_repo_validation():
    researcher = GitHubResearcherAgent()
    with pytest.raises(ValueError, match="cannot be empty"):
        researcher.fetch_merged_pull_requests("", "2026-10-14", "2026-10-21")
