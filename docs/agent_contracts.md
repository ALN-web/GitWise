# GitWise — Shared Python Agent Contracts

All agents communicate through strict Pydantic v2 data models defined in `gitwise.schemas.contracts`.

---

## 1. Core Data Models

### `PullRequestEvidence`
```python
class ChangedFileEvidence(BaseModel):
    filename: str
    status: Literal['added', 'modified', 'removed', 'renamed'] = 'modified'
    additions: int = 0
    deletions: int = 0
    changes: int = 0
    patch: Optional[str] = None
    raw_diff_tokens: List[str] = []

class PullRequestEvidence(BaseModel):
    number: int
    title: str
    body: str = ""
    html_url: str
    merged_at: str
    author: str = "unknown"
    labels: List[str] = []
    changed_files: List[ChangedFileEvidence] = []
    commits_count: int = 1
    is_security_patch: bool = False
```

### `ReleaseNoteDraft` & `ReleaseClaim`
```python
class ReleaseClaim(BaseModel):
    id: str
    section: Literal['features', 'bugFixes', 'breakingChanges', 'internal']
    text: str
    pr_number: int
    pr_url: str
    cited_file: Optional[str] = None

class ReleaseNoteDraft(BaseModel):
    title: str
    repo: str
    start_date: str
    end_date: str
    release_type: Literal['Weekly', 'Minor Release', 'Major Release'] = 'Weekly'
    markdown: str
    claims: List[ReleaseClaim] = []
    generated_at: str
```

### `VerificationFinding` & `CheckerResult`
```python
FindingStatus = Literal['verified', 'unsupported', 'missing', 'invalid_ref']
FindingSeverity = Literal['low', 'medium', 'high', 'critical']

class VerificationFinding(BaseModel):
    id: str
    claim_id: Optional[str] = None
    claim_text: str
    pr_number: int
    pr_url: Optional[str] = None
    status: FindingStatus
    severity: FindingSeverity
    check_type: CheckType
    source_file: str = ""
    explanation: str
    diff_evidence: str = ""
    action_taken: str = ""
    correction_suggestion: Optional[str] = None
    confidence_score: float = 0.95

class CheckerResult(BaseModel):
    passed: bool
    status: Literal['VERIFIED', 'PARTIAL', 'FAILED']
    total_claims_evaluated: int
    verified_count: int
    unsupported_count: int
    missing_count: int
    invalid_ref_count: int
    grounded_ratio: float
    findings: List[VerificationFinding] = []
    feedback_for_drafter: Optional[str] = None
    timestamp: str
```

### `WorkflowResult`
```python
class WorkflowResult(BaseModel):
    run_id: str
    repo: str
    start_date: str
    end_date: str
    release_type: Literal['Weekly', 'Minor Release', 'Major Release']
    success: bool
    final_status: Literal['VERIFIED', 'PARTIAL', 'FAILED']
    attempts_count: int
    max_retries_enforced: int
    duration_ms: float
    evidence: List[PullRequestEvidence] = []
    final_draft: ReleaseNoteDraft
    final_checker_result: CheckerResult
    attempts_history: List[OrchestratorAttempt] = []
    created_at: str
```
