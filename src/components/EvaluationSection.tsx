import React, { useState } from 'react';
import { 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RotateCw, 
  ShieldCheck,
  Check,
  Terminal,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestCase {
  id: string;
  category: string;
  title: string;
  targetVector: string;
  expectedBehavior: string;
  actualResult: string;
  standardLlmResult: string;
  gitwiseResult: string;
  detectionOutcome: string;
  status: 'passed' | 'failed';
}

export const EvaluationSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState('tc-1');
  const [isRunning, setIsRunning] = useState(false);
  const [runCount, setRunCount] = useState(1);

  const testCases: TestCase[] = [
    {
      id: 'tc-1',
      category: 'Fabricated PR Reference',
      title: 'Hallucinated Reference Rejection (#9841)',
      targetVector: 'Injects a fictional PR reference (#9841) with high-confidence wording ("Rewrote bundler in Rust for 20x speedup").',
      expectedBehavior: 'The system must query the git commit tree, confirm 0 commits exist for #9841, and reject the claim.',
      actualResult: 'GitWise AST query returned NO_MATCH for #9841. Claim was dropped; retry #1 re-anchored to real PRs.',
      standardLlmResult: 'Accepts #9841 verbatim and publishes false release bullet to developers.',
      gitwiseResult: 'REJECTED: Reference #9841 not present in git tree. 0 hallucinated PRs allowed.',
      detectionOutcome: '100% False Reference Rejection',
      status: 'passed',
    },
    {
      id: 'tc-2',
      category: 'Missing In-Scope Merged PR',
      title: 'Omitted Security PR Detection (#1415)',
      targetVector: 'Withholds a critical CVE patch (PR #1415) during initial drafting to test coverage detection.',
      expectedBehavior: 'Coverage analysis must compare merged PR IDs against drafted claims and trigger an automated retry loop.',
      actualResult: 'Coverage check flagged missing PR #1415. Prompt feedback injected diff; patch restored to Security section.',
      standardLlmResult: 'Silently ignores missing PR #1415 without alert, publishing an incomplete release.',
      gitwiseResult: 'COVERAGE RECOVERED: Automated retry #1 detected gap and restored security patch.',
      detectionOutcome: '100% Coverage Completeness Enforced',
      status: 'passed',
    },
    {
      id: 'tc-3',
      category: 'Unsupported / Misleading Claim',
      title: 'Marketing Hyperbole Normalization (#1435)',
      targetVector: 'Draft asserts: "Completely eliminated all memory overhead across browser instances" from a 12-line listener fix.',
      expectedBehavior: 'AST diff tokenizer must measure changed lines, verify claim scope, and reject exaggerated superlatives.',
      actualResult: 'Hyperbolic claim rejected. Normalized to factual sentence: "Resolved closure retention during unmount in useDeferredValue."',
      standardLlmResult: 'Publishes sensationalized "eliminated all memory overhead" marketing statement.',
      gitwiseResult: 'NORMALIZED: Rewritten to reflect exact 12-line listener cleanup diff.',
      detectionOutcome: '100% Factually Grounded Tone',
      status: 'passed',
    },
  ];

  const activeCase = testCases.find((tc) => tc.id === selectedCaseId) || testCases[0];

  const handleRunSuite = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunCount((prev) => prev + 1);
    }, 600);
  };

  return (
    <section id="evaluation" className="scroll-mt-24 py-24 bg-white border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-2 block">
              EVALUATION LAB & BENCHMARKING
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight leading-tight font-sans">
              Tested against errors before you publish
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
              Continuous regression testing evaluating whether GitWise detects missing PRs, fabricated references, and misleading claims.
            </p>
          </div>

          {/* Run Suite Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRunSuite}
              disabled={isRunning}
              className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-5 py-3 rounded-lg shadow-md shadow-primary-600/25 transition-all duration-200 flex items-center gap-2 disabled:opacity-60 btn-shimmer"
            >
              {isRunning ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Running Suite #{runCount}...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run Adversarial Suite</span>
                </>
              )}
            </button>
            <span className="text-[11px] font-mono text-slate-400">Demo data</span>
          </div>
        </div>

        {/* Test Case Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {testCases.map((tc) => {
            const isSelected = tc.id === selectedCaseId;
            return (
              <motion.button
                key={tc.id}
                type="button"
                whileHover={{ y: -2 }}
                onClick={() => setSelectedCaseId(tc.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-primary-500 bg-blue-50/50 shadow-card'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-primary-600">
                    {tc.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    PASSED
                  </span>
                </div>
                <div className={`text-sm font-bold font-sans ${isSelected ? 'text-navy-950' : 'text-slate-700'}`}>
                  {tc.title}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detailed Evaluation Card */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-card">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                  {activeCase.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500">
                  Target Vector: {activeCase.targetVector}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-950 mt-1 font-sans">
                {activeCase.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg font-mono">
                Outcome: {activeCase.detectionOutcome}
              </span>
            </div>
          </div>

          {/* Comparison Grid: Standard LLM vs GitWise Verified */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Standard LLM (Baseline) */}
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Baseline (Standard Unverified LLM)
                </span>
                <span className="text-[10px] font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">
                  Vulnerable
                </span>
              </div>
              <p className="text-xs text-red-950 font-mono bg-white p-3.5 rounded-lg border border-red-200 leading-relaxed shadow-sm">
                {activeCase.standardLlmResult}
              </p>
              <div className="text-[11px] text-red-700 leading-relaxed">
                Standard generation has no proof layer; it blindly accepts fabricated PR tokens and omits critical changes.
              </div>
            </div>

            {/* GitWise Verified */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  GitWise Verified Pipeline
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
                  Verified
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-mono bg-white p-3.5 rounded-lg border border-emerald-200 leading-relaxed shadow-sm">
                {activeCase.gitwiseResult}
              </p>
              <div className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                Dual-pass verifier queries AST diff hunks directly to enforce 100% evidence grounding.
              </div>
            </div>

          </div>

          {/* Expected vs Actual Result Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-sm">
              <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px] font-sans">
                Expected Behavior
              </div>
              <div className="text-slate-600 leading-relaxed">
                {activeCase.expectedBehavior}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-sm">
              <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px] font-sans">
                Actual Verified Behavior
              </div>
              <div className="text-slate-600 leading-relaxed">
                {activeCase.actualResult}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
