import React, { useState } from 'react';
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
    } else if (id === 'independent-verification') {
      handleExploreVerification();
    } else if (id === 'github-research') {
      handleScrollToForm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-surface-text selection:bg-primary-600 selection:text-white">
      {/* 1. Top Bar & Header matching reference */}
      <Header
        onScrollToForm={handleScrollToForm}
        onExploreVerification={handleExploreVerification}
        onOpenEvaluationModal={() => setIsEvaluationModalOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero Section with 4 Overlapping Floating Cards matching reference */}
        <Hero
          onScrollToForm={handleScrollToForm}
          onExploreVerification={handleExploreVerification}
        />

        {/* 3. Section 2: Split "About / Core Story" with Diagonal Slash & Blue Badge matching reference */}
        <AboutSection
          onExploreVerification={handleExploreVerification}
        />

        {/* 4. Section 3: "Our Services / Capabilities" with 3 Large Cards & Floating Circular Blue Badges */}
        <ServiceCardsSection
          onSelectCapability={handleSelectCapability}
        />

        {/* 5. Interactive Workspace Generation Form */}
        <ReleaseForm
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* 6. Verification: The Core Differentiator (Interactive Evidence Inspector) */}
        <VerificationSection />

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
