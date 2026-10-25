import { 
  GitHubResearcherAgent 
} from './researcher';
import { 
  ReleaseNoteDrafterAgent, 
  DrafterOptions 
} from './drafter';
import { 
  IndependentVerificationCheckerAgent 
} from './checker';
import {
  OrchestrationResult,
  OrchestrationOptions,
  OrchestratorAttempt,
  PullRequestEvidence,
  ReleaseNoteDraft,
  CheckerResult
} from './contracts';

export class GitWiseOrchestrator {
  private researcher: GitHubResearcherAgent;
  private drafter: ReleaseNoteDrafterAgent;
  private checker: IndependentVerificationCheckerAgent;

  constructor(githubToken?: string) {
    this.researcher = new GitHubResearcherAgent(githubToken);
    this.drafter = new ReleaseNoteDrafterAgent();
    this.checker = new IndependentVerificationCheckerAgent();
  }

  /**
   * Run the full end-to-end release note generation and verification pipeline.
   * Researcher -> Drafter -> Checker -> Bounded Retry Loop -> Final Report
   */
  async runPipeline(
    repo: string,
    startDate: string,
    endDate: string,
    releaseType: 'Weekly' | 'Minor Release' | 'Major Release' = 'Weekly',
    options?: OrchestrationOptions
  ): Promise<OrchestrationResult> {
    const startTime = Date.now();
    const maxRetries = options?.maxRetries ?? 3;
    const runId = `GW-${Math.floor(1000 + Math.random() * 9000)}`;

    options?.onStageChange?.('1/4: Ingesting GitHub Pull Requests & AST diff tokens...');
    
    // Stage 1: Researcher ingests PR evidence
    const evidence = await this.researcher.fetchMergedPullRequests(repo, startDate, endDate);
    if (evidence.length === 0) {
      throw new Error(`No merged pull requests found for ${repo} between ${startDate} and ${endDate}.`);
    }

    const attemptsHistory: OrchestratorAttempt[] = [];
    let currentAttempt = 1;
    let feedbackForNextDraft: string | undefined = undefined;

    let latestDraft!: ReleaseNoteDraft;
    let latestCheckerResult!: CheckerResult;

    // Stage 2 & 3: Bounded Retry Loop
    while (currentAttempt <= maxRetries) {
      options?.onStageChange?.(`2/4: Drafting release notes (Attempt #${currentAttempt}/${maxRetries})...`);

      const drafterOptions: DrafterOptions = {
        repo,
        startDate,
        endDate,
        releaseType,
        feedbackFromChecker: feedbackForNextDraft,
        injectTestError: currentAttempt === 1 ? options?.injectTestError : undefined,
      };

      latestDraft = this.drafter.generateDraft(evidence, drafterOptions);

      options?.onStageChange?.(`3/4: Independently verifying draft claims against diff hunks (Attempt #${currentAttempt})...`);

      latestCheckerResult = this.checker.verifyDraft(latestDraft, evidence);

      attemptsHistory.push({
        attemptNumber: currentAttempt,
        timestamp: new Date().toISOString(),
        draft: latestDraft,
        checkerResult: latestCheckerResult,
        retryReason: feedbackForNextDraft,
      });

      // If all claims verified and no omissions, we converged successfully!
      if (latestCheckerResult.passed) {
        break;
      }

      // If errors were found and we have retries remaining, prepare feedback
      if (currentAttempt < maxRetries) {
        feedbackForNextDraft = latestCheckerResult.feedbackForDrafter;
        currentAttempt++;
      } else {
        // Retry budget exhausted
        break;
      }
    }

    options?.onStageChange?.('4/4: Formatting final verified release report...');

    const durationMs = Date.now() - startTime;

    return {
      runId,
      repo,
      startDate,
      endDate,
      releaseType,
      success: latestCheckerResult.passed,
      finalStatus: latestCheckerResult.status,
      attemptsCount: attemptsHistory.length,
      maxRetriesEnforced: maxRetries,
      durationMs,
      evidence,
      finalDraft: latestDraft,
      finalCheckerResult: latestCheckerResult,
      attemptsHistory,
    };
  }
}
