import React from 'react';
import { 
  GitPullRequest, 
  Link as LinkIcon, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  GitCommit,
  ExternalLink,
  Layers,
  FileCheck2
} from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onExploreVerification: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToForm,
  onExploreVerification,
}) => {
  return (
    <section id="overview" className="relative bg-navy-900 text-white pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Subtle Grid & Depth */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.12) 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-slate-700/80 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>AI-Powered Release Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5 text-white">
              Release notes <span className="text-brand-orange">you can trust.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              Turn merged GitHub pull requests into clear release notes. GitWise independently checks every claim against source evidence before you publish.
            </p>

            {/* Actions: Primary + Secondary */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onScrollToForm}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-navy-900"
              >
                <span>Generate Release Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreVerification}
                className="bg-navy-800 hover:bg-navy-700 border border-slate-700/80 text-slate-200 hover:text-white text-sm sm:text-base font-medium px-5 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Explore Verification</span>
              </button>
            </div>

            {/* Exactly 3 Compact Value Propositions */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full max-w-lg">
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-navy-800 border border-slate-700/80 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <GitPullRequest className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 tracking-tight">
                  GitHub-integrated
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-navy-800 border border-slate-700/80 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <LinkIcon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 tracking-tight">
                  Evidence-linked
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-navy-800 border border-slate-700/80 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 tracking-tight">
                  Independently verified
                </span>
              </div>

            </div>

          </div>

          {/* Right Hero Column: One Cohesive Product-Preview Panel */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-xl overflow-hidden border border-slate-700/80 bg-navy-800 shadow-2xl">
              
              {/* Product Preview Top Bar */}
              <div className="bg-navy-950 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 ml-1">
                    facebook/react • Weekly Draft
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Demo data
                  </span>
                </div>
              </div>

              {/* Release Metadata Banner */}
              <div className="bg-navy-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="text-slate-400">Release Window:</span>
                  <span className="font-semibold text-white">Oct 14 – Oct 21</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">28 Merged PRs</span>
              </div>

              {/* Release Draft Body */}
              <div className="p-4 space-y-3.5 text-xs">
                
                {/* Feature item 1 */}
                <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-slate-200 leading-snug">
                      <strong className="text-white">Server Actions Streaming:</strong> Native streaming transitions with fine-grained suspense boundaries.
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded flex-shrink-0">
                      PR #1422
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <span>Source diff:</span>
                    <span className="text-slate-300">packages/react-client/FlightClient.js:412</span>
                    <span className="text-emerald-400 font-bold ml-auto">✓ Verified</span>
                  </div>
                </div>

                {/* Feature item 2 */}
                <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-slate-200 leading-snug">
                      <strong className="text-white">DOM Hydration Diagnostics:</strong> Pinned line and column coordinates for DOM mismatches.
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded flex-shrink-0">
                      PR #1429
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <span>Source diff:</span>
                    <span className="text-slate-300">packages/react-dom/ReactDOMComponent.js:889</span>
                    <span className="text-emerald-400 font-bold ml-auto">✓ Verified</span>
                  </div>
                </div>

                {/* Bug Fix item */}
                <div className="p-3 rounded-lg bg-navy-900/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-slate-200 leading-snug">
                      <strong className="text-white">Fiber Cleanup:</strong> Resolved closure retention in <code className="text-orange-300 bg-navy-950 px-1 py-0.5 rounded">useDeferredValue</code> during unmount.
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded flex-shrink-0">
                      PR #1435
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <span>Source diff:</span>
                    <span className="text-slate-300">packages/react-reconciler/ReactFiberHooks.js:1240</span>
                    <span className="text-emerald-400 font-bold ml-auto">✓ Verified</span>
                  </div>
                </div>

              </div>

              {/* Integrated Verification Summary Footer */}
              <div className="bg-navy-950 px-4 py-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>4/4 claims verified</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-300 text-[11px]">0 unsupported claims</span>
                </div>

                <button
                  type="button"
                  onClick={onExploreVerification}
                  className="text-brand-orange hover:text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Inspect evidence</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
