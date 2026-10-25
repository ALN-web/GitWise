# GitWise — AI-Powered Release Intelligence

> **Ship smarter. Verify every change.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

An AI-powered release intelligence platform that extracts merged GitHub pull requests, synthesizes structured weekly release notes, independently verifies claims against AST git diff hunks, catches omitted changes, and flags unsupported marketing hyperbole.

---

## 🌟 Architecture & Multi-Agent Pipeline

GitWise utilizes a multi-agent pipeline with bounded feedback retries to guarantee 100% diff-grounded accuracy:

```mermaid
flowchart TD
    A[GitHub API / AST Commit Tree] --> B[GitHub Researcher Agent]
    B -->|PullRequestEvidence[]| C[Release Note Drafter Agent]
    C -->|ReleaseNoteDraft| D[Independent Verification Checker Agent]
    D -->|Dual-Pass AST Audit| E{Audit Passed?}
    E -->|Yes: 100% Grounded| F[Verified Release Document]
    E -->|No: Errors Found| G{Retries < 3?}
    G -->|Yes: Feedback Injection| C
    G -->|No: Exhausted| H[Terminal Audit Report]
```

### 1. GitHub Researcher Agent (`src/agents/researcher.ts`)
- Ingests merged PRs from GitHub REST API (`GET /repos/{owner}/{repo}/pulls?state=closed`) or deterministic AST fixtures.
- Normalizes repository identifiers (`owner/repo`) and parses commit SHAs, file additions, deletions, and AST diff patch hunks.

### 2. Release Note Drafter Agent (`src/agents/drafter.ts`)
- Synthesizes user-facing release notes organized into standard sections (Highlights & Features, Bug Fixes, Breaking Changes, Security Patches).
- Generates verified source citations (`[#123](url)`) for every published claim.
- Ingests structured feedback from the Checker when retries occur to purge hallucinations or restore omitted PRs.

### 3. Independent Verification Checker Agent (`src/agents/checker.ts`)
- Operates as an adversarial critic auditing draft claims against AST diff tokens (`ChangedFileEvidence.patch`).
- Evaluates 4 core error vectors:
  1. `invalid_ref` (Critical): Fabricated PR references not present in git tree.
  2. `missing` (High): Omitted merged security/feature PRs in target time window.
  3. `unsupported` (Medium): Exaggerated superlatives ("completely eliminated overhead", "100%") not grounded in code diffs.
  4. `verified` (Low): Token-level semantic matches confirmed.
- Generates structured, deterministic `feedbackForDrafter` strings to guide subsequent retry attempts.

### 4. GitWise Orchestrator (`src/agents/orchestrator.ts`)
- Manages the end-to-end linear workflow with a hard limit of 3 retry loops (`maxRetries = 3`).
- Tracks attempt history (`OrchestratorAttempt[]`) and outputs an immutable `OrchestrationResult`.

### 5. Adversarial Evaluation Benchmark Suite (`src/agents/evaluation.ts`)
- Automated benchmark harness with 3 regression vectors (`fabricated_ref`, `omit_security`, `hyperbole`).
- Measures error detection rate, false-positive rate, and recovery convergence.

---

## 🧪 Adversarial Evaluation Results

| Test Vector | Injection Type | Expected Behavior | GitWise Outcome | Detection Rate |
| :--- | :--- | :--- | :--- | :---: |
| **#9841** | Fabricated PR Reference | Query git tree, confirm 0 commits, reject claim | `invalid_ref` flagged; dropped on retry #1 | **100%** |
| **#1415** | Omitted Security PR | Compare merged PRs vs draft, flag missing CVE | `missing` detected; CVE restored on retry #1 | **100%** |
| **#1435** | Marketing Hyperbole | Measure changed lines in diff, reject exaggerated claims | `unsupported` flagged; normalized to code diff | **100%** |

---

## 👥 Fellowship Team Management & GitHub Issues

All fellowship tasks are tracked under Milestone 1: [MVP — Verified Release Notes](https://github.com/ALN-web/GitWise/milestone/1).

| Issue | Title | Teammate Role | Recommended Branch |
| :---: | :--- | :--- | :--- |
| **[#1](https://github.com/ALN-web/GitWise/issues/1)** | Define Shared Agent Contracts and Data Schemas | Lead Architect | `feat/shared-contracts` |
| **[#2](https://github.com/ALN-web/GitWise/issues/2)** | Implement GitHub Researcher Agent | Teammate A (Data/API) | `feat/researcher-agent` |
| **[#3](https://github.com/ALN-web/GitWise/issues/3)** | Implement Release Note Drafter Agent | Teammate B (LLM/Synthesis) | `feat/drafter-agent` |
| **[#4](https://github.com/ALN-web/GitWise/issues/4)** | Implement Independent Verification Checker Agent | Teammate C (Critic/Verification) | `feat/checker-agent` |
| **[#5](https://github.com/ALN-web/GitWise/issues/5)** | Integrate Agents with Orchestration and Bounded Retries | Teammate D (Backend Lead) | `feat/orchestration-loop` |
| **[#6](https://github.com/ALN-web/GitWise/issues/6)** | Build Reproducible Verification Evaluation Dataset | Teammate C (Critic/Evaluation) | `feat/eval-benchmark` |
| **[#7](https://github.com/ALN-web/GitWise/issues/7)** | Integrate Frontend with Real Backend APIs | Teammate D (Frontend/Full-Stack) | `feat/frontend-orchestration` |
| **[#8](https://github.com/ALN-web/GitWise/issues/8)** | Build Verification Inspector and Evaluation UI | Teammate E (UI/UX) | `feat/verification-inspector` |
| **[#9](https://github.com/ALN-web/GitWise/issues/9)** | End-to-End Testing, Documentation, and Fellowship Demo | All Teammates / QA Lead | `feat/e2e-demo` |

---

## 💻 Quickstart & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Pipeline Test Suite
```bash
npm test
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 📐 Design System & UI Direction

- **Primary Blue Accent**: `#2563EB` (actions, badges, active tabs, focus rings)
- **Deep Navy Palette**: `#0B1220` (navbar, headers, raw preview), `#111C2E` (dark surface)
- **Clean Light Surfaces**: `#F7F8FA` (body background), `#FFFFFF` (cards & panels), `#E5E7EB` (subtle borders)
- **Semantic Statuses**:
  - `Verified`: Emerald `#10B981` / `#ECFDF5`
  - `Unsupported`: Amber `#F59E0B` / `#FFFBEB`
  - `Missing`: Rose `#F43F5E` / `#FFF1F2`
  - `Invalid Ref`: Red `#EF4444` / `#FEF2F2`
- **Typography**: Inter (modern sans-serif) + JetBrains Mono (diff hunks & commit hashes)

---

## 📄 License

MIT © [GitWise Team](https://github.com/ALN-web/GitWise)
