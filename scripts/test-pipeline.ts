/**
 * GitWise — AI Agent Pipeline Verification Test Suite
 * 
 * Verifies all 5 architectural components:
 * 1. GitHub Researcher Agent (PR ingest & AST patch extraction)
 * 2. Release Note Drafter Agent (Categorization & source citations)
 * 3. Independent Verification Checker Agent (AST ground truth audit)
 * 4. GitWise Orchestrator (Feedback-driven bounded retry convergence)
 * 5. Adversarial Evaluation Benchmark Suite (Regression vectors)
 */

import { GitHubResearcherAgent } from '../src/agents/researcher';
import { ReleaseNoteDrafterAgent } from '../src/agents/drafter';
import { IndependentVerificationCheckerAgent } from '../src/agents/checker';
import { GitWiseOrchestrator } from '../src/agents/orchestrator';
import { EvaluationRunner } from '../src/agents/evaluation';

async function runTests() {
  console.log('\n======================================================');
  console.log('  GitWise — AI Agent Pipeline Test Suite');
  console.log('======================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      process.exitCode = 1;
    }
  }

  // --- Test 1: GitHub Researcher Agent ---
  console.log('[1/5] Testing GitHub Researcher Agent...');
  const researcher = new GitHubResearcherAgent();
  const repo = 'facebook/react';
  const evidence = await researcher.fetchMergedPullRequests(repo, '2026-10-14', '2026-10-21');
  
  assert(evidence.length >= 4, `Researcher extracted ${evidence.length} merged PRs (expected >= 4)`);
  assert(evidence.every(pr => pr.number > 0 && pr.title && pr.changedFiles && pr.changedFiles.length > 0), 'Every PR contains valid title, number, and AST file hunks');
  const sampleHunk = evidence[0].changedFiles[0].patch;
  assert(typeof sampleHunk === 'string' && sampleHunk.length > 0, 'AST diff hunk token is present for evidence checking');

  // --- Test 2: Release Note Drafter Agent ---
  console.log('\n[2/5] Testing Release Note Drafter Agent...');
  const drafter = new ReleaseNoteDrafterAgent();
  const draft = drafter.generateDraft(evidence, { repo, startDate: '2026-10-14', endDate: '2026-10-21' });

  assert(draft.title.includes(repo), `Draft title specifies repo correctly: "${draft.title}"`);
  assert(draft.claims.length >= 2, `Draft contains ${draft.claims.length} structured claims`);
  assert(draft.markdown.includes('Features & Enhancements'), 'Markdown contains Features & Enhancements section');
  assert(draft.markdown.includes('Bug Fixes'), 'Markdown contains Bug Fixes section');
  assert(draft.markdown.includes(`https://github.com/${repo}/pull/`), 'Markdown contains explicit PR citation hyperlinks');

  // --- Test 3: Independent Verification Checker Agent ---
  console.log('\n[3/5] Testing Independent Verification Checker Agent...');
  const checker = new IndependentVerificationCheckerAgent();
  
  // Clean draft verification
  const cleanCheck = checker.verifyDraft(draft, evidence);
  assert(cleanCheck.passed === true, 'Checker marks clean draft as PASSED');
  assert(cleanCheck.groundedRatio === 1.0, 'Clean draft achieves 100% grounding rate');
  assert(cleanCheck.missingCount === 0, 'Clean draft achieves 100% PR coverage rate');

  // Adversarial Error Injection 1: Fabricated PR reference (#9841)
  const corruptDraft1 = drafter.generateDraft(evidence, { repo, startDate: '2026-10-14', endDate: '2026-10-21', injectTestError: 'fabricated_ref' });
  const check1 = checker.verifyDraft(corruptDraft1, evidence);
  assert(check1.passed === false, 'Checker REJECTS fabricated PR reference');
  assert(check1.findings.some(f => f.status === 'invalid_ref' && f.prNumber === 9841), 'Checker identifies specific fabricated PR #9841 with invalid_ref');

  // Adversarial Error Injection 2: Omitted Security PR (#1415)
  const corruptDraft2 = drafter.generateDraft(evidence, { repo, startDate: '2026-10-14', endDate: '2026-10-21', injectTestError: 'omit_security' });
  const check2 = checker.verifyDraft(corruptDraft2, evidence);
  assert(check2.passed === false, 'Checker detects omitted security PR');
  assert(check2.findings.some(f => f.status === 'missing' && f.prNumber === 1415), 'Checker flags missing PR #1415');

  // Adversarial Error Injection 3: Hyperbole / Exaggerated claims (#1435)
  const corruptDraft3 = drafter.generateDraft(evidence, { repo, startDate: '2026-10-14', endDate: '2026-10-21', injectTestError: 'hyperbole' });
  const check3 = checker.verifyDraft(corruptDraft3, evidence);
  assert(check3.passed === false, 'Checker catches unsupported marketing hyperbole');
  assert(check3.findings.some(f => f.status === 'unsupported' && f.prNumber === 1435), 'Checker flags unsupported claim on PR #1435');

  // --- Test 4: GitWise Orchestrator (Bounded Retries & Convergence) ---
  console.log('\n[4/5] Testing GitWise Orchestrator (Bounded Retries & Convergence)...');
  const orchestrator = new GitWiseOrchestrator();
  
  // Normal clean run
  const cleanRun = await orchestrator.runPipeline(
    repo,
    '2026-10-14',
    '2026-10-21',
    'Weekly'
  );
  assert(cleanRun.success === true, 'Orchestrator produces verified release notes on normal run');
  assert(cleanRun.attemptsCount === 1, `Clean run used 0 retries (attempts: ${cleanRun.attemptsCount})`);
  assert(cleanRun.attemptsHistory.length === 1, 'Clean run logged exactly 1 attempt');

  // Run with simulated error injection to exercise feedback retry loop
  const retryRun = await orchestrator.runPipeline(
    repo,
    '2026-10-14',
    '2026-10-21',
    'Weekly',
    {
      injectTestError: 'fabricated_ref',
      maxRetries: 3,
    }
  );
  assert(retryRun.success === true, 'Orchestrator successfully recovers from injected error via retry');
  assert(retryRun.attemptsCount >= 2 && retryRun.attemptsCount <= 4, `Orchestrator converged within bounded budget (attempts: ${retryRun.attemptsCount})`);
  assert(retryRun.attemptsHistory.length >= 2, `Orchestrator recorded attempt history (attempts: ${retryRun.attemptsHistory.length})`);

  // --- Test 5: Evaluation Benchmark Runner ---
  console.log('\n[5/5] Testing Adversarial Evaluation Benchmark Suite...');
  const evaluationRunner = new EvaluationRunner();
  const benchmark = await evaluationRunner.runSuite();
  
  assert(benchmark.totalTestCases === 3, `Benchmark evaluated ${benchmark.totalTestCases} test cases`);
  assert(benchmark.detectionRate === 1.0, `Benchmark detection rate is 100% (${(benchmark.detectionRate * 100).toFixed(0)}%)`);
  assert(benchmark.falsePositiveRate === 0.0, `Benchmark false positive rate is 0% (${(benchmark.falsePositiveRate * 100).toFixed(0)}%)`);
  assert(benchmark.detailedOutcomes.every(o => o.injectedErrorCaught && o.recoverySuccessful), 'All 3 adversarial test vectors caught and auto-recovered');

  // --- Final Summary ---
  console.log('\n======================================================');
  console.log(`  Test Results: ${passedTests}/${totalTests} Passed (${((passedTests / totalTests) * 100).toFixed(0)}%)`);
  console.log('======================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error running pipeline tests:', err);
  process.exit(1);
});
