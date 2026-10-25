"""
GitWise — Streamlit Verification Inspector Page (Issue #8, Teammate E)
"""

import streamlit as st
from gitwise.services.release_service import ReleaseService
from gitwise.components.verification_panel import render_verification_panel

st.set_page_config(page_title="Verification Inspector — GitWise", page_icon="🔍", layout="wide")

st.title("🔍 Verification Inspector")
st.write("Inspect claim-by-claim grounding against git diff AST tokens, audit findings, and multi-attempt retry convergence logs.")

service = ReleaseService()
recent_runs = service.get_recent_runs(limit=30)

# Run Selection
selected_result = None

if recent_runs:
    run_options = {
        f"{r['run_id']} — {r['repo']} ({r['final_status']}, {r['created_at'][:19]})": r['run_id']
        for r in recent_runs
    }

    selected_label = st.selectbox(
        "Select an execution run to inspect:",
        options=list(run_options.keys()),
        index=0,
    )
    selected_run_id = run_options[selected_label]
    selected_result = service.get_run_details(selected_run_id)

elif "latest_result" in st.session_state:
    selected_result = st.session_state["latest_result"]

if selected_result:
    st.divider()
    render_verification_panel(selected_result)
else:
    st.info("No runs found to inspect. Head over to the Release Generator to run the pipeline first!")
    if st.button("Go to Release Generator ↗"):
        st.switch_page("pages/1_🚀_Release_Generator.py")
