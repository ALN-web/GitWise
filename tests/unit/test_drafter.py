"""
Unit tests for Release Note Drafter Agent (Issue #3, Teammate B)
"""

from gitwise.agents.researcher import GitHubResearcherAgent
from gitwise.agents.drafter import ReleaseNoteDrafterAgent


def test_drafter_generates_markdown_with_citations():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    draft = drafter.generate_draft(
        evidence=evidence,
        repo="facebook/react",
        start_date="2026-10-14",
        end_date="2026-10-21",
        release_type="Weekly",
    )

    assert "Release Notes — facebook/react (Weekly)" in draft.title
    assert len(draft.claims) >= 4
    assert "Features & Enhancements" in draft.markdown
    assert "Bug Fixes" in draft.markdown
    assert "Security Patches" in draft.markdown
    assert "https://github.com/facebook/react/pull/" in draft.markdown


def test_drafter_error_injection_fabricated_ref():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    corrupt_draft = drafter.generate_draft(
        evidence=evidence,
        repo="facebook/react",
        start_date="2026-10-14",
        end_date="2026-10-21",
        inject_test_error="fabricated_ref",
    )

    assert any(c.pr_number == 9841 for c in corrupt_draft.claims)
    assert "#9841" in corrupt_draft.markdown


def test_drafter_error_recovery_with_feedback():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    recovered_draft = drafter.generate_draft(
        evidence=evidence,
        repo="facebook/react",
        start_date="2026-10-14",
        end_date="2026-10-21",
        feedback_from_checker="PR(s) [9841] not present in git tree. Drop these fabricated references immediately.",
    )

    assert not any(c.pr_number == 9841 for c in recovered_draft.claims)
    assert "#9841" not in recovered_draft.markdown
