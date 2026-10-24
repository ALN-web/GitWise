import React, { useState } from 'react';
import { 
  X, 
  FlaskConical, 
  AlertTriangle, 
  ShieldAlert, 
  RotateCw,
  Play
} from 'lucide-react';

interface EvaluationLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EvaluationLabModal: React.FC<EvaluationLabModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCase, setSelectedCase] = useState<'fabricated' | 'missing' | 'hyperbole'>('fabricated');
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  const cases = {
    fabricated: {
      title: 'Adversarial Test 01: Fabricated Reference Injection',
      scenario: 'An untrusted AI draft proposes a claim referencing PR #9841 ("Rewrote bundler in Rust for 20x speedup"). However, no PR #9841 exists in the git commit log.',
      unverifiedDraft: '- Rewrote asset pipeline in Rust for 20x speedup ([#9841](https://github.com/repo/pull/9841))',
      actionTaken: 'ReleaseGuard Verification Layer queried git log and AST tree. 0 commits matched ID #9841. Assertion flagged as ungrounded.',
      verifiedResult: 'REJECTED: Reference #9841 not found in git diffs. Removed from release notes draft.',
      status: 'REJECTED_UNGROUNDED',
    },
    missing: {
      title: 'Adversarial Test 02: Omitted Security Pull Request',
      scenario: 'The initial draft summarized 27 PRs but missed PR #1415 ("CVE-2026-9102: sanitize SVG namespace injection in SSR renderer").',
      unverifiedDraft: 'Draft generated without mention of SVG security patch #1415.',
      actionTaken: 'Coverage Analysis Pass detected a high-severity merged PR in the target commit range missing from the output vector.',
      verifiedResult: 'RETRY TRIGGERED: Automatically re-prompted synthesizer with targeted PR #1415 diff. Restored to Bug Fixes section.',
      status: 'COVERAGE_RECOVERED',
    },
    hyperbole: {
      title: 'Adversarial Test 03: Misleading Marketing Claim',
      scenario: 'The draft claimed: "Completely eliminated all memory usage across browser tabs" based on a small 12-line fix in event listeners.',
      unverifiedDraft: '- Completely eliminated memory overhead across all browser instances ([#1435](https://github.com/repo/pull/1435))',
      actionTaken: 'Semantic Diff Grounding evaluated tokens: diff only cleaned detached listener in useDeferredValue. Hyperbolic statement rejected.',
      verifiedResult: 'MODIFIED: Tone normalized to reflect exact code changes: "Resolved closure retention in useDeferredValue mid-transition."',
      status: 'HYPERBOLE_NORMALIZED',
    },
  };

  const current = cases[selectedCase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-navy-900 px-6 py-4 flex items-center justify-between border-b border-navy-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white shadow-sm">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                ReleaseGuard Evaluation Lab
              </h3>
              <p className="text-xs text-slate-400">
                Stress testing verification accuracy with controlled error injection
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

        {/* Case selector tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={() => setSelectedCase('fabricated')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              selectedCase === 'fabricated'
                ? 'bg-white text-navy-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Fabricated PRs
          </button>
          <button
            type="button"
            onClick={() => setSelectedCase('missing')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              selectedCase === 'missing'
                ? 'bg-white text-navy-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Missing Items
          </button>
          <button
            type="button"
            onClick={() => setSelectedCase('hyperbole')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              selectedCase === 'hyperbole'
                ? 'bg-white text-navy-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Misleading Claims
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <h4 className="text-base font-bold text-navy-900 mb-1">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.scenario}
            </p>
          </div>

          {/* Test Workbench */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Unverified Input Block */}
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  Unverified LLM Output
                </span>
                <span className="text-[10px] font-mono bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                  Untrusted
                </span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-red-200 font-mono text-xs text-red-950">
                {current.unverifiedDraft}
              </div>
              <p className="text-[11px] text-red-700">
                A standard generative model accepts this bullet point without verifying pull request diffs.
              </p>
            </div>

            {/* ReleaseGuard Verification Action */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                  ReleaseGuard Assertion Check
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  Dual-Pass Auditor
                </span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200 font-mono text-xs text-emerald-950">
                {current.actionTaken}
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">
                {current.verifiedResult}
              </p>
            </div>

          </div>

          {/* Verification Engine Log Preview */}
          <div className="bg-navy-950 text-slate-300 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-500">// Execution trace: ReleaseGuard Evaluator</div>
            <div className="text-slate-400">INPUT_VEC: evaluate_candidate_node(claim_hash: 0x9f182)</div>
            <div className="text-yellow-300">SEARCH: match_git_tree(refs: ["#9841", "#1415", "#1435"])</div>
            <div className="text-emerald-400">CONVERGENCE_STATUS: DETERMINISTIC_AUDIT_PASSED</div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Test Suite...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Re-run Test Benchmark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Close Lab
          </button>
        </div>

      </div>
    </div>
  );
};
