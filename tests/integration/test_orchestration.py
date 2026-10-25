"""
Integration tests for GitWise Orchestrator and Bounded Retries (Issue #5, Teammate D)
"""

from gitwise.orchestration.workflow import GitWiseWorkflow


def test_workflow_clean_run():
    workflow = GitWiseWorkflow()
    result = workflow.run(
        repo="facebook/react",
        start_date="2026-10-14",
        end_date="2026-10-21",
        release_type="Weekly",
    )

    assert result.success is True
    assert result.final_status == "VERIFIED"
    assert result.attempts_count == 1
    assert len(result.attempts_history) == 1
    assert result.final_checker_result.passed is True
    assert len(result.final_draft.claims) >= 4


def test_workflow_recovers_from_injected_error_via_retry():
    workflow = GitWiseWorkflow()
    result = workflow.run(
        repo="facebook/react",
        start_date="2026-10-14",
        end_date="2026-10-21",
        release_type="Weekly",
        inject_test_error="fabricated_ref",
        max_retries=3,
    )

    assert result.success is True
    assert result.final_status == "VERIFIED"
    # Attempt 1 caught error, attempt 2 recovered using feedback
    assert result.attempts_count == 2
    assert len(result.attempts_history) == 2
    assert result.attempts_history[0].checker_result.passed is False
    assert result.attempts_history[1].checker_result.passed is True
