"""
GitWise — Streamlit Run History & Persistence Page (Issue #10, Teammate D)
"""

import streamlit as st
from gitwise.persistence.repository import SQLiteRunRepository
from gitwise.components.release_preview import render_release_preview

st.set_page_config(page_title="Run History — GitWise", page_icon="📜", layout="wide")

st.title("📜 Run History & Persistent Reports")
st.write("Browse and audit all previously generated release notes stored in the local SQLite database.")

repo_store = SQLiteRunRepository()
runs = repo_store.list_runs(limit=50)

if not runs:
    st.info("No runs found in database yet. Generate your first release notes in the Release Generator!")
    if st.button("Go to Release Generator ↗"):
        st.switch_page("pages/1_🚀_Release_Generator.py")
else:
    # Filter
    status_filter = st.selectbox("Filter by Status", options=["All", "VERIFIED", "PARTIAL", "FAILED"])

    filtered_runs = [
        r for r in runs
        if status_filter == "All" or r["final_status"] == status_filter
    ]

    st.dataframe(
        filtered_runs,
        column_config={
            "run_id": "Run ID",
            "repo": "Repository",
            "start_date": "Start Date",
            "end_date": "End Date",
            "release_type": "Type",
            "final_status": "Status",
            "grounded_ratio": st.column_config.ProgressColumn("Grounding Ratio", min_value=0.0, max_value=1.0, format="%.0f%%"),
            "total_claims": "Claims",
            "attempts_count": "Retries",
            "duration_ms": st.column_config.NumberColumn("Duration", format="%.0f ms"),
            "created_at": "Timestamp",
        },
        hide_index=True,
        use_container_width=True,
    )

    st.divider()

    # Detailed Inspection Selector
    st.subheader("🔍 Inspect a Historical Run")
    run_map = {f"{r['run_id']} — {r['repo']} ({r['final_status']})": r['run_id'] for r in filtered_runs}

    selected_choice = st.selectbox("Select Run ID to inspect:", options=list(run_map.keys()))
    if selected_choice:
        chosen_id = run_map[selected_choice]
        full_run = repo_store.get_run(chosen_id)

        if full_run:
            c_del, c_insp = st.columns([1, 4])
            with c_del:
                if st.button(f"🗑️ Delete Run {chosen_id}", type="secondary"):
                    repo_store.delete_run(chosen_id)
                    st.success(f"Run {chosen_id} deleted.")
                    st.rerun()

            render_release_preview(full_run)
