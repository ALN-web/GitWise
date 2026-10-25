/**
 * GitWise Shared Agent Contracts and Data Schemas
 *
 * Defines common input/output interfaces across the 3 AI agents:
 * - Researcher Agent (PR extraction & diff normalization)
 * - Drafter Agent (categorized release notes with source citations)
 * - Checker Agent (independent AST diff evidence verification)
 * - Orchestrator (workflow & bounded retries)
 */

export interface ChangedFileEvidence {
  filename: string;
  status: 'added' | 'modified' | 'removed' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  rawDiffTokens?: string[];
}

export interface PullRequestEvidence {
  number: number;
  title: string;
  body: string;
  htmlUrl: string;
  mergedAt: string;
  author: string;
  labels: string[];
  changedFiles: ChangedFileEvidence[];
  commitsCount: number;
  isSecurityPatch?: boolean;
}

export interface ReleaseClaim {
  id: string;
  section: 'features' | 'bugFixes' | 'breakingChanges' | 'internal';
  text: string;
  prNumber: number;
  prUrl: string;
  citedFile?: string;
}

export interface ReleaseNoteDraft {
  title: string;
  repo: string;
  window: {
    startDate: string;
    endDate: string;
  };
  releaseType: 'Weekly' | 'Minor Release' | 'Major Release';
  markdown: string;
  claims: ReleaseClaim[];
}

export type FindingStatus = 'verified' | 'unsupported' | 'missing' | 'invalid_ref';
export type CheckType = 'Deterministic AST Check' | 'Semantic Diff Analysis' | 'Coverage Completeness Check';
export type FindingSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface VerificationFinding {
  id: string;
  claimId?: string;
  claimText: string;
  prNumber: number;
  prUrl?: string;
  status: FindingStatus;
  severity: FindingSeverity;
  checkType: CheckType;
  sourceFile: string;
  explanation: string;
  diffEvidence: string;
  actionTaken: string;
  correctionSuggestion?: string;
  confidenceScore?: number;
}

export interface CheckerResult {
  passed: boolean;
  status: 'VERIFIED' | 'PARTIAL' | 'FAILED';
  totalClaimsEvaluated: number;
  verifiedCount: number;
  unsupportedCount: number;
  missingCount: number;
  invalidRefCount: number;
  groundedRatio: number; // 0.0 to 1.0
  findings: VerificationFinding[];
  feedbackForDrafter?: string;
}

export interface OrchestratorAttempt {
  attemptNumber: number;
  timestamp: string;
  draft: ReleaseNoteDraft;
  checkerResult: CheckerResult;
  retryReason?: string;
}

export interface OrchestrationResult {
  runId: string;
  repo: string;
  startDate: string;
  endDate: string;
  releaseType: 'Weekly' | 'Minor Release' | 'Major Release';
  success: boolean;
  finalStatus: 'VERIFIED' | 'PARTIAL' | 'FAILED';
  attemptsCount: number;
  maxRetriesEnforced: number;
  durationMs: number;
  evidence: PullRequestEvidence[];
  finalDraft: ReleaseNoteDraft;
  finalCheckerResult: CheckerResult;
  attemptsHistory: OrchestratorAttempt[];
}

export interface OrchestrationOptions {
  maxRetries?: number; // default 3
  githubToken?: string;
  deterministicMode?: boolean; // default true
  onStageChange?: (stage: string) => void;
  injectTestError?: 'fabricated_ref' | 'omit_security' | 'hyperbole';
}
