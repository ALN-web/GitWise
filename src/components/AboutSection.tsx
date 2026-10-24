import React from 'react';
import { 
  ShieldCheck, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  GitBranch, 
  FileCheck2, 
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  onExploreVerification: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreVerification }) => {
  return (
    <section className="py-20 bg-white border-b border-surface-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Image with Diagonal Slash & Floating Blue Circular Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Visual Container with Rounded Corners & Shadow */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-navy-950 group">
              <img
                src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1000&q=80"
                alt="Git pull request and diff verification terminal"
                className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-75"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-transparent" />
              
              {/* Diagonal White Beam / Slash across the top-right corner matching reference */}
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="w-[200%] h-1 bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45 translate-y-24 translate-x-12 opacity-80 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>

              {/* Code Inspection Terminal Snippet inside */}
              <div className="absolute top-6 left-6 right-6 p-4 rounded-xl bg-navy-900/90 border border-slate-700/80 backdrop-blur-md font-mono text-xs text-slate-200 shadow-xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-white">AST Diff Tokenizer</span>
                  </div>
                  <span className="text-primary-400">100% CITED</span>
                </div>
                <div className="text-emerald-400 text-[11px]">
                  ✓ Verified: [PR #1422] mapped to ReactFlightClient.js:412
                </div>
                <div className="text-slate-400 text-[11px]">
                  ✓ Verified: [PR #1429] mapped to ReactDOMComponent.js:889
                </div>
              </div>

              {/* Circular Floating Blue Badge matching reference exactly */}
              <div className="absolute bottom-6 left-6 z-20">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex flex-col items-center justify-center p-3 text-center shadow-glow-blue border-4 border-white"
                >
                  <span className="text-2xl font-black tracking-tight leading-none">
                    100%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-1 text-blue-100">
                    Source Verified
                  </span>
                </motion.div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Content matching reference hierarchy */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Eyebrow */}
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-2 block">
              OUR COMMITMENT
            </span>

            {/* Heading matching reference font weight & structure */}
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight leading-tight mb-5 font-sans">
              GitWise exceptional release intelligence services
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Standard LLMs confabulate and fabricate pull requests when summarizing repositories. GitWise was built with an uncompromising principle: every release bullet must point to verifiable source diff hunks.
            </p>

            {/* Two Mini Feature Cards side-by-side matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
              
              {/* Mini Card 1 */}
              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 flex items-center gap-3.5 hover:border-primary-300 hover:bg-blue-50/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">
                    Innovative work
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Deep semantic AST parsing
                  </p>
                </div>
              </div>

              {/* Mini Card 2 */}
              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 flex items-center gap-3.5 hover:border-primary-300 hover:bg-blue-50/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">
                    Single proof
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Deterministic diff verification
                  </p>
                </div>
              </div>

            </div>

            {/* Second supporting paragraph */}
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
              From automated dependency audits to security patch coverage, GitWise ensures engineering leads and release managers publish documentation that their customers and developers can trust.
            </p>

            {/* Vibrant Blue CTA Button */}
            <button
              type="button"
              onClick={onExploreVerification}
              className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-7 py-3 rounded-lg shadow-md shadow-primary-600/25 transition-all duration-200 transform hover:-translate-y-0.5 btn-shimmer flex items-center gap-2"
            >
              <span>Explore Verification Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
