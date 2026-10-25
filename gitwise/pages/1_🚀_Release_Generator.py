"""
GitWise — Streamlit Release Generator Page (Issue #7, Teammate D)
"""

from datetime import datetime, date, timedelta
import streamlit as st

from gitwise.services.release_service import ReleaseService
from gitwise.components.release_preview import render_release_preview

st.set_page_config(page_title="Release Generator — GitWise", page_icon="🚀", layout="wide")

st.title("🚀 Release Generator")
st.write("Extract merged pull requests, synthesize categorized release notes, and audit claims against source git diffs.")

service = ReleaseService()

# Quick Presets
st.markdown("**Quick Presets:**")
p_col1, p_col2, p_col3 = st.columns(3)

default_repo = "facebook/react"
if p_col1.button("Preset: facebook/react", use_container_width=True):
    st.session_state["gen_repo"] = "facebook/react"
if p_col2.button("Preset: vercel/next.js", use_container_width=True):
    st.session_state["gen_repo"] = "vercel/next.js"
if p_col3.button("Preset: tailwindlabs/tailwindcss", use_container_width=True):
    st.session_state["gen_repo"] = "tailwindlabs/tailwindcss"

selected_repo = st.session_state.get("gen_repo", default_repo)

with st.form("release_form"):
    col1, col2 = st.columns([2, 1])

    with col1:
        repo_input = st.text_input(
            "GitHub Repository",
            value=selected_repo,
            help="Enter 'owner/repo' or the full GitHub URL",
        )

    with col2:
        release_type = st.selectbox(
            "Release Type",
            options=["Weekly", "Minor Release", "Major Release"],
            index=0,
        )

    d_col1, d_col2 = st.columns(2)
    with d_col1:
        start_date_val = st.date_input(
            "Start Date",
            value=date(2026, 10, 14),
        )
    with d_col2:
        end_date_val = st.date_input(
            "End Date",
            value=date(2026, 10, 21),
        )

    with st.expander("⚙️ Advanced Pipeline Settings"):
        max_retries = st.slider("Max Retry Budget", min_value=1, max_value=5, value=3)
        simulate_error = st.selectbox(
            "Simulate Adversarial Injection (for demonstration)",
            options=["None", "fabricated_ref (#9841)", "omit_security (#1415)", "hyperbole (#1435)"],
            index=0,
        )

    submitted = st.form_submit_button("Generate Verified Release Notes", type="primary", use_container_width=True)

if submitted:
    # 1. Validation
    if not repo_input or not repo_input.strip():
        st.error("Please enter a valid repository identifier.")
    elif start_date_val > end_date_val:
        st.error(f"Start date ({start_date_val}) cannot be after end date ({end_date_val}).")
    else:
        injection_type = None
        if "fabricated_ref" in simulate_error:
            injection_type = "fabricated_ref"
        elif "omit_security" in simulate_error:
            injection_type = "omit_security"
        elif "hyperbole" in simulate_error:
            injection_type = "hyperbole"

        start_str = start_date_val.isoformat()
        end_str = end_date_val.isoformat()

        # 2. Progress Tracker
        with st.status("Executing Multi-Agent Pipeline...", expanded=True) as status_box:
            def update_stage(msg: str):
                status_box.write(f"🔄 {msg}")

            try:
                result = service.generate_verified_release(
                    repo=repo_input.strip(),
                    start_date=start_str,
                    end_date=end_str,
                    release_type=release_type,
                    max_retries=max_retries,
                    inject_test_error=injection_type,
                    on_stage_change=update_stage,
                )

                if result.success:
                    status_box.update(label=f"✅ Release Notes Verified ({result.attempts_count} attempt(s))", state="complete", expanded=False)
                else:
                    status_box.update(label=f"⚠️ Pipeline Finished with Status: {result.final_status}", state="error", expanded=False)

                st.session_state["latest_result"] = result

            except Exception as e:
                status_box.update(label=f"❌ Pipeline Execution Failed", state="error", expanded=True)
                st.error(f"Error during execution: {str(e)}")

# Display Latest Result if available in session state
if "latest_result" in st.session_state:
    st.divider()
    res = st.session_state["latest_result"]
    render_release_preview(res)

    st.write("")
    if st.button("🔎 Deep Inspect in Verification Inspector ↗", use_container_width=True):
        st.switch_page("pages/2_🔍_Verification_Inspector.py")
