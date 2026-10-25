# GitWise — AI Agent Architecture & Shared Contracts

**GitWise** — *Ship smarter. Verify every change.*  
AI-powered release intelligence that retrieves merged GitHub pull requests, synthesizes structured release notes, independently verifies claims against AST diff evidence, detects missing changes and unsupported claims, and delivers high-fidelity release documentation.

---

## 1. Multi-Agent Pipeline Overview

The system operates as an evidence-grounded agent pipeline with bounded feedback retries:

```mermaid
flowchart TD
    A[GitHub Repository / Time Window] --> B[GitHub Researcher Agent]
    B -->|PullRequestEvidence[]| C[Release Note Drafter Agent]
    C -->|ReleaseNoteDraft| D[Independent Verification Checker Agent]
    D -->|AST Diff Ground Truth Audit| E{Audit Passed?}
    E -->|Yes: 100% Grounded| F[Final Verified Release Notes]
    E -->|No: Finding Errors| G{Retries < 3?}
    G -->|Yes: Inject Feedback| C
    G -->|No: Exhausted| H[Terminal Audit Warning Report]
```

### 1.1 Separation of Concerns
1. **GitHub Researcher Agent (`src/agents/researcher.ts`)**:
   - Queries GitHub REST API (`GET /repos/{owner}/{repo}/pulls?state=closed`) or deterministic AST fixtures.
   - Extracts commit SHAs, author identity, merge timestamps, changed filenames, status additions/deletions, and raw AST diff patch hunks.
2. **Release Note Drafter Agent (`src/agents/drafter.ts`)**:
   - Synthesizes user-facing release notes organized into standard sections (Highlights & Features, Bug Fixes, Breaking Changes, Security Patches).
   - Generates explicit GitHub markdown citations for every claim (`[#123](url)`).
   - Ingests structured feedback from the Checker when retries occur to purge hallucinations or restore omitted PRs.
3. **Independent Verification Checker Agent (`src/agents/checker.ts`)**:
   - Acts as an adversarial ground-truth critic.
   - Audits each claim against raw diff tokens (`ChangedFileEvidence.patch`) and merged PR list.
   - Detects 4 core error classes: `invalid_ref`, `missing`, `unsupported`, and `verified`.
   - Generates structured, deterministic `feedbackForDrafter` strings to guide subsequent retry attempts.
4. **GitWise Orchestrator (`src/agents/orchestrator.ts`)**:
   - Coordinates the loop with a hard limit of 3 retry iterations (`maxRetries = 3`).
   - Tracks iteration history (`OrchestratorAttempt[]`) for auditability.
   - Yields an immutable `OrchestrationResult`.
5. **Adversarial Evaluation Suite (`src/agents/evaluation.ts`)**:
   - Automated benchmark harness with 3 regression vectors (`fabricated_ref`, `omit_security`, `hyperbole`).
   - Measures error detection rate, false-positive rate, and recovery convergence.

---

## 2. Shared Data Contracts (`src/agents/contracts.ts`)

All agents communicate strictly through typed interfaces:

### `PullRequestEvidence`
```typescript
export interface ChangedFileEvidence {
  filename: string;
  status: 'added' | 'modified' | 'removed' | 'renamed';
  additions: number;
  deletions: number;
  patch?: string; // AST diff hunk
}

export interface PullRequestEvidence {
  number: number;
  title: string;
  body: string;
  author: string;
  mergedAt: string;
  labels: string[];
  htmlUrl: string;
  files: ChangedFileEvidence[];
}
```

### `ReleaseNoteDraft` & `ReleaseClaim`
```typescript
export interface ReleaseClaim {
  id: string;
  category: string;
  summary: string;
  prNumber: number;
  prUrl: string;
  associatedHunks?: string[];
  groundingStatus?: 'verified' | 'unsupported' | 'missing' | 'invalid_ref';
}

export interface ReleaseNoteDraft {
  title: string;
  markdown: string;
  categories: {
    category: string;
    items: ReleaseClaim[];
  }[];
  generatedAt: string;
}
```

### `VerificationFinding` & `CheckerResult`
```typescript
export interface VerificationFinding {
  id: string;
  claimId?: string;
  prNumber?: number;
  status: 'verified' | 'unsupported' | 'missing' | 'invalid_ref';
  severity: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  evidenceToken?: string;
  confidence: number;
}

export interface CheckerResult {
  passed: boolean;
  status: 'VERIFIED' | 'NEEDS_RETRY' | 'REJECTED';
  coverageRate: number; // 0.0 - 1.0
  groundingRate: number; // 0.0 - 1.0
  findings: VerificationFinding[];
  feedbackForDrafter?: string;
  timestamp: string;
}
```

### `OrchestrationResult`
```typescript
export interface OrchestratorAttempt {
  attemptNumber: number;
  draft: ReleaseNoteDraft;
  checkerResult: CheckerResult;
  retryReason?: string;
  timestamp: string;
}

export interface OrchestrationResult {
  repo: string;
  startDate: string;
  endDate: string;
  releaseType: string;
  retriesUsed: number;
  finalDraft: ReleaseNoteDraft;
  finalCheckerResult: CheckerResult;
  attempts: OrchestratorAttempt[];
  passed: boolean;
  totalDurationMs: number;
}
```

---

## 3. Error Vectors & Verification Rules

| Error Class | Severity | Detection Mechanism | Drafter Recovery Action |
| :--- | :--- | :--- | :--- |
| **`invalid_ref`** | `critical` | Checker verifies PR number exists in `evidence[]`. If missing from git tree, flags hallucination. | Dropped from draft completely. |
| **`missing`** | `high` | Checker compares all in-scope merged PR numbers against cited PR numbers in draft. | Injected into appropriate category based on PR title and labels. |
| **`unsupported`** | `medium` | Tokenizer searches for marketing superlatives ("completely eliminated", "100%", "20x") not grounded in small diff hunks. | Normalized to factual, diff-grounded description. |
| **`verified`** | `low` | Diff tokens and identifiers in claim match AST diff patch hunks with $\ge 90\%$ confidence. | Approved for publication. |

---

## 4. Teammate Ownership & GitHub Issues

All tasks are tracked in GitHub Milestone 1: [MVP — Verified Release Notes](https://github.com/ALN-web/GitWise/milestone/1).

| Issue | Title | Teammate Role | Branch |
| :--- | :--- | :--- | :--- |
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

## 5. Local Reproduction & Testing

### Run Pipeline Tests
```bash
npm test
```

### Build Production Bundle
```bash
npm run build
```

### Start Development Server
```bash
npm run dev
```
