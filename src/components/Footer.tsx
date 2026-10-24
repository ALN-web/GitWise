import React from 'react';
import { 
  GitBranch, 
  Github, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface FooterProps {
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToForm }) => {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-navy-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-navy-900">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
                <GitBranch className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Git<span className="text-primary-500">Wise</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              AI-Powered Release Intelligence that converts GitHub pull requests into accurate, traceable weekly release notes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/ALN-web/GitWise"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-navy-900 hover:bg-navy-800 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4 text-primary-400" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Product Col (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#overview" className="hover:text-primary-400 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToForm}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  Generate Notes
                </button>
              </li>
              <li>
                <a href="#verification" className="hover:text-primary-400 transition-colors">
                  Verification Engine
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-primary-400 transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#evaluation" className="hover:text-primary-400 transition-colors">
                  Evaluation Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Documentation Col (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
              Documentation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#capabilities" className="hover:text-primary-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-primary-400 transition-colors">
                  Diff Token Auditing
                </a>
              </li>
              <li>
                <a href="#generate-form" className="hover:text-primary-400 transition-colors">
                  GitHub Integration
                </a>
              </li>
              <li>
                <a href="#evaluation" className="hover:text-primary-400 transition-colors">
                  Adversarial Test Suites
                </a>
              </li>
            </ul>
          </div>

          {/* Project Col (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">Release Intelligence v2.0</span>
              </li>
              <li className="text-slate-400">
                AST Diff Token Parser
              </li>
              <li className="text-slate-400">
                Dual-Pass Adversary Review
              </li>
              <li className="text-slate-400">
                Deterministic Convergence Loop
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 GitWise. Ship smarter. Verify every change.
          </div>

          <div className="flex items-center gap-6">
            <a href="#overview" className="hover:text-slate-300 transition-colors font-medium">
              Back to top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
