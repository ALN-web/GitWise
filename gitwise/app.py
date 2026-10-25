"""
GitWise — AI-Powered Release Intelligence (Main Entrypoint)
Tagline: Ship smarter. Verify every change.
"""

import streamlit as st
from gitwise.services.release_service import ReleaseService

# Configure Page
st.set_page_config(
    page_title="GitWise — AI-Powered Release Intelligence",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom Styling (Minimal, Linear/Vercel Developer SaaS aesthetic)
st.markdown("""
<style>
    .main-header {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #0B1220;
    }
    .badge-tag {
        background-color: #EFF6FF;
        color: #2563EB;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border: 1px solid #DBEAFE;
    }
</style>
""", unsafe_allow_html=True)

# Hero / Header
st.markdown('<span class="badge-tag">AI-Powered Release Intelligence</span>', unsafe_allow_html=True)
st.title("GitWise")
st.markdown("### **Ship smarter. Verify every change.**")
st.write(
    "GitWise converts merged GitHub pull requests into accurate, traceable weekly release notes, "
    "independently verifies claims against AST git diffs, catches omitted security patches, "
    "and eliminates ungrounded marketing hyperbole through automated feedback loops."
)

st.divider()

# Core Architecture & Agent Workflow
st.subheader("⚡ How the Multi-Agent Pipeline Works")

c1, c2, c3, c4 = st.columns(4)

with c1:
    st.markdown("#### 1. Ingest Evidence")
    st.caption("GitHub Researcher Agent")
    st.write("Extracts merged PRs, commit SHAs, file additions/deletions, and raw AST diff patch hunks.")

with c2:
    st.markdown("#### 2. Synthesize Draft")
    st.caption("Release Note Drafter Agent")
    st.write("Synthesizes categorized Markdown notes with direct source pull request hyperlinks.")

with c3:
    st.markdown("#### 3. Dual-Pass Audit")
    st.caption("Independent Checker Agent")
    st.write("Audits claims against code diffs to detect fabricated PRs, missing CVEs, or ungrounded claims.")

with c4:
    st.markdown("#### 4. Bounded Retry")
    st.caption("GitWise Orchestrator")
    st.write("Injects structured feedback back to the Drafter to achieve verified convergence (max 3 retries).")

st.divider()

# Quick Actions
st.subheader("🚀 Quick Actions")
col_a, col_b, col_c = st.columns(3)

with col_a:
    if st.button("Generate Release Notes ↗", use_container_width=True, type="primary"):
        st.switch_page("pages/1_🚀_Release_Generator.py")

with col_b:
    if st.button("Inspect Verification Proof ↗", use_container_width=True):
        st.switch_page("pages/2_🔍_Verification_Inspector.py")

with col_c:
    if st.button("Open Evaluation Lab ↗", use_container_width=True):
        st.switch_page("pages/3_🧪_Evaluation_Lab.py")

st.divider()

# Recent Real Runs Overview
st.subheader("📜 Recent Executions")
service = ReleaseService()
recent = service.get_recent_runs(limit=5)

if recent:
    st.dataframe(
        recent,
        column_config={
            "run_id": "Run ID",
            "repo": "Repository",
            "start_date": "From",
            "end_date": "To",
            "release_type": "Type",
            "final_status": "Status",
            "grounded_ratio": st.column_config.ProgressColumn("Grounded Ratio", min_value=0.0, max_value=1.0, format="%.0f%%"),
            "attempts_count": "Retries",
            "duration_ms": st.column_config.NumberColumn("Duration (ms)", format="%.0f ms"),
        },
        hide_index=True,
        use_container_width=True,
    )
else:
    st.info("No prior runs recorded in local SQLite database yet. Generate your first release note above!")
