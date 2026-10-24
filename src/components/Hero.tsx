import React from 'react';
import { 
  GitPullRequest, 
  Link as LinkIcon, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  GitCommit,
  Sparkles,
  TerminalSquare
} from 'lucide-react';

interface HeroProps {
  onOpenGenerateModal: () => void;
  onOpenVerificationDrawer: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenGenerateModal,
  onOpenVerificationDrawer,
}) => {
  return (
    <section id="overview" className="relative bg-navy-900 text-white overflow-hidden pt-12 pb-28 md:pt-16 md:pb-36 lg:pb-44">
      {/* Background Graphic Grid & Cinematic Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Atmospheric gradient overlay */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-navy-800/40 via-navy-900/60 to-navy-900 z-0 pointer-events-none" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800/80 border border-slate-700/60 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>AI-Powered Release Engineering</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
              Ship <span className="text-brand-orange">with confidence.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Turn merged GitHub pull requests into clear, accurate release notes. ReleaseGuard independently verifies every claim against source evidence before you publish.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                type="button"
                onClick={onOpenGenerateModal}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-semibold px-7 py-3.5 rounded-md shadow-lg shadow-brand-orange/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Generate Release Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenVerificationDrawer}
                className="bg-navy-800/80 hover:bg-navy-700 border border-slate-700 text-slate-200 hover:text-white text-base font-medium px-6 py-3.5 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Explore Verification</span>
              </button>
            </div>

            {/* 4 Compact Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80 w-full">
              {/* Indicator 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-brand-orange mt-0.5">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">GitHub-powered</div>
                  <div className="text-xs text-slate-400">PR & commit ingestion</div>
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-brand-orange mt-0.5">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">Source-linked</div>
                  <div className="text-xs text-slate-400">Claims cite diff evidence</div>
                </div>
              </div>

              {/* Indicator 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-brand-orange mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">Independent</div>
                  <div className="text-xs text-slate-400">Dual-pass verification</div>
                </div>
              </div>

              {/* Indicator 4 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-brand-orange mt-0.5">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">Bounded retries</div>
                  <div className="text-xs text-slate-400">Deterministic loop (max 3)</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Engineering Environment & Floating White Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Visual Engineering Backdrop: Code review / Diff terminal card */}
            <div className="w-full max-w-md lg:max-w-none rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 bg-navy-950/90 relative">
              
              {/* Window Header */}
              <div className="bg-navy-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 font-mono ml-2">release-verifier.ts — gitwise-core</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <GitCommit className="w-3 h-3 text-brand-orange" />
                  <span>main:f8b3c10</span>
                </div>
              </div>

              {/* Code Preview Lines */}
              <div className="p-4 font-mono text-xs text-slate-300 space-y-2 select-none">
                <div className="text-slate-500">// ReleaseGuard automated verification run</div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-300">evidence</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-yellow-300">await</span>
                  <span className="text-emerald-400">verifyDraft</span>
                  <span className="text-slate-400">(&#123;</span>
                </div>
                <div className="pl-4 text-slate-400">
                  prRange: <span className="text-green-300">"#1400..#1432"</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  auditStrictness: <span className="text-orange-300">"adverse-evidence"</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  maxRetries: <span className="text-sky-300">3</span>,
                </div>
                <div className="text-slate-400">&#125;);</div>
                
                {/* Visual Terminal Log */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] space-y-1.5 text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>[Research] 28 merged PRs extracted</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>[Verification] 100% claims mapped to diff tokens</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>[Coverage] PR #1418 added after retry #1</span>
                  </div>
                </div>
              </div>

              {/* Atmospheric Image: Developer Code Review Environment Background */}
              <div className="h-44 bg-gradient-to-t from-navy-950 via-navy-900 to-transparent relative overflow-hidden border-t border-slate-800/80">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
                  alt="Software engineering developer workspace" 
                  className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-navy-900/70" />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-800/90 border border-slate-700 flex items-center justify-center text-brand-orange shadow-inner">
                      <TerminalSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Engine V2.4</div>
                      <div className="text-[11px] text-slate-400">Ready for release window</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    LIVE READY
                  </span>
                </div>
              </div>
            </div>

            {/* Floating White Information Card — exact placement & scale to reference */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-2 md:right-4 w-[280px] sm:w-[310px] bg-white rounded-xl shadow-2xl p-5 border border-slate-100 text-slate-800 transition-transform duration-300 hover:shadow-floating">
              
              {/* Card Header: Orange Circular Icon Badge */}
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-orange-light border border-brand-orange-border flex items-center justify-center text-brand-orange flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-900 leading-snug">
                    Release Verification
                  </h3>
                  <p className="text-[11px] text-surface-muted">
                    Automated claim audit engine
                  </p>
                </div>
              </div>

              {/* Example Content Rows */}
              <div className="space-y-2.5 pt-1 text-xs">
                {/* Row 1 */}
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Source references</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Pull request coverage</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    Checked
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Unsupported claims</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                    <AlertCircle className="w-3 h-3" />
                    Flagged
                  </span>
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-600 font-medium">Final report</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-orange bg-brand-orange-light px-2 py-0.5 rounded text-[11px]">
                    <FileText className="w-3 h-3" />
                    Ready
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer Link */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenVerificationDrawer}
                  className="text-xs font-semibold text-brand-orange hover:text-brand-orange-hover flex items-center gap-1 transition-colors"
                >
                  <span>Inspect verification details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-[10px] text-slate-400 font-mono">UI Preview</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
