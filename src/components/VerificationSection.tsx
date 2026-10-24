import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  GitPullRequest,
  FileCode2,
  ChevronRight,
  Sparkles,
  Info,
  ExternalLink,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface VerificationClaim {
  id: string;
  claim: string;
  supportingPr: string;
  prUrl?: string;
  prTitle: string;
  sourceReference: string;
  status: 'verified' | 'unsupported' | 'missing' | 'invalid_ref';
  statusLabel: string;
  checkType: 'Deterministic AST Check' | 'Semantic Diff Analysis' | 'Coverage Completeness Check';
  explanation: string;
  evidenceDiff: string;
  actionTaken: string;
}

interface VerificationSectionProps {
  onOpenArchitectureDrawer?: () => void;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  onOpenArchitectureDrawer,
}) => {
  const claims: VerificationClaim[] = [
    {
      id: 'claim-1',
      claim: 'Server Actions now support streaming transitions directly with suspense boundaries.',
      supportingPr: 'PR #1422',
      prUrl: 'https://github.com/facebook/react/pull/1422',
      prTitle: 'feat(actions): stream async transition payload over Flight protocol',
      sourceReference: 'packages/react-client/src/ReactFlightClient.js:412',
      status: 'verified',
      statusLabel: 'Verified Claim',
      checkType: 'Deterministic AST Check',
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
      prUrl: 'https://github.com/facebook/react/pull/1435',
      prTitle: 'fix(hooks): detach unmounted listener in useDeferredValue',
      sourceReference: 'packages/react-reconciler/src/ReactFiberHooks.js:1240',
      status: 'unsupported',
      statusLabel: 'Unsupported Claim',
      checkType: 'Semantic Diff Analysis',
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
      prUrl: 'https://github.com/facebook/react/pull/1415',
      prTitle: 'security: sanitize xlink:href and malicious svg tags in ssr stream',
      sourceReference: 'packages/react-dom/src/server/ReactXmlSanitizer.js:84',
      status: 'missing',
      statusLabel: 'Missing Relevant PR',
      checkType: 'Coverage Completeness Check',
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
      checkType: 'Deterministic AST Check',
      explanation: 'Hallucinated PR ID. No commit or pull request matching #9841 exists in the git tree for this release window.',
      evidenceDiff: `ERR_REF_NOT_FOUND: git rev-list PR-9841 returned exit code 128 (unknown revision)`,
      actionTaken: 'Purged from release notes; synthesizer re-grounded to git diff tokens.'
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('claim-1');
  const selectedClaim = claims.find((c) => c.id === selectedId) || claims[0];

  const renderBadge = (status: VerificationClaim['status']) => {
    switch (status) {
      case 'verified':
        return <Badge variant="verified" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>Verified</Badge>;
      case 'unsupported':
        return <Badge variant="unsupported" size="sm" icon={<AlertTriangle className="w-3 h-3" />}>Unsupported</Badge>;
      case 'missing':
        return <Badge variant="missing" size="sm" icon={<AlertCircle className="w-3 h-3" />}>Missing PR</Badge>;
      case 'invalid_ref':
        return <Badge variant="error" size="sm" icon={<AlertCircle className="w-3 h-3" />}>Invalid Ref</Badge>;
    }
  };

  return (
    <section id="verification" className="scroll-mt-24 py-24 bg-surface-light border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
              THE GITWISE DIFFERENTIATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight font-sans">
              Every claim should have evidence.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
              Inspect the relationship between generated release notes and the source pull requests that support them.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenArchitectureDrawer && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenArchitectureDrawer}
                leftIcon={<Layers className="w-4 h-4 text-blue-600" />}
              >
                5-Stage Pipeline
              </Button>
            )}

            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Evidence Inspector</span>
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          
          {/* Left Column: Claims List (5 cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 divide-y divide-slate-100">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                Audited Statements ({claims.length})
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Click finding to inspect
              </span>
            </div>

            {claims.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4.5 transition-all flex items-start justify-between gap-3 ${
                    isSelected 
                      ? 'bg-blue-50/70 border-l-4 border-l-blue-600' 
                      : 'hover:bg-slate-50/80 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderBadge(item.status)}
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.supportingPr}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug">
                      {item.claim}
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      {item.sourceReference}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Ground Truth Evidence Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClaim.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {renderBadge(selectedClaim.status)}
                      <span className="text-xs font-mono text-slate-500">
                        {selectedClaim.supportingPr}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {selectedClaim.checkType}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {selectedClaim.claim}
                    </h3>
                  </div>
                </div>

                {/* Pull Request Source Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                      Target Pull Request
                    </span>
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span className="truncate">{selectedClaim.prTitle}</span>
                      {selectedClaim.prUrl && (
                        <a 
                          href={selectedClaim.prUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-700 ml-1 flex-shrink-0"
                          title="Open PR on GitHub"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                      AST Source Coordinate
                    </span>
                    <span className="font-mono text-slate-800 break-all">
                      {selectedClaim.sourceReference}
                    </span>
                  </div>
                </div>

                {/* Raw Diff Hunk Evidence */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                      <FileCode2 className="w-4 h-4 text-blue-600" />
                      <span>Ground Truth Git Diff Evidence</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      AST Token Parser
                    </span>
                  </div>

                  <div className="bg-[#0B1220] rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                    <pre className="whitespace-pre-wrap break-words">{selectedClaim.evidenceDiff}</pre>
                  </div>
                </div>

                {/* Verification Finding Explanation */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>Verification Engine Finding</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedClaim.explanation}
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Action Taken Footnote */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="font-bold text-slate-900">System Action:</span>
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
