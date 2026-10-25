"""
GitWise — Streamlit Verification Inspector Component
"""

import streamlit as st
from gitwise.schemas.contracts import WorkflowResult


def render_verification_panel(result: WorkflowResult):
    """Renders the evidence audit findings and multi-attempt retry trail."""
    checker = result.final_checker_result

    # Audit Banner
    if result.success:
        st.success(
            f"🛡️ **Evidence Audit Passed**: {checker.verified_count} of {len(result.final_draft.claims)} claims grounded in AST git diffs."
        )
    else:
        st.warning(
            f"⚠️ **Audit Warning**: {checker.invalid_ref_count} fabricated ref(s), {checker.missing_count} missing PR(s), {checker.unsupported_count} unsupported claim(s)."
        )

    # Detailed Findings by Claim
    st.subheader("🔎 Claim-Level Verification Audit")

    for finding in checker.findings:
        status_label = finding.status.upper()
        if finding.status == "verified":
            icon = "✅"
        elif finding.status == "unsupported":
            icon = "⚠️"
        elif finding.status == "missing":
            icon = "🚨"
        else:
            icon = "❌"

        with st.expander(f"{icon} [{status_label}] PR #{finding.pr_number}: {finding.claim_text[:80]}...", expanded=(finding.status != "verified")):
            st.markdown(f"**Explanation**: {finding.explanation}")
            st.markdown(f"**Severity**: `{finding.severity.upper()}` | **Check Type**: `{finding.check_type}` | **Confidence**: `{finding.confidence_score * 100:.0f}%`")
            if finding.action_taken:
                st.info(f"**Action Taken**: {finding.action_taken}")
            if finding.diff_evidence:
                st.caption(f"**Evidence AST Patch / Diff** (`{finding.source_file}`):")
                st.code(finding.diff_evidence, language="diff")
            if finding.pr_url:
                st.link_button(f"Open PR #{finding.pr_number} on GitHub", finding.pr_url)

    # Multi-Attempt Retry Trail
    if len(result.attempts_history) > 1:
        st.subheader(f"🔄 Orchestrator Convergence Trail ({result.attempts_count} Attempts)")
        st.write("Record of how automated checker feedback converged the draft into clean verification:")

        for attempt in result.attempts_history:
            st_passed = "PASSED" if attempt.checker_result.passed else "NEEDS_RETRY"
            with st.container():
                st.markdown(f"**Attempt #{attempt.attempt_number}** — Status: `{st_passed}` ({attempt.timestamp})")
                if attempt.retry_reason:
                    st.caption(f"Reason for Retry: {attempt.retry_reason}")
                if attempt.checker_result.feedback_for_drafter:
                    st.code(f"Injected Feedback:\n{attempt.checker_result.feedback_for_drafter}", language="text")
                st.divider()
