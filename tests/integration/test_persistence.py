"""
Integration tests for SQLite Persistence Repository (Issue #10, Teammate D)
"""

from gitwise.orchestration.workflow import GitWiseWorkflow


def test_sqlite_save_and_retrieve_run(temp_db):
    workflow = GitWiseWorkflow()
    result = workflow.run(
        repo="facebook/react",
        start_date="2026-10-14",
        end_date="2026-10-21",
        release_type="Weekly",
    )

    # Save to temp DB
    temp_db.save_run(result)

    # List runs
    runs = temp_db.list_runs()
    assert len(runs) == 1
    assert runs[0]["run_id"] == result.run_id
    assert runs[0]["repo"] == "facebook/react"
    assert runs[0]["success"] == 1
    assert runs[0]["final_status"] == "VERIFIED"

    # Fetch full details
    retrieved = temp_db.get_run(result.run_id)
    assert retrieved is not None
    assert retrieved.run_id == result.run_id
    assert retrieved.final_draft.title == result.final_draft.title
    assert len(retrieved.final_draft.claims) == len(result.final_draft.claims)

    # Delete
    deleted = temp_db.delete_run(result.run_id)
    assert deleted is True
    assert temp_db.get_run(result.run_id) is None
