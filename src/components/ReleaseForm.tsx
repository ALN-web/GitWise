import React, { useState } from 'react';
import { 
  Github, 
  Layers, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Calendar,
  Sparkles,
  History,
  FileText,
  Code2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';

export interface ReleaseFormData {
  repoUrl: string;
  startDate: string;
  endDate: string;
  releaseType: 'Weekly' | 'Minor Release' | 'Major Release';
}

interface ReleaseFormProps {
  onGenerate: (data: ReleaseFormData) => void;
  isGenerating?: boolean;
  onCancelGeneration?: () => void;
  onOpenHistory?: () => void;
  historyCount?: number;
}

export const ReleaseForm: React.FC<ReleaseFormProps> = ({ 
  onGenerate,
  isGenerating = false,
  onCancelGeneration,
  onOpenHistory,
  historyCount = 0,
}) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/facebook/react');
  const [startDate, setStartDate] = useState('2026-10-14');
  const [endDate, setEndDate] = useState('2026-10-21');
  const [releaseType, setReleaseType] = useState<'Weekly' | 'Minor Release' | 'Major Release'>('Weekly');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [previewTab, setPreviewTab] = useState<'rendered' | 'raw'>('rendered');
  const [lastGenerated, setLastGenerated] = useState<ReleaseFormData | null>({
    repoUrl: 'https://github.com/facebook/react',
    startDate: '2026-10-14',
    endDate: '2026-10-21',
    releaseType: 'Weekly',
  });

  const presets = [
    { name: 'facebook/react', url: 'https://github.com/facebook/react', type: 'Weekly' as const },
    { name: 'vercel/next.js', url: 'https://github.com/vercel/next.js', type: 'Weekly' as const },
    { name: 'tailwindlabs/tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss', type: 'Minor Release' as const },
  ];

  // Validation logic
  const isRepoValid = (url: string) => {
    const clean = url.trim();
    if (!clean) return false;
    return clean.includes('github.com/') || /^[\w-]+\/[\w.-]+$/.test(clean);
  };

  const isDateValid = Boolean(startDate && endDate && new Date(startDate) <= new Date(endDate));
  const isFormValid = isRepoValid(repoUrl) && isDateValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanRepo = repoUrl.trim();
    if (!cleanRepo) {
      setError('Please provide a GitHub repository URL.');
      return;
    }

    if (!isRepoValid(cleanRepo)) {
      setError('Invalid format. Use https://github.com/owner/repo or owner/repo.');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please specify both a start date and an end date.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after the end date.');
      return;
    }

    const payload = {
      repoUrl: cleanRepo,
      startDate,
      endDate,
      releaseType,
    };

    setLastGenerated(payload);
    onGenerate(payload);
  };

  const repoCleanName = (lastGenerated?.repoUrl || repoUrl).replace('https://github.com/', '');

  const sampleMarkdown = lastGenerated ? `# Release Notes — ${repoCleanName} (${lastGenerated.releaseType})
Period: ${lastGenerated.startDate} to ${lastGenerated.endDate}
Verification Engine: GitWise Dual-Pass AST Auditor (Deterministic)

### 🚀 Features & Enhancements
- **Server Actions Streaming Transitions**: Enabled native streaming transitions with fine-grained suspense boundaries ([#1422](https://github.com/${repoCleanName}/pull/1422))
  - *Source Evidence*: \`packages/react-client/FlightClient.js:412\` (Status: Verified)
- **DOM Hydration Diagnostics**: Pinned exact line and column coordinates for mismatch resolution ([#1429](https://github.com/${repoCleanName}/pull/1429))
  - *Source Evidence*: \`packages/react-dom/ReactDOMComponent.js:889\` (Status: Verified)

### 🐛 Bug Fixes
- **Fiber Unmount Cleanup**: Resolved closure retention in \`useDeferredValue\` during mid-transition component detachment ([#1435](https://github.com/${repoCleanName}/pull/1435))
  - *Source Evidence*: \`packages/react-reconciler/ReactFiberHooks.js:1240\` (Status: Verified)
- **Concurrent Lane Inversion**: Corrected priority lane assignment during discrete updates ([#1412](https://github.com/${repoCleanName}/pull/1412))
  - *Source Evidence*: \`packages/react-reconciler/ReactFiberWorkLoop.js:671\` (Status: Verified)

### 🛡️ GitWise Verification Audit
- Evaluated PRs: 28 merged changes
- Grounded Claims: 4 of 4 assertions traceable to git diff hunks (100%)
- Hallucinated references: 0 detected
- Coverage Check: Passed (0 critical merged changes omitted)
- Factual Accuracy: 100% verified against repository AST` : '';

  const handleCopy = () => {
    if (sampleMarkdown) {
      navigator.clipboard.writeText(sampleMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!sampleMarkdown) return;
    const blob = new Blob([sampleMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `release-notes-${repoCleanName.replace('/', '-')}-${lastGenerated?.startDate || 'run'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <section id="workspace" className="scroll-mt-24 py-20 bg-white border-b border-surface-border">
      <div id="generate-form" className="scroll-mt-24" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Card with Refined Shadow */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-10">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Workspace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                Generate verified release notes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Specify a repository and release window. GitWise extracts merged pull requests and independently checks each statement against AST diff tokens.
              </p>
            </div>

            {/* Presets and History */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-medium">Presets:</span>
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  disabled={isGenerating}
                  onClick={() => {
                    setRepoUrl(preset.url);
                    setReleaseType(preset.type);
                    setError(null);
                  }}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                    repoUrl === preset.url 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                  }`}
                >
                  {preset.name}
                </button>
              ))}

              {onOpenHistory && (
                <button
                  type="button"
                  onClick={onOpenHistory}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium transition-colors shadow-sm ml-1"
                >
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  <span>Runs ({historyCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              
              {/* Field 1: GitHub URL (5 cols) */}
              <div className="md:col-span-5">
                <Input
                  label="GitHub Repository URL"
                  required
                  id="repoUrl"
                  value={repoUrl}
                  disabled={isGenerating}
                  onChange={(e) => {
                    setRepoUrl(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="https://github.com/facebook/react"
                  leftIcon={<Github className="w-4 h-4" />}
                  helperText="Format: https://github.com/owner/repo or owner/repo"
                  error={repoUrl && !isRepoValid(repoUrl) ? 'Invalid GitHub URL format' : undefined}
                />
              </div>

              {/* Field 2: Start Date (2 cols) */}
              <div className="md:col-span-2">
                <Input
                  label="Start Date"
                  required
                  type="date"
                  id="startDate"
                  value={startDate}
                  disabled={isGenerating}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (error) setError(null);
                  }}
                  helperText="Window start"
                />
              </div>

              {/* Field 3: End Date (2 cols) */}
              <div className="md:col-span-2">
                <Input
                  label="End Date"
                  required
                  type="date"
                  id="endDate"
                  value={endDate}
                  disabled={isGenerating}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (error) setError(null);
                  }}
                  helperText="Window end"
                  error={startDate && endDate && new Date(startDate) > new Date(endDate) ? 'End date must be after start' : undefined}
                />
              </div>

              {/* Field 4: Release Type (3 cols) */}
              <div className="md:col-span-3 space-y-1.5">
                <label htmlFor="releaseType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Release Type
                </label>
                <div className="relative">
                  <select
                    id="releaseType"
                    value={releaseType}
                    disabled={isGenerating}
                    onChange={(e) => setReleaseType(e.target.value as any)}
                    className="block w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer disabled:opacity-60"
                  >
                    <option value="Weekly">Weekly Digest</option>
                    <option value="Minor Release">Minor Release</option>
                    <option value="Major Release">Major Release</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Defines semantic grouping</p>
              </div>

            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Deterministic mode active • 0 ungrounded claims policy</span>
              </div>

              <div className="flex items-center gap-3">
                {isGenerating && onCancelGeneration && (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={onCancelGeneration}
                    leftIcon={<XCircle className="w-4 h-4 text-slate-500" />}
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={!isFormValid || isGenerating}
                  isLoading={isGenerating}
                  size="md"
                  rightIcon={!isGenerating && <ArrowRight className="w-4 h-4" />}
                >
                  {isGenerating ? 'Analyzing PRs & Grounding Diffs...' : 'Generate & Verify'}
                </Button>
              </div>
            </div>
          </form>

          {/* Embedded Verified Markdown Output View */}
          <AnimatePresence>
            {lastGenerated && !isGenerating && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10 pt-8 border-t border-slate-200 space-y-4"
              >
                {/* Release Summary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900 font-sans">
                          Release Notes for {repoCleanName}
                        </h3>
                        <Badge variant="verified" size="sm">
                          100% Diff Grounded
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        {lastGenerated.releaseType} • Period: {lastGenerated.startDate} → {lastGenerated.endDate}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Tab Switcher */}
                  <div className="flex items-center gap-2">
                    {/* View mode toggle */}
                    <div className="bg-white rounded-lg p-0.5 border border-slate-200 flex items-center">
                      <button
                        type="button"
                        onClick={() => setPreviewTab('rendered')}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          previewTab === 'rendered'
                            ? 'bg-slate-100 text-slate-900 font-semibold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab('raw')}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          previewTab === 'raw'
                            ? 'bg-slate-100 text-slate-900 font-semibold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Raw Markdown
                      </button>
                    </div>

                    {/* Copy action */}
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-sm"
                      title="Copy release notes to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    {/* Download action */}
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      title="Download as .md file"
                    >
                      {downloaded ? <Check className="w-3.5 h-3.5 text-white" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{downloaded ? 'Downloaded' : 'Download .md'}</span>
                    </button>
                  </div>
                </div>

                {/* Tab 1: Rendered Document Preview */}
                {previewTab === 'rendered' ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
                    {/* Features section */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Features & Enhancements
                      </h4>
                      <ul className="space-y-3">
                        <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-900">
                              Server Actions Streaming Transitions
                            </span>
                            <a
                              href={`https://github.com/${repoCleanName}/pull/1422`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-xs text-blue-600 hover:underline"
                            >
                              <span>PR #1422</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            Enabled native streaming transitions with fine-grained suspense boundaries.
                          </p>
                          <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-200">
                            <Badge variant="verified" size="sm">Evidence</Badge>
                            <span className="text-slate-600 break-all">packages/react-client/FlightClient.js:412</span>
                          </div>
                        </li>

                        <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-900">
                              DOM Hydration Diagnostics
                            </span>
                            <a
                              href={`https://github.com/${repoCleanName}/pull/1429`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-xs text-blue-600 hover:underline"
                            >
                              <span>PR #1429</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            Pinned exact line and column coordinates for mismatch resolution.
                          </p>
                          <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-200">
                            <Badge variant="verified" size="sm">Evidence</Badge>
                            <span className="text-slate-600 break-all">packages/react-dom/ReactDOMComponent.js:889</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Bug fixes section */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Bug Fixes
                      </h4>
                      <ul className="space-y-3">
                        <li className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-900">
                              Fiber Unmount Cleanup
                            </span>
                            <a
                              href={`https://github.com/${repoCleanName}/pull/1435`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-xs text-blue-600 hover:underline"
                            >
                              <span>PR #1435</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            Resolved closure retention in useDeferredValue during mid-transition component detachment.
                          </p>
                          <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center gap-1.5 bg-white p-1.5 rounded border border-slate-200">
                            <Badge variant="verified" size="sm">Evidence</Badge>
                            <span className="text-slate-600 break-all">packages/react-reconciler/ReactFiberHooks.js:1240</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  /* Tab 2: Raw Markdown */
                  <div className="bg-[#0B1220] rounded-xl p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                    <pre className="whitespace-pre-wrap break-words">{sampleMarkdown}</pre>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
