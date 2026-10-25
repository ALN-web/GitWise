# GitWise — AI-Powered Release Intelligence

> **Ship smarter. Verify every change.**

[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.13-blue?logo=python)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.40+-FF4B4B?logo=streamlit)](https://streamlit.io/)
[![Pydantic](https://img.shields.io/badge/Pydantic-v2.8+-E92063?logo=pydantic)](https://docs.pydantic.dev/)
[![pytest](https://img.shields.io/badge/pytest-passed-success?logo=pytest)](https://pytest.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

GitWise is an AI-powered release intelligence platform with a **Python-first architecture** and **Streamlit UI**. It extracts merged GitHub pull requests, synthesizes structured weekly release notes, independently audits claims against AST diff tokens, catches omitted security changes, and eliminates ungrounded marketing hyperbole through automated feedback loops.

---

## 🌟 Architecture & Multi-Agent Pipeline

GitWise utilizes an evidence-grounded multi-agent pipeline with bounded feedback retries:

```mermaid
flowchart TD
    A[GitHub REST API / AST Tree] --> B[GitHub Researcher Agent]
    B -->|PullRequestEvidence[]| C[Release Note Drafter Agent]
    C -->|ReleaseNoteDraft| D[Independent Verification Checker Agent]
    D -->|Dual-Pass AST Audit| E{Audit Passed?}
    E -->|Yes: 100% Grounded| F[Final Verified Release Notes]
    E -->|No: Finding Errors| G{Retries < 3?}
    G -->|Yes: Structured Feedback| C
    G -->|No: Exhausted| H[Terminal Audit Report]
    F --> DB[(SQLite Run Repository)]
    DB --> UI[Streamlit Frontend]
```

### 1. GitHub Researcher Agent (`gitwise.agents.researcher`) — Teammate A
- Queries GitHub REST API (`GET /repos/{owner}/{repo}/pulls?state=closed`) or deterministic AST fixtures.
- Normalizes records into validated `PullRequestEvidence` models with commit SHAs, file additions, deletions, and AST diff patch hunks (`ChangedFileEvidence.patch`).

### 2. Release Note Drafter Agent (`gitwise.agents.drafter`) — Teammate B
- Groups changes into: *Features & Enhancements*, *Bug Fixes*, *Breaking Changes*, and *Security Patches*.
- Generates clickable source citations (`[#123](url)`) for every assertion.
- Corrects drafts based on structured feedback strings from the Checker.

### 3. Independent Verification Checker Agent (`gitwise.agents.checker`) — Teammate C
- Evaluates 4 core error vectors against raw code diffs:
  1. `invalid_ref` (Critical): Fabricated PR references not present in git tree.
  2. `missing` (High): Omitted in-scope security/feature PRs in target window.
  3. `unsupported` (Medium): Exaggerated superlatives not grounded in code diffs.
  4. `verified` (Low): Token-level semantic matches confirmed.
- Generates structured, deterministic `feedback_for_drafter` to guide retry convergence.

### 4. GitWise Orchestrator (`gitwise.orchestration.workflow`) — Teammate D
- Runs the feedback loop with a bounded limit of 3 retry iterations (`max_retries = 3`).
- Tracks attempt history (`attempts_history: list[OrchestratorAttempt]`) and outputs an immutable `WorkflowResult`.

### 5. SQLite Persistence Layer (`gitwise.persistence.repository`) — Teammate D
- Persists all executions, draft versions, and audit findings locally in SQLite (`gitwise_runs.db`).

### 6. Adversarial Evaluation Benchmark Suite (`gitwise.services.evaluation_service`) — Teammate C
- Continuous regression testing against the 3 core release note error vectors (`fabricated_ref`, `omit_security`, `hyperbole`).

---

## 🖥️ Streamlit Frontend Pages

The application is structured as a multi-page Streamlit application:

- **`gitwise/app.py`**: Overview, pipeline explanation, quick actions, and recent executions.
- **`1_🚀_Release_Generator.py`**: Interactive repository/date-range form, presets, live stage progress tracking, and Markdown release notes preview.
- **`2_🔍_Verification_Inspector.py`**: Claim-by-claim evidence audit, status badges (`VERIFIED`, `UNSUPPORTED`, `MISSING`, `INVALID_REF`), diff hunk inspection, and multi-attempt retry convergence logs.
- **`3_🧪_Evaluation_Lab.py`**: Reproducible adversarial benchmark suite runner with real-time detection rate, false-positive rate, and baseline comparison.
- **`4_📜_Run_History.py`**: SQLite historical run table with search, filtering, and deep inspection.

---

## 👥 Fellowship Team Workflow & GitHub Issues

All tasks are tracked under Milestone 1: [MVP — Verified Release Notes](https://github.com/ALN-web/GitWise/milestone/1).

| Issue | Title | Teammate Role | Recommended Branch | Link |
| :---: | :--- | :--- | :--- | :---: |
| **#1** | Define Shared Python Agent Contracts | Lead Architect | `feat/shared-contracts` | [Issue #1](https://github.com/ALN-web/GitWise/issues/1) |
| **#2** | Implement GitHub Researcher Agent | Teammate A (Data/API) | `feat/researcher-agent` | [Issue #2](https://github.com/ALN-web/GitWise/issues/2) |
| **#3** | Implement Release Note Drafter Agent | Teammate B (LLM/Synthesis) | `feat/drafter-agent` | [Issue #3](https://github.com/ALN-web/GitWise/issues/3) |
| **#4** | Implement Independent Verification Checker Agent | Teammate C (Critic/Verification) | `feat/checker-agent` | [Issue #4](https://github.com/ALN-web/GitWise/issues/4) |
| **#5** | Implement Python Workflow and Bounded Retries | Teammate D (Backend Lead) | `feat/python-orchestration` | [Issue #5](https://github.com/ALN-web/GitWise/issues/5) |
| **#6** | Build Reproducible Verification Evaluation Dataset | Teammate C (Critic/Evaluation) | `feat/eval-benchmark` | [Issue #6](https://github.com/ALN-web/GitWise/issues/6) |
| **#7** | Build Streamlit Release Generator and Preview | Teammate D (Frontend/Full-Stack) | `feat/streamlit-generator` | [Issue #7](https://github.com/ALN-web/GitWise/issues/7) |
| **#8** | Build Streamlit Verification Inspector and Evaluation Lab | Teammate E (UI/UX) | `feat/streamlit-inspector` | [Issue #8](https://github.com/ALN-web/GitWise/issues/8) |
| **#9** | End-to-End Testing, Documentation, and Fellowship Demo | All Teammates / QA Lead | `feat/e2e-demo` | [Issue #9](https://github.com/ALN-web/GitWise/issues/9) |
| **#10** | Persistence, Run History, and SQLite Reporting | Teammate D (Backend/DB) | `feat/sqlite-persistence` | [Issue #10](https://github.com/ALN-web/GitWise/issues/10) |

---

## 💻 Quickstart & Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ALN-web/GitWise.git
cd GitWise
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Automated Tests
```bash
pytest -v
```

### 4. Run Adversarial Benchmark Suite
```bash
python -m gitwise.evaluation.run_evaluation
```

### 5. Launch Streamlit Application
```bash
streamlit run gitwise/app.py
```

---

## 🧪 Adversarial Benchmark Results

Tested using `python -m gitwise.evaluation.run_evaluation`:

| Failure Vector | Injection Type | Expected Behavior | GitWise Outcome | Detection Rate |
| :--- | :--- | :--- | :--- | :---: |
| **#9841** | Fabricated PR Reference | Query git tree, confirm 0 commits, reject claim | `invalid_ref` flagged; dropped on retry #1 | **100%** |
| **#1415** | Omitted Security PR | Compare merged PRs vs draft, flag missing CVE | `missing` detected; CVE restored on retry #1 | **100%** |
| **#1435** | Marketing Hyperbole | Measure changed lines in diff, reject exaggerated claims | `unsupported` flagged; normalized to code diff | **100%** |

- **Detection Rate**: 100.0% (3/3 caught)
- **False Positive Rate**: 0.0%
- **Recovery Convergence**: 100.0% ($\le 2$ retries)

---

## 📄 License

MIT © [GitWise Team](https://github.com/ALN-web/GitWise)
