import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ReleaseForm, ReleaseFormData } from './components/ReleaseForm';
import { CoreCapabilities } from './components/CoreCapabilities';
import { VerificationSection } from './components/VerificationSection';
import { EvaluationSection } from './components/EvaluationSection';
import { Footer } from './components/Footer';
import { GeneratedNotesModal } from './components/GeneratedNotesModal';
import { EvaluationLabModal } from './components/EvaluationLabModal';
import { VerificationDrawer } from './components/VerificationDrawer';

export const App: React.FC = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isVerificationDrawerOpen, setIsVerificationDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<ReleaseFormData | null>({
    repoUrl: 'https://github.com/facebook/react',
    startDate: '2026-10-14',
    endDate: '2026-10-21',
    releaseType: 'Weekly',
  });

  const handleScrollToForm = () => {
    const el = document.getElementById('generate-form');
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

  const handleGenerate = (data: ReleaseFormData) => {
    setIsGenerating(true);
    setGeneratedData(data);
    
    // Simulate generation and diff token verification
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerateModalOpen(true);
    }, 700);
  };

  const handleSelectCapability = (id: string) => {
    if (id === 'evaluation-lab') {
      const el = document.getElementById('evaluation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setIsEvaluationModalOpen(true);
    } else if (id === 'independent-verification' || id === 'coverage-analysis') {
      const el = document.getElementById('verification');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setIsVerificationDrawerOpen(true);
    } else if (id === 'github-research' || id === 'ai-drafting') {
      handleScrollToForm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-surface-text selection:bg-brand-orange selection:text-white">
      {/* 1. Compact Header */}
      <Header
        onScrollToForm={handleScrollToForm}
        onOpenEvaluationModal={() => setIsEvaluationModalOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Simplified Hero (2-column layout with unified preview panel) */}
        <Hero
          onScrollToForm={handleScrollToForm}
          onExploreVerification={handleExploreVerification}
        />

        {/* 3. Release Generation Form (Workspace panel, validation, presets) */}
        <ReleaseForm
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* 4. Core Capabilities (5 clean cards, CSS mini diagrams, no stock imagery) */}
        <CoreCapabilities
          onSelectCapability={handleSelectCapability}
        />

        {/* 5. Verification: The Core Differentiator (Interactive evidence inspection) */}
        <VerificationSection />

        {/* 6. Evaluation Lab (Dedicated major feature section, test categories, comparison) */}
        <EvaluationSection />
      </main>

      {/* 7. Clean GitWise Footer */}
      <Footer
        onScrollToForm={handleScrollToForm}
      />

      {/* Deep-Dive Modals & Drawers */}
      <GeneratedNotesModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        data={generatedData}
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
    </div>
  );
};

export default App;
