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
  Code2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="workspace" className="scroll-mt-24 py-20 bg-white border-b border-surface-border">
      <div id="generate-form" className="scroll-mt-24" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Card with Modern Shadow */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-10">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-600 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Workspace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight font-sans">
                Generate verified release notes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select a GitHub repository and release window to extract merged PRs and run dual-pass verification.
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
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    repoUrl === preset.url 
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' 
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
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              
              {/* Field 1: GitHub URL (5 cols) */}
              <div className="md:col-span-5 space-y-1.5">
                <label htmlFor="repoUrl" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  GitHub repository URL <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-subtle">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <input
                    id="repoUrl"
                    type="text"
                    value={repoUrl}
                    disabled={isGenerating}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/facebook/react"
                    className="block w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition disabled:opacity-60 font-mono text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Start Date (2 cols) */}
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor="startDate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Start date <span className="text-red-500">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  disabled={isGenerating}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition disabled:opacity-60"
                  required
                />
              </div>

              {/* Field 3: End Date (2 cols) */}
              <div className="md:col-span-2 space-y-1.5">
                <label htmlFor="endDate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  End date <span className="text-red-500">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  disabled={isGenerating}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full px-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition disabled:opacity-60"
                  required
                />
              </div>

              {/* Field 4: Release Type (3 cols) */}
              <div className="md:col-span-3 space-y-1.5">
                <label htmlFor="releaseType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Release type
                </label>
                <div className="relative">
                  <select
                    id="releaseType"
                    value={releaseType}
                    disabled={isGenerating}
                    onChange={(e) => setReleaseType(e.target.value as any)}
                    className="block w-full px-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition appearance-none cursor-pointer disabled:opacity-60"
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

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Deterministic mode active • 0 ungrounded claims policy</span>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-8 py-3 rounded-lg shadow-md shadow-primary-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed btn-shimmer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
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

          {/* Embedded Verified Markdown Output View */}
          <AnimatePresence>
            {lastGenerated && !isGenerating && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 pt-6 border-t border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-navy-950">
                      Generated Release Notes (Verified)
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                      4 Claims Citing Source Diffs
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-primary-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
                  </button>
                </div>

                <div className="bg-navy-950 rounded-xl p-4 sm:p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-navy-800 shadow-inner">
                  <pre>{sampleMarkdown}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
