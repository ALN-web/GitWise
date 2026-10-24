import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download,
  ShieldCheck,
  ExternalLink,
  Code2,
  FileText
} from 'lucide-react';
import { ReleaseFormData } from './ReleaseForm';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface GeneratedNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ReleaseFormData | null;
}

export const GeneratedNotesModal: React.FC<GeneratedNotesModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'audit' | 'raw'>('preview');

  if (!isOpen) return null;

  const repoName = data?.repoUrl.replace('https://github.com/', '') || 'facebook/react';
  const releaseType = data?.releaseType || 'Weekly';
  const dateRange = `${data?.startDate || '2026-10-14'} → ${data?.endDate || '2026-10-21'}`;

  const markdownContent = `# Release Notes — ${repoName} (${releaseType})
Window: ${dateRange}
Verification Engine: GitWise v2.0 (Dual-Pass Deterministic)

### 🚀 Highlights & Features
- **Server Actions Streaming Transitions**: Enabled native streaming transitions with fine-grained suspense boundaries ([#1422](https://github.com/${repoName}/pull/1422))
  - *Evidence diff*: \`packages/react-client/src/ReactFlightClient.js:412\` (Status: Verified)
- **Hydration Error Context Diagnostics**: Error messages now pin the exact DOM mismatch line and column ([#1429](https://github.com/${repoName}/pull/1429))
  - *Evidence diff*: \`packages/react-dom/src/client/ReactDOMComponent.js:889\` (Status: Verified)

### 🐛 Bug Fixes
- **Memory Leak in useDeferredValue**: Resolved closure retention of previous fibers when component unmounts mid-transition ([#1435](https://github.com/${repoName}/pull/1435))
  - *Evidence diff*: \`packages/react-reconciler/src/ReactFiberHooks.js:1240\` (Status: Verified)
- **Concurrent Root Priority Inversion**: Corrected lane assignment for sync updates scheduled during discrete events ([#1412](https://github.com/${repoName}/pull/1412))
  - *Evidence diff*: \`packages/react-reconciler/src/ReactFiberWorkLoop.js:671\` (Status: Verified)

### 🛡️ GitWise Audit Summary
- Merged PRs analyzed: 28
- Grounded claims: 100% (4 of 4 assertions traceable to git diffs)
- Hallucinated references: 0 detected
- Coverage check: Passed (No merged feature PRs dropped)
- Verification status: VERIFIED & PUBLISH READY`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `release-notes-${repoName.replace('/', '-')}-${data?.startDate || 'run'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#0B1220] px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="modal-title" className="text-base font-bold text-white tracking-tight">
                  Verified Release Notes Document
                </h3>
                <Badge variant="verified" size="sm">
                  PASSED AUDIT
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                {repoName} • {dateRange} • {releaseType}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download Markdown file"
            >
              {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-blue-400" />}
              <span className="hidden sm:inline">{downloaded ? 'Downloaded' : 'Download'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verification Pipeline Step Tracker */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">1. GitHub Ingest</div>
                <div className="text-[10px] text-slate-500">28 PRs extracted</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">2. AI Synthesis</div>
                <div className="text-[10px] text-slate-500">Categorized draft</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">3. Claim Verification</div>
                <div className="text-[10px] text-slate-500">100% diff-grounded</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">4. Coverage Check</div>
                <div className="text-[10px] text-slate-500">0 PRs omitted</div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Rendered Release Document
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'audit'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Verification Audit Log (4 Claims)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('raw')}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'raw'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Raw Markdown
            </button>
          </div>

          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Deterministic Run #GW-8831
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-6">
          
          {activeTab === 'preview' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
              
              {/* Release Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Release Notes — {repoName}
                  </h2>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
                    {dateRange}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Validated against 28 merged PRs using GitWise ground-truth diff engine.
                </p>
              </div>

              {/* Section 1: Features */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Features & Enhancements</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-slate-900">Server Actions Streaming Transitions:</span>
                        {' '}Enabled native streaming transitions with fine-grained suspense boundaries.
                      </div>
                      <Badge variant="verified" size="sm">
                        PR #1422
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-mono text-slate-500 flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400">Diff Hunk:</span>
                      <span className="text-slate-700 break-all">
                        packages/react-client/src/ReactFlightClient.js:412
                      </span>
                    </div>
                  </li>

                  <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-slate-900">Hydration Error Context Diagnostics:</span>
                        {' '}Error messages now pin the exact DOM mismatch line and column coordinates.
                      </div>
                      <Badge variant="verified" size="sm">
                        PR #1429
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-mono text-slate-500 flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400">Diff Hunk:</span>
                      <span className="text-slate-700 break-all">
                        packages/react-dom/src/client/ReactDOMComponent.js:889
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Section 2: Bug Fixes */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Bug Fixes</span>
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-slate-900">Memory Leak in useDeferredValue:</span>
                        {' '}Resolved closure retention of previous fibers when component unmounts mid-transition.
                      </div>
                      <Badge variant="verified" size="sm">
                        PR #1435
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-mono text-slate-500 flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400">Diff Hunk:</span>
                      <span className="text-slate-700 break-all">
                        packages/react-reconciler/src/ReactFiberHooks.js:1240
                      </span>
                    </div>
                  </li>

                  <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-slate-900">Concurrent Root Priority Inversion:</span>
                        {' '}Corrected lane assignment for sync updates scheduled during discrete events.
                      </div>
                      <Badge variant="verified" size="sm">
                        PR #1412
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-mono text-slate-500 flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400">Diff Hunk:</span>
                      <span className="text-slate-700 break-all">
                        packages/react-reconciler/src/ReactFiberWorkLoop.js:671
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Evidence Audit Passed (4/4 Claims Grounded)</h4>
                    <p className="text-xs text-emerald-700">No fabricated assertions or dropped PRs detected in repository AST.</p>
                  </div>
                </div>
                <Badge variant="verified" size="md">
                  PASS RATE: 100%
                </Badge>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Claim 1 (PR #1422)</span>
                    <p className="text-slate-500 mt-0.5">Server Actions streaming transitions verify against ReactFlightClient diff.</p>
                  </div>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">MATCH: 0.982</span>
                </div>
                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Claim 2 (PR #1429)</span>
                    <p className="text-slate-500 mt-0.5">Hydration error line/col verified against ReactDOMComponent diff.</p>
                  </div>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">MATCH: 0.994</span>
                </div>
                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Claim 3 (PR #1435)</span>
                    <p className="text-slate-500 mt-0.5">Memory leak fiber unmount fix verified in ReactFiberHooks diff.</p>
                  </div>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">MATCH: 0.979</span>
                </div>
                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Claim 4 (PR #1412)</span>
                    <p className="text-slate-500 mt-0.5">Lane assignment update verified in ReactFiberWorkLoop diff.</p>
                  </div>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">MATCH: 0.965</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="relative">
              <pre className="bg-[#0B1220] text-slate-200 p-5 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                {markdownContent}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Interactive Sample Data • Ready for Production GitHub Webhook connection</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownload}
              leftIcon={downloaded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
            >
              {downloaded ? 'Downloaded' : 'Download .md'}
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy Release Notes'}
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
