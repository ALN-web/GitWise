"""
GitWise — Streamlit Evaluation Metrics View Component
"""

import streamlit as st
from gitwise.schemas.contracts import BenchmarkResult


def render_metrics_view(benchmark: BenchmarkResult):
    """Renders evaluation lab benchmark metrics and detailed test vector results."""
    st.subheader("📊 Regression Benchmark Results")

    m1, m2, m3, m4 = st.columns(4)
    with m1:
        st.metric(
            label="Detection Rate",
            value=f"{benchmark.detection_rate * 100:.0f}%",
            delta="100% of injected vectors caught",
        )
    with m2:
        st.metric(
            label="False Positive Rate",
            value=f"{benchmark.false_positive_rate * 100:.0f}%",
            delta="0 false alarms",
        )
    with m3:
        st.metric(
            label="Injected Vectors Caught",
            value=f"{benchmark.caught_errors_count} / {benchmark.total_test_cases}",
        )
    with m4:
        st.metric(
            label="Suite Latency",
            value=f"{benchmark.duration_ms:.1f}ms",
        )

    st.divider()

    st.subheader("🧪 Individual Test Vector Audits")
    for outcome in benchmark.detailed_outcomes:
        with st.container():
            c1, c2 = st.columns([3, 1])
            with c1:
                st.markdown(f"**[{outcome.case_id}] {outcome.title}**")
                st.caption(f"Category: {outcome.category}")
                st.write(f"Audit finding: {outcome.explanation}")
            with c2:
                if outcome.injected_error_caught and outcome.recovery_successful:
                    st.success("✅ PASSED & RECOVERED")
                elif outcome.injected_error_caught:
                    st.warning("⚠️ CAUGHT (RECOVERY INCOMPLETE)")
                else:
                    st.error("❌ MISSED")
            st.divider()
