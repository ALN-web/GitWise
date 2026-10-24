import React, { useState } from 'react';
import { 
  FlaskConical, 
  ArrowRight, 
  History, 
  Terminal
} from 'lucide-react';

interface EvaluationBannerProps {
  onOpenEvaluationLab: () => void;
  onOpenRunHistory: () => void;
}

export const EvaluationBanner: React.FC<EvaluationBannerProps> = ({
  onOpenEvaluationLab,
  onOpenRunHistory,
}) => {
  const [testRepo, setTestRepo] = useState('facebook/react');

  return (
    <section id="evaluation" className="py-12 bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Banner Container matching Reference */}
        <div className="relative rounded-2xl bg-navy-900 border border-navy-800 overflow-hidden shadow-2xl">
          
          {/* Background image & subtle lighting */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800/60 via-navy-900/80 to-navy-900 pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading and Description */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-800 text-brand-orange text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
                  <FlaskConical className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Evaluation & Stress Testing</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                  Don't just generate. <span className="text-brand-orange">Verify.</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Measure release-note quality with controlled test cases, evidence checks, and transparent evaluation results.
                </p>
              </div>

              {/* Right Column: Action Controls matching reference's input + button alignment */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
                
                <div className="w-full max-w-md bg-navy-950/90 rounded-xl p-2 border border-slate-700/80 shadow-lg flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex-1 w-full pl-3 pr-2 py-2 flex items-center gap-2 text-slate-300 text-sm">
                    <Terminal className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    <input
                      type="text"
                      value={testRepo}
                      onChange={(e) => setTestRepo(e.target.value)}
                      placeholder="target-repo (e.g. facebook/react)"
                      className="bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none w-full font-mono"
                    />
                  </div>

                  {/* Primary Orange Button */}
                  <button
                    type="button"
                    onClick={onOpenEvaluationLab}
                    className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Open Evaluation Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Secondary Links & Disclaimer */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={onOpenRunHistory}
                    className="hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition-colors"
                  >
                    <History className="w-3.5 h-3.5 text-brand-orange" />
                    <span>View Run History</span>
                  </button>
                  <span className="text-slate-600">•</span>
                  <span>Synthetic test suites for false claim rejection</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
