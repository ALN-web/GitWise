import React, { useState } from 'react';
import { 
  Github, 
  Layers, 
  ArrowRight, 
  Loader2, 
  AlertCircle 
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

  const presets = [
    { name: 'facebook/react', url: 'https://github.com/facebook/react', type: 'Weekly' as const },
    { name: 'vercel/next.js', url: 'https://github.com/vercel/next.js', type: 'Weekly' as const },
    { name: 'tailwindlabs/tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss', type: 'Minor Release' as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const cleanRepo = repoUrl.trim();
    if (!cleanRepo) {
      setError('Please provide a valid GitHub repository URL.');
      return;
    }

    if (!cleanRepo.includes('github.com/') && !cleanRepo.match(/^[\w-]+\/[\w.-]+$/)) {
      setError('Format must be https://github.com/owner/repo or owner/repo.');
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

    onGenerate({
      repoUrl: cleanRepo,
      startDate,
      endDate,
      releaseType,
    });
  };

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-6 sm:p-8 transition-all">
        
        {/* Form Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
              Generate your <span className="text-brand-orange">verified release notes</span>
            </h2>
            <p className="text-xs sm:text-sm text-surface-muted mt-1">
              Connect a GitHub repository to extract merged pull requests and run dual-pass verification.
            </p>
          </div>

          {/* Quick Demo Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-400">Sample presets:</span>
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
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

        {/* Form Error Banner */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Inputs Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Field 1: GitHub repository URL (4 cols) */}
            <div className="md:col-span-4 space-y-1.5">
              <label htmlFor="repoUrl" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                GitHub repository URL
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Github className="w-4 h-4" />
                </div>
                <input
                  id="repoUrl"
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Field 2: Start Date (2 cols) */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="startDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Start date
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Field 3: End Date (2 cols) */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="endDate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                End date
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Field 4: Release Type (2 cols) */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="releaseType" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Release type
              </label>
              <div className="relative rounded-lg shadow-sm">
                <select
                  id="releaseType"
                  value={releaseType}
                  onChange={(e) => setReleaseType(e.target.value as any)}
                  className="block w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition appearance-none cursor-pointer"
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

            {/* Field 5: Submit Button (2 cols) */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full h-[42px] bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Notes</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </form>

        {/* Clarifying Disclaimer Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Interactive Prototype Mode: Uses verified sample PR data without requiring your private GitHub token.</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">API Boundary: Clean Mock Integration Ready</span>
        </div>

      </div>
    </div>
  );
};
