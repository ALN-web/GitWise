import React from 'react';
import { 
  GitBranch, 
  Github, 
  Lock
} from 'lucide-react';

interface FooterProps {
  onOpenGenerateModal: () => void;
  onOpenEvaluationModal: () => void;
  onOpenVerificationDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGenerateModal,
  onOpenEvaluationModal,
  onOpenVerificationDrawer,
}) => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          
          {/* Col 1: Logo & Mission Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-900 border border-slate-700 flex items-center justify-center text-brand-orange shadow-sm">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Git<span className="text-brand-orange">Wise</span>
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  ReleaseGuard Verification Engine
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An AI-powered release-note generation and verification system that converts GitHub pull requests into accurate, traceable weekly release notes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-orange transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Deterministic Mode</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#overview" className="hover:text-brand-orange transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGenerateModal}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  Generate Notes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenVerificationDrawer}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  Verification
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEvaluationModal}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  Evaluation Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#documentation" className="hover:text-brand-orange transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-brand-orange transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#overview" className="hover:text-brand-orange transition-colors">
                  GitHub Integration
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-brand-orange transition-colors">
                  Diff Token Auditing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Project & Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Project
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-brand-orange transition-colors">
                  Architecture
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEvaluationModal}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  Testing & Benchmarks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEvaluationModal}
                  className="hover:text-brand-orange transition-colors text-left"
                >
                  Run History
                </button>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                  <Lock className="w-3 h-3 text-brand-orange" />
                  <span>Bounded Retry Loop</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">
              ReleaseGuard — Verified Weekly Release Notes
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Verification
            </a>
            <a href="#security" className="hover:text-white transition-colors">
              Source Grounding Guarantee
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
