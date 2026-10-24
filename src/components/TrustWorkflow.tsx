import React from 'react';
import { 
  Link2, 
  SearchCheck, 
  ShieldAlert, 
  History, 
  ArrowRight
} from 'lucide-react';

interface TrustWorkflowProps {
  onExploreWorkflow: () => void;
}

export const TrustWorkflow: React.FC<TrustWorkflowProps> = ({ onExploreWorkflow }) => {
  const features = [
    {
      icon: Link2,
      title: 'Evidence Traceability',
      description: 'Connect release-note claims to their supporting pull requests.',
      tag: 'Audit Link',
    },
    {
      icon: SearchCheck,
      title: 'Coverage Checks',
      description: 'Highlight relevant merged PRs that the draft may have missed.',
      tag: 'Completeness',
    },
    {
      icon: ShieldAlert,
      title: 'Independent Review',
      description: 'Use a separate verification stage to identify factual and reference errors.',
      tag: 'Adversarial Pass',
    },
    {
      icon: History,
      title: 'Transparent Results',
      description: 'Inspect verification findings, retry feedback, and run history.',
      tag: 'Zero Black Box',
    },
  ];

  return (
    <section id="verification" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Section Container */}
        <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Dark Image Panel (5 cols) */}
          <div className="lg:col-span-5 bg-navy-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Engineering Environment Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=800&q=80"
                alt="Git graph and terminal workflow"
                className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/90 to-navy-900/95" />
            </div>

            {/* Glowing Accent */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

            {/* Content Top */}
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase block mb-3">
                WHY RELEASEGUARD?
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-5">
                AI-generated. <br className="hidden sm:inline" />
                <span className="text-brand-orange">Independently verified.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Generation alone is not enough. ReleaseGuard checks the draft against source evidence and exposes the findings before release notes are published.
              </p>

              <div>
                <button
                  type="button"
                  onClick={onExploreWorkflow}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span>Explore the Workflow</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Graphic Snippet */}
            <div className="relative z-10 mt-10 pt-6 border-t border-slate-800/80">
              <div className="bg-navy-950/80 rounded-lg p-3.5 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-400">Verifier Status:</span>
                  <span className="text-white font-medium">Strict Traceability Mode</span>
                </div>
                <span className="text-brand-orange font-bold text-[11px]">v2.4</span>
              </div>
            </div>

          </div>

          {/* Right Clean Feature Grid (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-white flex items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.title}
                    className="p-6 rounded-xl border border-slate-100 bg-surface-light/60 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Orange Outline Icon Badge matching reference */}
                    <div className="w-12 h-12 rounded-xl border-2 border-brand-orange/40 bg-brand-orange-light flex items-center justify-center text-brand-orange mb-5 group-hover:border-brand-orange group-hover:scale-105 transition-all shadow-sm">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-navy-900">
                        {feature.title}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {feature.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
