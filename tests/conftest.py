"""
GitWise — pytest fixtures and configuration
"""

import os
import sys
import tempfile
import pytest

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from gitwise.integrations.github_client import GitHubClient
from gitwise.persistence.repository import SQLiteRunRepository


@pytest.fixture
def github_client():
    return GitHubClient()


@pytest.fixture
def temp_db():
    fd, path = tempfile.mkstemp(suffix=".db")
    os.close(fd)
    repo = SQLiteRunRepository(db_path=path)
    yield repo
    if os.path.exists(path):
        try:
            os.remove(path)
        except OSError:
            pass
