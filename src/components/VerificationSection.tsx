import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  GitPullRequest,
  FileCode2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface VerificationClaim {
  id: string;
  claim: string;
  supportingPr: string;
  prTitle: string;
  sourceReference: string;
  status: 'verified' | 'unsupported' | 'missing' | 'invalid_ref';
  statusLabel: string;
  explanation: string;
  evidenceDiff: string;
  actionTaken: string;
}

export const VerificationSection: React.FC = () => {
  const claims: VerificationClaim[] = [
    {
      id: 'claim-1',
      claim: 'Server Actions now support streaming transitions directly with suspense boundaries.',
      supportingPr: 'PR #1422',
      prTitle: 'feat(actions): stream async transition payload over Flight protocol',
      sourceReference: 'packages/react-client/src/ReactFlightClient.js:412',
      status: 'verified',
      statusLabel: 'Verified Claim',
      explanation: 'Diff tokens match the AST assertion. 41 lines added in ReactFlightClient.js introducing startTransition streaming callback.',
      evidenceDiff: `@@ -412,6 +412,12 @@ export function startFlightTransition(
+  const flightBoundary = resolveSuspenseHandler(config);
+  return dispatchActionStream(payload, {
+    streamingBoundary: flightBoundary,
+    enableConcurrentYield: true,
+  });`,
      actionTaken: 'Approved and formatted for publication.'
    },
    {
      id: 'claim-2',
      claim: 'Completely eliminated 100% of memory overhead across all browser instances.',
      supportingPr: 'PR #1435',
      prTitle: 'fix(hooks): detach unmounted listener in useDeferredValue',
      sourceReference: 'packages/react-reconciler/src/ReactFiberHooks.js:1240',
      status: 'unsupported',
      statusLabel: 'Unsupported Claim',
      explanation: 'Exaggerated superlative detected. Diff only cleans a detached listener in useDeferredValue (12 lines modified).',
      evidenceDiff: `@@ -1240,4 +1240,8 @@ function updateDeferredValue() {
+  if (fiber.flags & Unmounted) {
+    fiber.updateQueue = null;
+  }`,
      actionTaken: 'Flagged & rewritten to factual statement: "Resolved closure retention during unmount in useDeferredValue."'
    },
    {
      id: 'claim-3',
      claim: 'CVE-2026-9102: SVG namespace sanitization in server renderer was omitted by initial draft.',
      supportingPr: 'PR #1415',
      prTitle: 'security: sanitize xlink:href and malicious svg tags in ssr stream',
      sourceReference: 'packages/react-dom/src/server/ReactXmlSanitizer.js:84',
      status: 'missing',
      statusLabel: 'Missing Relevant PR',
      explanation: 'Coverage analysis detected merged security patch PR #1415 within release window that was omitted from the draft bullet list.',
      evidenceDiff: `@@ -84,3 +84,9 @@ export function sanitizeXmlStream() {
+  validateSvgNamespaceTokens(attributeMap);`,
      actionTaken: 'Coverage rule triggered retry #1; patch restored into Security & Bug Fixes section.'
    },
    {
      id: 'claim-4',
      claim: 'Rewrote core compiler architecture in Rust for 20x benchmark speedup.',
      supportingPr: 'PR #9841',
      prTitle: 'Nonexistent reference in target commit tree',
      sourceReference: 'Not found in commit log',
      status: 'invalid_ref',
      statusLabel: 'Invalid Source Reference',
      explanation: 'Hallucinated PR ID. No commit or pull request matching #9841 exists in the git tree for this release window.',
      evidenceDiff: `ERR_REF_NOT_FOUND: git rev-list PR-9841 returned exit code 128 (unknown revision)`,
      actionTaken: 'Purged from release notes; synthesizer re-grounded to git diff tokens.'
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('claim-1');
  const selectedClaim = claims.find((c) => c.id === selectedId) || claims[0];

  const getStatusBadge = (status: VerificationClaim['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        );
      case 'unsupported':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3" />
            Unsupported
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
            <AlertCircle className="w-3 h-3" />
            Missing PR
          </span>
        );
      case 'invalid_ref':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            <AlertCircle className="w-3 h-3" />
            Invalid Ref
          </span>
        );
    }
  };

  return (
    <section id="verification" className="py-20 bg-surface-light border-b border-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-wider text-brand-orange uppercase mb-2 block">
              THE GITWISE DIFFERENTIATOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Every claim should have evidence.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-surface-muted leading-relaxed">
              Inspect the relationship between generated release notes and the source pull requests that support them.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-surface-border shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Interactive Verification Inspector</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-400">Demo data</span>
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
          
          {/* Left Column: Claims List (5 cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-surface-border divide-y divide-surface-border">
            <div className="p-4 bg-slate-50/80 border-b border-surface-border flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Audited Statements ({claims.length})
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Click to inspect evidence
              </span>
            </div>

            {claims.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 transition-all flex items-start justify-between gap-3 ${
                    isSelected 
                      ? 'bg-brand-orange-light/50 border-l-4 border-l-brand-orange' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <span className="font-mono text-xs text-slate-500">
                        {item.supportingPr}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? 'font-semibold text-navy-900' : 'text-slate-700'
                    }`}>
                      {item.claim}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-brand-orange translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Evidence & Explanation Drawer (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
            
            <div className="space-y-6">
              
              {/* Finding Title & Status */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedClaim.status)}
                    <span className="text-xs font-mono font-bold text-navy-900">
                      {selectedClaim.supportingPr}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Ref: {selectedClaim.sourceReference}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-navy-900 leading-snug">
                  "{selectedClaim.claim}"
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  PR Subject: {selectedClaim.prTitle}
                </p>
              </div>

              {/* Source Evidence Diff Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-brand-orange" />
                    <span>Ground Truth Git Diff Evidence</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    AST Token Parser
                  </span>
                </div>

                <div className="bg-navy-900 rounded-lg p-3.5 font-mono text-xs text-slate-200 overflow-x-auto border border-navy-800 leading-relaxed">
                  <pre>{selectedClaim.evidenceDiff}</pre>
                </div>
              </div>

              {/* Verification Finding Explanation */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Verification Engine Finding</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedClaim.explanation}
                </p>
              </div>

            </div>

            {/* Action Taken Footnote */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="font-bold text-navy-900">System Action:</span>
                <span>{selectedClaim.actionTaken}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Deterministic Audit
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
