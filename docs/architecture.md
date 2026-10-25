# GitWise — Python-First Architecture & Design

> **GitWise — AI-Powered Release Intelligence**  
> *Ship smarter. Verify every change.*

---

## 1. System Overview

GitWise is an evidence-grounded release intelligence platform that extracts merged pull requests from GitHub, synthesizes categorized release notes, independently audits claims against AST diff tokens, and converges through automated feedback retries.

The platform is built with a **Python-first architecture** featuring:
- **Streamlit** for a modern developer-tool UI.
- **Pydantic v2** for strict data validation and contracts.
- **PyGithub / Requests** for GitHub REST API integration with deterministic fixture fallbacks.
- **SQLite** for local execution persistence and historical run inspection.
- **pytest** for automated unit, integration, and benchmark testing.

```mermaid
flowchart TD
    UI[Streamlit Web App (gitwise/app.py)] --> SRV[ReleaseService / EvaluationService]
    SRV --> ORCH[GitWiseWorkflow]
    ORCH --> RES[GitHub Researcher Agent]
    ORCH --> DRAFT[Release Note Drafter Agent]
    ORCH --> CHK[Independent Checker Agent]
    CHK -->|Audit Findings| RETRY{Audit Passed?}
    RETRY -->|Yes: Grounded| DB[(SQLite Database)]
    RETRY -->|No: Feedback| DRAFT
    DB --> UI
```

---

## 2. Directory Structure

```
gitwise/
  __init__.py
  app.py                         # Streamlit landing & overview
  pages/
    1_🚀_Release_Generator.py     # Main form + generation + preview
    2_🔍_Verification_Inspector.py # Evidence audit + claim diff viewer
    3_🧪_Evaluation_Lab.py        # Adversarial benchmark suite runner
    4_📜_Run_History.py           # SQLite persistence & historical inspection
  components/
    release_preview.py           # Markdown preview component
    verification_panel.py        # Audit findings & retry trail component
    metrics_view.py              # Benchmark metric cards component
  agents/
    researcher.py                # GitHub Researcher Agent
    drafter.py                   # Release Note Drafter Agent
    checker.py                   # Independent Verification Checker Agent
  orchestration/
    workflow.py                  # End-to-end multi-agent orchestrator
    retry_policy.py              # Bounded retry budget controller
  integrations/
    github_client.py             # GitHub API client & AST fixtures
    llm_client.py                # LLM synthesis interface
  schemas/
    contracts.py                 # Pydantic models (PullRequestEvidence, etc.)
  services/
    release_service.py           # Application service layer
    evaluation_service.py        # Benchmark suite runner service
  persistence/
    repository.py                # SQLite repository
  evaluation/
    fixtures/
      adversarial_cases.py       # Benchmark injection vectors
    run_evaluation.py            # Standalone CLI evaluation tool
tests/
  unit/                          # Unit tests for each agent
  integration/                   # Workflow & persistence tests
  evaluation/                    # Benchmark suite tests
requirements.txt
.env.example
README.md
```

---

## 3. Multi-Agent Pipeline Execution

1. **Researcher Agent (`gitwise.agents.researcher`)**:
   - Queries `GET /repos/{owner}/{repo}/pulls?state=closed` within the requested date window.
   - Extracts commit SHAs, author identity, merge timestamps, changed filenames, additions/deletions, and AST diff patch hunks (`ChangedFileEvidence.patch`).
   - Normalizes into `PullRequestEvidence` models.
2. **Drafter Agent (`gitwise.agents.drafter`)**:
   - Groups changes into: *Features & Enhancements*, *Bug Fixes*, *Breaking Changes*, and *Security Patches*.
   - Attaches explicit source PR hyperlinks (`[#123](url)`) and evidence file diff citations.
   - Adjusts claims in response to structured feedback from the Checker.
3. **Independent Checker Agent (`gitwise.agents.checker`)**:
   - Compares drafted claims against AST diff tokens and merged PR numbers.
   - Identifies:
     - `invalid_ref` (Critical): Fabricated PRs not present in git tree.
     - `missing` (High): In-scope PRs omitted from the draft.
     - `unsupported` (Medium): Exaggerated superlatives not grounded in diff hunks.
     - `verified` (Low): Token-level semantic matches confirmed.
   - Produces structured `feedback_for_drafter` for automated retry recovery.
4. **GitWise Orchestrator (`gitwise.orchestration.workflow`)**:
   - Enforces a maximum retry budget ($\le 3$ retries).
   - Records each attempt and its audit result in `attempts_history`.
   - Returns immutable `WorkflowResult`.
5. **Persistence Layer (`gitwise.persistence.repository`)**:
   - Automatically saves completed runs and audit findings to SQLite for auditability.
