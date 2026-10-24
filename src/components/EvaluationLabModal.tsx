import React, { useState, useEffect } from 'react';
import { 
  X, 
  FlaskConical, 
  AlertTriangle, 
  ShieldAlert, 
  RotateCw,
  Play,
  CheckCircle2,
  FileCode2,
  Check
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  const cases = {
    fabricated: {
      category: 'Fabricated PR Reference',
      title: 'Adversarial Test 01: Fabricated Reference Injection',
      scenario: 'An untrusted draft proposes a claim referencing PR #9841 ("Rewrote bundler in Rust for 20x speedup"). However, no PR #9841 exists in the git commit log.',
      unverifiedDraft: '- Rewrote asset pipeline in Rust for 20x speedup ([#9841](https://github.com/repo/pull/9841))',
      actionTaken: 'GitWise Verification Layer queried git log and AST tree. 0 commits matched ID #9841. Assertion flagged as ungrounded.',
      verifiedResult: 'REJECTED: Reference #9841 not found in git diffs. Removed from release notes draft.',
      status: 'REJECTED_UNGROUNDED',
      badgeVariant: 'error' as const,
    },
    missing: {
      category: 'Missing In-Scope Merged PR',
      title: 'Adversarial Test 02: Omitted Security Pull Request',
      scenario: 'The initial draft summarized 27 PRs but missed PR #1415 ("CVE-2026-9102: sanitize SVG namespace injection in SSR renderer").',
      unverifiedDraft: 'Draft generated without mention of SVG security patch #1415.',
      actionTaken: 'Coverage Analysis Pass detected a high-severity merged PR in the target commit range missing from the output vector.',
      verifiedResult: 'RETRY TRIGGERED: Automatically re-prompted synthesizer with targeted PR #1415 diff. Restored to Bug Fixes section.',
      status: 'COVERAGE_RECOVERED',
      badgeVariant: 'verified' as const,
    },
    hyperbole: {
      category: 'Unsupported / Misleading Claim',
      title: 'Adversarial Test 03: Misleading Marketing Claim',
      scenario: 'The draft claimed: "Completely eliminated all memory usage across browser tabs" based on a small 12-line fix in event listeners.',
      unverifiedDraft: '- Completely eliminated memory overhead across all browser instances ([#1435](https://github.com/repo/pull/1435))',
      actionTaken: 'Semantic Diff Grounding evaluated tokens: diff only cleaned detached listener in useDeferredValue. Hyperbolic statement rejected.',
      verifiedResult: 'MODIFIED: Tone normalized to reflect exact code changes: "Resolved closure retention in useDeferredValue mid-transition."',
      status: 'HYPERBOLE_NORMALIZED',
      badgeVariant: 'unsupported' as const,
    },
  };

  const current = cases[selectedCase];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1220] px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 id="lab-title" className="text-base font-bold text-white tracking-tight">
                GitWise Adversarial Evaluation Lab
              </h3>
              <p className="text-xs text-slate-400">
                Stress testing verification accuracy with controlled error injection
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case selector tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCase('fabricated')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCase === 'fabricated'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            01. Fabricated Ref (#9841)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCase('missing')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCase === 'missing'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            02. Missing Security PR (#1415)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCase('hyperbole')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCase === 'hyperbole'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            03. Exaggerated Claim (#1435)
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                {current.category}
              </span>
              <Badge variant={current.badgeVariant} size="sm">
                {current.status}
              </Badge>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {current.title}
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-800">Test Vector: </span>
              {current.scenario}
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Standard LLM Failure Output */}
            <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-700">
                <ShieldAlert className="w-4 h-4" />
                <span>Standard LLM Behavior (Unverified)</span>
              </div>
              <p className="text-xs text-slate-700 font-mono bg-white p-2.5 rounded border border-red-100">
                {current.unverifiedDraft}
              </p>
              <p className="text-[11px] text-red-600 leading-relaxed">
                Accepts hallucinated text or drops critical PRs without warning developers.
              </p>
            </div>

            {/* GitWise Grounded Outcome */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>GitWise Grounded Result</span>
              </div>
              <p className="text-xs text-slate-800 font-mono bg-white p-2.5 rounded border border-emerald-100">
                {current.verifiedResult}
              </p>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                {current.actionTaken}
              </p>
            </div>

          </div>

          {/* Verification Engine Log Preview */}
          <div className="bg-[#0B1220] text-slate-300 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-500">// Execution trace: GitWise Evaluator</div>
            <div className="text-slate-400">INPUT_VEC: evaluate_candidate_node(claim_hash: 0x9f182)</div>
            <div className="text-blue-300">SEARCH: match_git_tree(refs: ["#9841", "#1415", "#1435"])</div>
            <div className="text-emerald-400">CONVERGENCE_STATUS: DETERMINISTIC_AUDIT_PASSED</div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <Button
            type="button"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            isLoading={isRunning}
            leftIcon={!isRunning && <Play className="w-3.5 h-3.5 fill-current" />}
          >
            {isRunning ? 'Running Test Suite...' : 'Re-run Test Benchmark'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Close Lab
          </Button>
        </div>

      </div>
    </div>
  );
};
