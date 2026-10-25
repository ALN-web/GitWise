import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServiceCardsSection } from './components/ServiceCardsSection';
import { ReleaseForm, ReleaseFormData } from './components/ReleaseForm';
import { VerificationSection } from './components/VerificationSection';
import { EvaluationSection } from './components/EvaluationSection';
import { Footer } from './components/Footer';
import { GeneratedNotesModal } from './components/GeneratedNotesModal';
import { EvaluationLabModal } from './components/EvaluationLabModal';
import { VerificationDrawer } from './components/VerificationDrawer';
import { RunHistoryModal, RunRecord } from './components/RunHistoryModal';
import { GitWiseOrchestrator } from './agents/orchestrator';
import { OrchestrationResult } from './agents/contracts';

export const App: React.FC = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isVerificationDrawerOpen, setIsVerificationDrawerOpen] = useState(false);
  const [isRunHistoryOpen, setIsRunHistoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationTimerRef = useRef<number | null>(null);

  const [generatedData, setGeneratedData] = useState<ReleaseFormData | null>({
    repoUrl: 'https://github.com/facebook/react',
    startDate: '2026-10-14',
    endDate: '2026-10-21',
    releaseType: 'Weekly',
  });

  // Track session runs for Run History
  const [runs, setRuns] = useState<RunRecord[]>([
    {
      id: 'GW-8831',
      repoUrl: 'https://github.com/facebook/react',
      startDate: '2026-10-14',
      endDate: '2026-10-21',
      releaseType: 'Weekly',
      timestamp: 'Today, 10:14 AM',
      durationMs: 1420,
      status: 'verified',
      claimsCount: 4,
      verifiedCount: 4,
    },
  ]);

  const handleScrollToForm = () => {
    const el = document.getElementById('workspace') || document.getElementById('generate-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('repoUrl');
      if (input) {
        setTimeout(() => input.focus(), 400);
      }
    }
  };

  const handleExploreVerification = () => {
    const el = document.getElementById('verification');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [lastResult, setLastResult] = useState<OrchestrationResult | null>(null);

  const handleGenerate = async (data: ReleaseFormData) => {
    setIsGenerating(true);
    setGeneratedData(data);

    try {
      const orchestrator = new GitWiseOrchestrator();
      const result = await orchestrator.runPipeline(
        data.repoUrl,
        data.startDate,
        data.endDate,
        data.releaseType
      );

      setLastResult(result);
      setIsGenerating(false);
      setIsGenerateModalOpen(true);

      const newRun: RunRecord = {
        id: result.runId,
        repoUrl: result.repo,
        startDate: result.startDate,
        endDate: result.endDate,
        releaseType: result.releaseType,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationMs: result.durationMs,
        status: result.success ? 'verified' : 'failed',
        claimsCount: result.finalCheckerResult.totalClaimsEvaluated,
        verifiedCount: result.finalCheckerResult.verifiedCount,
      };

      setRuns((prev) => [newRun, ...prev]);
    } catch (err: any) {
      console.error('Orchestration pipeline execution error:', err);
      setIsGenerating(false);
    }
  };

  const handleCancelGeneration = () => {
    setIsGenerating(false);
  };

  const handleSelectRun = (record: RunRecord) => {
    setGeneratedData({
      repoUrl: record.repoUrl,
      startDate: record.startDate,
      endDate: record.endDate,
      releaseType: record.releaseType,
    });
    setIsRunHistoryOpen(false);
    setIsGenerateModalOpen(true);
  };

  const handleSelectCapability = (id: string) => {
    if (id === 'evaluation-lab') {
      const el = document.getElementById('evaluation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setIsEvaluationModalOpen(true);
    } else if (id === 'independent-verification') {
      handleExploreVerification();
    } else if (id === 'github-research') {
      handleScrollToForm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-surface-text selection:bg-blue-600 selection:text-white">
      {/* 1. Top Bar & Header */}
      <Header
        onScrollToForm={handleScrollToForm}
        onExploreVerification={handleExploreVerification}
        onOpenEvaluationModal={() => setIsEvaluationModalOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero Section with 4 Overlapping Floating Cards */}
        <Hero
          onScrollToForm={handleScrollToForm}
          onExploreVerification={handleExploreVerification}
        />

        {/* 3. Section 2: Split "About / Core Story" with Diagonal Slash & Blue Badge */}
        <AboutSection
          onExploreVerification={handleExploreVerification}
        />

        {/* 4. Section 3: "Our Services / Capabilities" with 3 Large Cards */}
        <ServiceCardsSection
          onSelectCapability={handleSelectCapability}
        />

        {/* 5. Interactive Workspace Generation Form */}
        <ReleaseForm
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          onCancelGeneration={handleCancelGeneration}
          onOpenHistory={() => setIsRunHistoryOpen(true)}
          historyCount={runs.length}
        />

        {/* 6. Verification: The Core Differentiator (Interactive Evidence Inspector) */}
        <VerificationSection 
          onOpenArchitectureDrawer={() => setIsVerificationDrawerOpen(true)}
        />

        {/* 7. Dedicated Evaluation Lab Section (Adversarial Benchmark Runner) */}
        <EvaluationSection />
      </main>

      {/* 8. Deep Navy & Royal Blue Footer */}
      <Footer
        onScrollToForm={handleScrollToForm}
      />

      {/* Modals & Drawers */}
      <GeneratedNotesModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        data={generatedData}
        orchestrationResult={lastResult}
      />

      <EvaluationLabModal
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
      />

      <VerificationDrawer
        isOpen={isVerificationDrawerOpen}
        onClose={() => setIsVerificationDrawerOpen(false)}
        onOpenGenerateModal={handleScrollToForm}
      />

      <RunHistoryModal
        isOpen={isRunHistoryOpen}
        onClose={() => setIsRunHistoryOpen(false)}
        runs={runs}
        onSelectRun={handleSelectRun}
      />
    </div>
  );
};

export default App;
