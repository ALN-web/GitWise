"""
GitWise — Streamlit Release Preview Component
"""

import streamlit as st
from gitwise.schemas.contracts import WorkflowResult


def render_release_preview(result: WorkflowResult):
    """Renders formatted release notes, download CTA, and claim summaries."""
    st.subheader(f"📄 {result.final_draft.title}")

    # Top metadata row
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Status", result.final_status)
    with col2:
        st.metric("Claims Evaluated", result.final_checker_result.total_claims_evaluated)
    with col3:
        st.metric("Grounding Ratio", f"{result.final_checker_result.grounded_ratio * 100:.0f}%")
    with col4:
        st.metric("Attempts Used", result.attempts_count)

    # Document Actions (Download / Raw view)
    st.download_button(
        label="📥 Download Release Notes (.md)",
        data=result.final_draft.markdown,
        file_name=f"release-notes-{result.repo.replace('/', '-')}-{result.start_date}.md",
        mime="text/markdown",
        use_container_width=True,
    )

    tab_rendered, tab_claims, tab_raw = st.tabs(["Rendered Markdown", "Claims List", "Raw Document"])

    with tab_rendered:
        st.markdown(result.final_draft.markdown)

    with tab_claims:
        st.write("Structured assertions extracted and grounded in source evidence:")
        for claim in result.final_draft.claims:
            with st.container():
                c1, c2 = st.columns([4, 1])
                with c1:
                    st.markdown(f"**PR #{claim.pr_number}**: {claim.text}")
                    if claim.cited_file:
                        st.caption(f"📁 Evidence file: `{claim.cited_file}`")
                with c2:
                    st.link_button("View PR ↗", claim.pr_url, use_container_width=True)
                st.divider()

    with tab_raw:
        st.code(result.final_draft.markdown, language="markdown")
