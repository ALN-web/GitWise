"""
Unit tests for Independent Verification Checker Agent (Issue #4, Teammate C)
"""

from gitwise.agents.researcher import GitHubResearcherAgent
from gitwise.agents.drafter import ReleaseNoteDrafterAgent
from gitwise.agents.checker import IndependentVerificationCheckerAgent


def test_checker_clean_draft_passes():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    draft = drafter.generate_draft(evidence, "facebook/react", "2026-10-14", "2026-10-21")

    checker = IndependentVerificationCheckerAgent()
    result = checker.verify_draft(draft, evidence)

    assert result.passed is True
    assert result.status == "VERIFIED"
    assert result.grounded_ratio == 1.0
    assert result.invalid_ref_count == 0
    assert result.missing_count == 0
    assert result.unsupported_count == 0


def test_checker_catches_fabricated_pr():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    draft = drafter.generate_draft(
        evidence, "facebook/react", "2026-10-14", "2026-10-21", inject_test_error="fabricated_ref"
    )

    checker = IndependentVerificationCheckerAgent()
    result = checker.verify_draft(draft, evidence)

    assert result.passed is False
    assert result.invalid_ref_count == 1
    assert any(f.status == "invalid_ref" and f.pr_number == 9841 for f in result.findings)
    assert result.feedback_for_drafter is not None
    assert "9841" in result.feedback_for_drafter


def test_checker_catches_omitted_security_pr():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    draft = drafter.generate_draft(
        evidence, "facebook/react", "2026-10-14", "2026-10-21", inject_test_error="omit_security"
    )

    checker = IndependentVerificationCheckerAgent()
    result = checker.verify_draft(draft, evidence)

    assert result.passed is False
    assert result.missing_count == 1
    assert any(f.status == "missing" and f.pr_number == 1415 for f in result.findings)
    assert "1415" in result.feedback_for_drafter


def test_checker_catches_hyperbole():
    researcher = GitHubResearcherAgent()
    evidence = researcher.fetch_merged_pull_requests("facebook/react", "2026-10-14", "2026-10-21")

    drafter = ReleaseNoteDrafterAgent()
    draft = drafter.generate_draft(
        evidence, "facebook/react", "2026-10-14", "2026-10-21", inject_test_error="hyperbole"
    )

    checker = IndependentVerificationCheckerAgent()
    result = checker.verify_draft(draft, evidence)

    assert result.passed is False
    assert result.unsupported_count == 1
    assert any(f.status == "unsupported" and f.pr_number == 1435 for f in result.findings)
