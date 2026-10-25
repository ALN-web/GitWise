"""
Tests for Adversarial Evaluation Benchmark Suite (Issue #6, Teammate C)
"""

from gitwise.services.evaluation_service import EvaluationService


def test_adversarial_suite_100_percent_detection():
    service = EvaluationService()
    result = service.run_suite()

    assert result.total_test_cases == 3
    assert result.caught_errors_count == 3
    assert result.detection_rate == 1.0
    assert result.false_positives_count == 0
    assert result.false_positive_rate == 0.0
    assert all(o.injected_error_caught and o.recovery_successful for o in result.detailed_outcomes)
