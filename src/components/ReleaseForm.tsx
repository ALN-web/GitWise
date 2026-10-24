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
  FileText,
  ExternalLink,
  Code2
} from 'lucide-react';

export interface ReleaseFormData {
  repoUrl: string;
  startDate: string;
  endDate: string;
  releaseType: 'Weekly' | 'Minor Release' | 'Major Release';
}

interface ReleaseFormProps {
  onGenerate: (data: ReleaseFormData) => void;
  isGenerating?: boolean;
}

export const ReleaseForm: React.FC<ReleaseFormProps> = ({ 
  onGenerate,
  isGenerating = false 
}) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/facebook/react');
  const [startDate, setStartDate] = useState('2026-10-14');
  const [endDate, setEndDate] = useState('2026-10-21');
  const [releaseType, setReleaseType] = useState<'Weekly' | 'Minor Release' | 'Major Release'>('Weekly');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<ReleaseFormData | null>(null);

  const presets = [
    { name: 'facebook/react', url: 'https://github.com/facebook/react', type: 'Weekly' as const },
    { name: 'vercel/next.js', url: 'https://github.com/vercel/next.js', type: 'Weekly' as const },
    { name: 'tailwindlabs/tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss', type: 'Minor Release' as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanRepo = repoUrl.trim();
    if (!cleanRepo) {
      setError('Please provide a valid GitHub repository URL.');
      return;
    }

    if (!cleanRepo.includes('github.com/') && !cleanRepo.match(/^[\w-]+\/[\w.-]+$/)) {
      setError('Repository format must be https://github.com/owner/repo or owner/repo.');
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

  const sampleMarkdown = lastGenerated ? `# Release Notes — ${lastGenerated.repoUrl.replace('https://github.com/', '')} (${lastGenerated.releaseType})
Period: ${lastGenerated.startDate} to ${lastGenerated.endDate}
Verification Engine: GitWise Dual-Pass AST Auditor

### 🚀 Features & Enhancements
- **Server Actions Streaming Transitions**: Enabled native streaming transitions with fine-grained suspense boundaries ([#1422](https://github.com/${lastGenerated.repoUrl.replace('https://github.com/', '')}/pull/1422))
  - *Source Evidence*: \`packages/react-client/FlightClient.js:412\` (Status: Verified)
- **DOM Hydration Diagnostics**: Pinned exact line and column coordinates for mismatch resolution ([#1429](https://github.com/${lastGenerated.repoUrl.replace('https://github.com/', '')}/pull/1429))
  - *Source Evidence*: \`packages/react-dom/ReactDOMComponent.js:889\` (Status: Verified)

### 🐛 Bug Fixes
- **Fiber Unmount Cleanup**: Resolved closure retention in \`useDeferredValue\` during mid-transition component detachment ([#1435](https://github.com/${lastGenerated.repoUrl.replace('https://github.com/', '')}/pull/1435))
  - *Source Evidence*: \`packages/react-reconciler/ReactFiberHooks.js:1240\` (Status: Verified)
- **Concurrent Lane Inversion**: Corrected priority lane assignment during discrete updates ([#1412](https://github.com/${lastGenerated.repoUrl.replace('https://github.com/', '')}/pull/1412))
  - *Source Evidence*: \`packages/react-reconciler/ReactFiberWorkLoop.js:671\` (Status: Verified)

### 🛡️ GitWise Verification Audit
- Evaluated PRs: 28 merged changes
- Grounded Claims: 4 of 4 assertions traceable to git diff hunks (100%)
- Coverage Check: Passed (0 critical merged changes omitted)
- Factual Accuracy: Verified against repository AST` : '';

  const handleCopy = () => {
    if (sampleMarkdown) {
      navigator.clipboard.writeText(sampleMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="generate-form" className="py-16 bg-surface-light border-b border-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Card */}
        <div className="bg-white rounded-xl border border-surface-border shadow-card p-6 sm:p-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-surface-border">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                Generate release notes
              </h2>
              <p className="text-xs sm:text-sm text-surface-muted mt-1">
                Select a GitHub repository and date range to extract merged PRs and run independent claim verification.
              </p>
            </div>

            {/* Quick Demo Presets */}
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
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    repoUrl === preset.url 
                      ? 'border-brand-orange bg-brand-orange-light text-brand-orange font-medium' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-verification-error-bg border border-verification-error-border text-verification-error text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              
              {/* Field 1: GitHub URL (5 cols) */}
              <div className="md:col-span-5 space-y-1.5">
                <label htmlFor="repoUrl" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  GitHub repository URL <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-subtle">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <input
                    id="repoUrl"
                    type="text"
                    value={repoUrl}
                    disabled={isGenerating}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/facebook/react"
                    className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition disabled:opacity-60"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Start Date (2 cols) */}
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor="startDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Start date <span className="text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  disabled={isGenerating}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition disabled:opacity-60"
                  required
                />
              </div>

              {/* Field 3: End Date (2 cols) */}
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor="endDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  End date <span className="text-red-500">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  disabled={isGenerating}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition disabled:opacity-60"
                  required
                />
              </div>

              {/* Field 4: Release Type (3 cols) */}
              <div className="md:col-span-3 space-y-1.5">
                <label htmlFor="releaseType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Release type
                </label>
                <div className="relative">
                  <select
                    id="releaseType"
                    value={releaseType}
                    disabled={isGenerating}
                    onChange={(e) => setReleaseType(e.target.value as any)}
                    className="block w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition appearance-none cursor-pointer disabled:opacity-60"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Minor Release">Minor Release</option>
                    <option value="Major Release">Major Release</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Button Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="text-xs text-surface-muted flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Dual-pass verifier active • Illustrative demo mode enabled</span>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Pull Requests & Verifying Diffs...</span>
                  </>
                ) : (
                  <>
                    <span>Generate & Verify</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Embedded Markdown Output View */}
          {lastGenerated && !isGenerating && (
            <div className="mt-8 pt-6 border-t border-surface-border space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-navy-900">
                    Generated Release Notes (Verified)
                  </h3>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                    4 Claims Citing Source Diffs
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-navy-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
                </button>
              </div>

              <div className="bg-navy-900 rounded-lg p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-navy-800">
                <pre>{sampleMarkdown}</pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
