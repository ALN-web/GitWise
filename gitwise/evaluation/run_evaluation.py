"""
GitWise — CLI Adversarial Evaluation Runner

Command-line tool to run reproducible verification benchmarks.
Usage:
    python -m gitwise.evaluation.run_evaluation
"""

import sys
from gitwise.services.evaluation_service import EvaluationService


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    print("\n" + "=" * 65)
    print("  GitWise - Adversarial Evaluation Benchmark Suite")
    print("=" * 65 + "\n")

    service = EvaluationService()
    result = service.run_suite()

    print(f"Total Test Cases Evaluated : {result.total_test_cases}")
    print(f"Injected Errors Caught     : {result.caught_errors_count} / {result.total_test_cases}")
    print(f"False Positives Count      : {result.false_positives_count}")
    print(f"Detection Rate             : {result.detection_rate * 100:.1f}%")
    print(f"False Positive Rate        : {result.false_positive_rate * 100:.1f}%")
    print(f"Execution Duration         : {result.duration_ms:.2f}ms\n")

    print("-" * 65)
    print("  Detailed Test Case Outcomes")
    print("-" * 65)
    for outcome in result.detailed_outcomes:
        status_icon = "[PASS]" if outcome.injected_error_caught and outcome.recovery_successful else "[FAIL]"
        print(f"\n[{outcome.case_id}] {outcome.title}")
        print(f"  Category       : {outcome.category}")
        print(f"  Result         : {status_icon}")
        print(f"  Error Caught   : {'Yes' if outcome.injected_error_caught else 'No'}")
        print(f"  Auto-Recovered : {'Yes (Converged via Retry)' if outcome.recovery_successful else 'No'}")
        print(f"  Findings Count : {outcome.findings_count}")
        print(f"  Audit Summary  : {outcome.explanation}")

    print("\n" + "=" * 65)
    if result.detection_rate == 1.0 and result.false_positive_rate == 0.0:
        print("  [PASS] ALL BENCHMARK TESTS PASSED (100% Detection & Recovery)")
        print("=" * 65 + "\n")
        sys.exit(0)
    else:
        print("  ✗ BENCHMARK REGRESSION DETECTED")
        print("=" * 65 + "\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
