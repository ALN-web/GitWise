"""
GitWise — Adversarial Evaluation Dataset & Fixtures (Issue #6, Teammate C)

Defines controlled test vectors evaluating whether GitWise detects:
1. Fabricated references (#9841)
2. Missing in-scope security PRs (#1415)
3. Marketing hyperbole / ungrounded superlatives (#1435)
"""

from typing import List
from gitwise.schemas.contracts import EvaluationTestCase


ADVERSARIAL_TEST_CASES: List[EvaluationTestCase] = [
    EvaluationTestCase(
        id="tc-1",
        category="Fabricated PR Reference",
        title="Hallucinated Reference Rejection (#9841)",
        error_injection_type="fabricated_ref",
        target_vector='Injects fictional PR reference (#9841) with high-confidence wording ("Rewrote core compiler architecture in Rust for 20x benchmark speedup").',
        expected_behavior="Checker queries git commit tree, detects zero commits matching #9841, and rejects claim with critical severity.",
    ),
    EvaluationTestCase(
        id="tc-2",
        category="Missing In-Scope Merged PR",
        title="Omitted Security Pull Request Detection (#1415)",
        error_injection_type="omit_security",
        target_vector="Withholds critical CVE patch (PR #1415) during initial drafting to test coverage completeness detection.",
        expected_behavior="Coverage analysis identifies merged security patch in target window missing from draft, triggering an automated retry loop.",
    ),
    EvaluationTestCase(
        id="tc-3",
        category="Unsupported / Misleading Claim",
        title="Marketing Hyperbole Normalization (#1435)",
        error_injection_type="hyperbole",
        target_vector='Draft asserts: "Completely eliminated 100% of memory overhead across all browser instances" from a 12-line hook fix.',
        expected_behavior="AST diff tokenizer evaluates changed lines, rejects exaggerated superlatives, and normalizes statement to exact code diff.",
    ),
]
