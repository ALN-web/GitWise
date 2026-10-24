import React from 'react';
import { 
  GitBranch, 
  Github, 
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToForm }) => {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-navy-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-navy-900">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-navy-900 border border-slate-800 flex items-center justify-center text-brand-orange">
                <GitBranch className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Git<span className="text-brand-orange">Wise</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              AI-Powered Release Intelligence that converts GitHub pull requests into accurate, traceable weekly release notes.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/ALN-web/GitWise"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Product Col (2 cols) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToForm}
                  className="hover:text-white transition-colors text-left"
                >
                  Generate Notes
                </button>
              </li>
              <li>
                <a href="#verification" className="hover:text-white transition-colors">
                  Verification Engine
                </a>
              </li>
              <li>
                <a href="#evaluation" className="hover:text-white transition-colors">
                  Evaluation Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Documentation Col (2 cols) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Documentation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-white transition-colors">
                  Evidence Traceability
                </a>
              </li>
              <li>
                <a href="#generate-form" className="hover:text-white transition-colors">
                  GitHub Integration
                </a>
              </li>
              <li>
                <a href="#evaluation" className="hover:text-white transition-colors">
                  Adversarial Testing
                </a>
              </li>
            </ul>
          </div>

          {/* Project Col (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Project
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-300 font-medium">Release Intelligence v2.0</span>
              </li>
              <li>
                <span className="text-slate-400">Strict Source Grounding Engine</span>
              </li>
              <li>
                <span className="text-slate-400">AST Diff Token Parser</span>
              </li>
              <li>
                <span className="text-slate-400">Deterministic Convergence (Max 3 Loops)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 GitWise. Ship smarter. Verify every change.
          </div>

          <div className="flex items-center gap-4">
            <a href="#overview" className="hover:text-slate-300 transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
