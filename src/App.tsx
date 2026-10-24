import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ReleaseForm, ReleaseFormData } from './components/ReleaseForm';
import { CoreCapabilities } from './components/CoreCapabilities';
import { TrustWorkflow } from './components/TrustWorkflow';
import { TrustCards } from './components/TrustCards';
import { EvaluationBanner } from './components/EvaluationBanner';
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

  const handleGenerate = (data: ReleaseFormData) => {
    setIsGenerating(true);
    setGeneratedData(data);
    
    // Simulate generation & verification processing
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerateModalOpen(true);
    }, 700);
  };

  const handleSelectCapability = (id: string) => {
    if (id === 'evaluation-lab') {
      setIsEvaluationModalOpen(true);
    } else if (id === 'independent-verification' || id === 'coverage-analysis') {
      setIsVerificationDrawerOpen(true);
    } else {
      setIsGenerateModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-surface-text selection:bg-brand-orange selection:text-white">
      {/* 1. Header with announcement bar & white navbar */}
      <Header
        onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
        onOpenEvaluationModal={() => setIsEvaluationModalOpen(true)}
        onOpenVerificationDrawer={() => setIsVerificationDrawerOpen(true)}
      />

      {/* Main Content Layout matching Reference Screenshot */}
      <main className="flex-grow">
        {/* 2. Hero Section with Cinematic Dark Backdrop, Trust Indicators & Floating White Card */}
        <Hero
          onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
          onOpenVerificationDrawer={() => setIsVerificationDrawerOpen(true)}
        />

        {/* 3. Overlapping White Generation Form */}
        <ReleaseForm
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* 4. Core Capabilities — 5 Horizontal Cards */}
        <CoreCapabilities
          onSelectCapability={handleSelectCapability}
        />

        {/* 5. Trust and Workflow — Split Section (Dark Left, Feature Grid Right) */}
        <TrustWorkflow
          onExploreWorkflow={() => setIsVerificationDrawerOpen(true)}
        />

        {/* 6. Product Trust Cards (Replaces Testimonials with Genuine Guarantees) */}
        <TrustCards />

        {/* 7. Dark Call-to-Action Banner */}
        <EvaluationBanner
          onOpenEvaluationLab={() => setIsEvaluationModalOpen(true)}
          onOpenRunHistory={() => setIsEvaluationModalOpen(true)}
        />
      </main>

      {/* 8. Deep Navy Footer */}
      <Footer
        onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
        onOpenEvaluationModal={() => setIsEvaluationModalOpen(true)}
        onOpenVerificationDrawer={() => setIsVerificationDrawerOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
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
        onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
      />
    </div>
  );
};

export default App;
