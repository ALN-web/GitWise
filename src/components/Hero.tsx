import React from 'react';
import { 
  GitPullRequest, 
  ShieldCheck, 
  SearchCheck, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  GitCommit,
  Terminal,
  ExternalLink,
  Code2,
  FileCheck2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToForm: () => void;
  onExploreVerification: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToForm,
  onExploreVerification,
}) => {
  const overlapCards = [
    {
      icon: GitPullRequest,
      title: 'GitHub Research',
      description: 'Ingests merged PRs, commit messages, and diff hunks within your release window.',
      linkText: 'Explore research',
      href: '#capabilities',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence Grounding',
      description: 'AST diff tokenizer connects release claims to exact lines of code.',
      linkText: 'Inspect diff tokens',
      href: '#verification',
    },
    {
      icon: SearchCheck,
      title: 'Dual-Pass Audit',
      description: 'An independent adversary model flags unsupported statements and hyperbole.',
      linkText: 'View audit rules',
      href: '#verification',
    },
    {
      icon: RotateCcw,
      title: 'Coverage Retries',
      description: 'Detects omitted pull requests and triggers deterministic retry loops.',
      linkText: 'Check coverage',
      href: '#capabilities',
    },
  ];

  return (
    <section id="overview" className="scroll-mt-24 relative bg-navy-900 text-white overflow-hidden">
      
      {/* Cinematic Background Image with Gradient Overlay matching reference */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80"
          alt="Modern developer workspace and code review environment"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity filter contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
      </div>

      {/* Ambient Lighting & Particles */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Badge matching reference style */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-950/80 border border-primary-500/30 text-primary-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
              <span>AI-Powered Release Intelligence • 100% Grounded</span>
            </div>

            {/* Massive Bold Headline matching reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white font-sans">
              Smart Release & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary-300 to-cyan-300">
                Verification Services
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              Turn merged GitHub pull requests into clear, accurate weekly release notes. GitWise independently checks every claim against source evidence before you publish.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onScrollToForm}
                className="bg-primary-600 hover:bg-primary-700 text-white text-base font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-primary-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 btn-shimmer"
              >
                <span>Generate Release Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreVerification}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white text-base font-semibold px-6 py-3.5 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-primary-400" />
                <span>Explore Verification</span>
              </button>
            </div>
          </motion.div>

          {/* Right Product Preview Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-2xl overflow-hidden border border-slate-700/80 bg-navy-950/90 shadow-2xl backdrop-blur-md">
              
              {/* Window Header */}
              <div className="bg-navy-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-300 ml-2">
                    facebook/react • Release Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-primary-600/30 text-primary-300 border border-primary-500/40 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              {/* Preview Body */}
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-navy-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-200 font-semibold font-sans">
                      Server Actions Streaming Transitions
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      PR #1422
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>FlightClient.js:412</span>
                    <span className="text-emerald-400">100% Diff Match</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-navy-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-200 font-semibold font-sans">
                      DOM Hydration Context Diagnostics
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      PR #1429
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>ReactDOMComponent.js:889</span>
                    <span className="text-emerald-400">100% Diff Match</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-navy-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-200 font-semibold font-sans">
                      Memory Leak Fiber Unmount Fix
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      PR #1435
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>ReactFiberHooks.js:1240</span>
                    <span className="text-emerald-400">100% Diff Match</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="bg-navy-900 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  0 Unsupported Claims
                </span>
                <span>Demo Data</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* 4 Overlapping Floating Cards Grid matching the Reference Screenshot */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overlapCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-primary-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer text-slate-900"
              >
                <div>
                  {/* Top Blue Icon Badge matching reference */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-600 mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Card Title matching reference */}
                  <h3 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-primary-600 transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Text Link with Arrow matching reference */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
