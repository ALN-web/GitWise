import React from 'react';
import { 
  X, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

interface VerificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGenerateModal: () => void;
}

export const VerificationDrawer: React.FC<VerificationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenGenerateModal,
}) => {
  if (!isOpen) return null;

  const stages = [
    {
      num: '01',
      title: 'GitHub PR Ingestion & AST Extraction',
      description: 'Pulls raw diffs, commit messages, PR descriptions, and author metadata for every merged pull request in the defined date window.',
      detail: 'Parses changed files, function signatures, and modified lines into verifiable tokens.',
    },
    {
      num: '02',
      title: 'AI Drafting with Strict Semantic Hierarchy',
      description: 'Synthesizes changes into Features, Bug Fixes, Breaking Changes, and Internal Tooling without adding speculative fluff.',
      detail: 'Every bullet point is mandated to attach an exact PR identification tag.',
    },
    {
      num: '03',
      title: 'Dual-Pass Independent Adversary Review',
      description: 'A completely isolated model pass cross-checks each generated claim against the actual diff hunks extracted in Stage 1.',
      detail: 'If a bullet claims a feature that does not exist in the diff, the claim is rejected immediately.',
    },
    {
      num: '04',
      title: 'Coverage Completeness Analysis',
      description: 'Audits the release draft to verify that no impactful merged PRs were inadvertently omitted or forgotten by the generation model.',
      detail: 'Ensures important security and architectural changes are not dropped.',
    },
    {
      num: '05',
      title: 'Bounded Retry Convergence (Max 3 Loops)',
      description: 'If unsupported statements or coverage omissions are found, feedback is injected into a bounded retry loop.',
      detail: 'Guarantees termination without endless retry cycles or runaway costs.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 border-l border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="bg-navy-900 px-6 py-5 text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange-light border border-brand-orange text-brand-orange flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                GitWise Verification Engine
              </h3>
              <p className="text-xs text-slate-400">
                5-Stage Dual-Pass Verification Architecture
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Deterministic Evidence Principle
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard LLMs suffer from confabulation when writing release notes, inventing features or quoting wrong PR numbers. GitWise treats PR diffs as ground truth and verifies every sentence before release notes can be approved.
            </p>
          </div>

          {/* Stepper */}
          <div className="space-y-6">
            {stages.map((stage) => (
              <div key={stage.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-sm">
                    {stage.num}
                  </div>
                  <div className="w-0.5 h-full bg-slate-200 my-1" />
                </div>
                <div className="pb-4">
                  <h5 className="text-sm font-bold text-navy-900 mb-1">
                    {stage.title}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {stage.description}
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[11px] font-mono text-slate-500">
                    <span className="text-brand-orange font-bold">Audit Check: </span>
                    {stage.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="bg-white border-t border-slate-200 p-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenGenerateModal();
            }}
            className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Try Verification on Sample Repo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
