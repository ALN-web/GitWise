"""
GitWise — SQLite Persistence Repository (Issue #10, Teammate D)

Stores execution history, verification outcomes, and generated markdown locally in SQLite.
"""

import json
import sqlite3
from typing import List, Optional
from gitwise.schemas.contracts import WorkflowResult


class SQLiteRunRepository:
    """Repository managing local storage of GitWise release runs."""

    def __init__(self, db_path: str = "gitwise_runs.db"):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        """Initializes tables for runs and verification reports."""
        with self._get_connection() as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS runs (
                    run_id TEXT PRIMARY KEY,
                    repo TEXT NOT NULL,
                    start_date TEXT NOT NULL,
                    end_date TEXT NOT NULL,
                    release_type TEXT NOT NULL,
                    success INTEGER NOT NULL,
                    final_status TEXT NOT NULL,
                    attempts_count INTEGER NOT NULL,
                    duration_ms REAL NOT NULL,
                    grounded_ratio REAL NOT NULL,
                    total_claims INTEGER NOT NULL,
                    created_at TEXT NOT NULL,
                    raw_result_json TEXT NOT NULL
                )
            """)
            conn.commit()

    def save_run(self, result: WorkflowResult) -> None:
        """Persists a completed release generation run."""
        with self._get_connection() as conn:
            conn.execute("""
                INSERT OR REPLACE INTO runs (
                    run_id, repo, start_date, end_date, release_type,
                    success, final_status, attempts_count, duration_ms,
                    grounded_ratio, total_claims, created_at, raw_result_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                result.run_id,
                result.repo,
                result.start_date,
                result.end_date,
                result.release_type,
                1 if result.success else 0,
                result.final_status,
                result.attempts_count,
                result.duration_ms,
                result.final_checker_result.grounded_ratio,
                result.final_checker_result.total_claims_evaluated,
                result.created_at,
                result.model_dump_json(),
            ))
            conn.commit()

    def list_runs(self, limit: int = 50) -> List[dict]:
        """Lists metadata of recent runs sorted by creation time."""
        with self._get_connection() as conn:
            cursor = conn.execute("""
                SELECT run_id, repo, start_date, end_date, release_type,
                       success, final_status, attempts_count, duration_ms,
                       grounded_ratio, total_claims, created_at
                FROM runs
                ORDER BY created_at DESC
                LIMIT ?
            """, (limit,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

    def get_run(self, run_id: str) -> Optional[WorkflowResult]:
        """Loads the full WorkflowResult for a given run ID."""
        with self._get_connection() as conn:
            cursor = conn.execute("""
                SELECT raw_result_json FROM runs WHERE run_id = ?
            """, (run_id,))
            row = cursor.fetchone()
            if not row:
                return None
            data = json.loads(row["raw_result_json"])
            return WorkflowResult.model_validate(data)

    def delete_run(self, run_id: str) -> bool:
        """Deletes a run by ID."""
        with self._get_connection() as conn:
            cursor = conn.execute("DELETE FROM runs WHERE run_id = ?", (run_id,))
            conn.commit()
            return cursor.rowcount > 0
