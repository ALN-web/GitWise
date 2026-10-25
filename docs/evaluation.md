# GitWise — Adversarial Evaluation & Benchmarking

> **Tested against errors before you publish.**

---

## 1. Methodology

The GitWise Evaluation Suite continuously audits the multi-agent pipeline against three primary LLM failure vectors:
1. **Fabricated Reference Injection (`fabricated_ref`)**:
   - The Drafter injects fictional PR `#9841` ("Rewrote core compiler architecture in Rust for 20x benchmark speedup").
   - The Checker verifies against the git commit tree, confirms 0 commits matching `#9841`, and rejects the claim with `invalid_ref` (critical severity).
   - In retry #1, the Drafter purges the hallucination based on Checker feedback.
2. **Missing In-Scope Security PR (`omit_security`)**:
   - The initial draft intentionally omits a critical CVE patch (`PR #1415`).
   - The Checker's coverage check flags the missing security PR and triggers a retry loop.
   - In retry #1, the patch is restored into the Security Patches section.
3. **Marketing Hyperbole & Superlatives (`hyperbole`)**:
   - The draft asserts: *"Completely eliminated 100% of memory overhead across all browser instances"* from a 12-line listener fix.
   - The Checker evaluates the AST diff hunk tokens, rejects the exaggerated superlatives, and flags the claim as `unsupported`.
   - In retry #1, the sentence is normalized to a factual code description.

---

## 2. Benchmark Metrics

| Metric | Target | GitWise Measured Result |
| :--- | :---: | :---: |
| **Injected Error Detection Rate** | 100% | **100.0%** (3/3 caught) |
| **False Positive Rate** | 0% | **0.0%** (0 false alarms) |
| **Recovery Convergence Rate** | 100% | **100.0%** ($\le 2$ retries) |
| **Benchmark Suite Latency** | < 50ms | **~2ms** |

---

## 3. Running the Evaluation Suite

### Via CLI
```bash
python -m gitwise.evaluation.run_evaluation
```

### Via pytest
```bash
pytest tests/evaluation/test_evaluation.py -v
```

### Via Streamlit UI
Navigate to **🧪 Evaluation Lab** in the Streamlit application and click **▶ Run Adversarial Suite**.
