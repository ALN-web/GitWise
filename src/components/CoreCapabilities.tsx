import React from 'react';
import { 
  GitPullRequest, 
  FileEdit, 
  ShieldCheck, 
  SearchCheck, 
  FlaskConical, 
  ArrowRight,
  GitCommit,
  CheckCircle2,
  AlertTriangle,
  Code2
} from 'lucide-react';

interface CoreCapabilitiesProps {
  onSelectCapability: (id: string) => void;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ onSelectCapability }) => {
  const capabilities = [
    {
      id: 'github-research',
      title: 'GitHub Research',
      description: 'Ingests merged PRs, commit messages, and diff hunks within your selected release window.',
      linkText: 'Inspect research stage',
      icon: GitPullRequest,
      stage: 'STAGE 01',
      miniDiagram: (
        <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1.5 text-navy-900 font-semibold">
            <GitCommit className="w-3.5 h-3.5 text-brand-orange" />
            <span>PR #1400..#1435</span>
          </div>
          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">28 PRs</span>
        </div>
      )
    },
    {
      id: 'ai-drafting',
      title: 'AI Drafting',
      description: 'Synthesizes raw pull requests into clean, structured categories without speculative marketing fluff.',
      linkText: 'View drafting schema',
      icon: FileEdit,
      stage: 'STAGE 02',
      miniDiagram: (
        <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1 text-slate-700">
            <span className="text-brand-orange font-bold">#</span>
            <span>Features • Fixes • Breaks</span>
          </div>
          <span className="text-slate-400">Strict AST</span>
        </div>
      )
    },
    {
      id: 'independent-verification',
      title: 'Independent Verification',
      description: 'Cross-checks every generated assertion against source diff tokens to catch fabricated claims.',
      linkText: 'Explore verification engine',
      icon: ShieldCheck,
      stage: 'STAGE 03',
      miniDiagram: (
        <div className="flex items-center justify-between font-mono text-[11px] bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 text-emerald-900">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Diff Token Match</span>
          </div>
          <span className="text-emerald-700 font-bold">100% Grounded</span>
        </div>
      )
    },
    {
      id: 'coverage-analysis',
      title: 'Coverage Analysis',
      description: 'Audits release drafts to detect and restore important merged pull requests that were omitted.',
      linkText: 'Check coverage rules',
      icon: SearchCheck,
      stage: 'STAGE 04',
      miniDiagram: (
        <div className="flex items-center justify-between font-mono text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <span className="text-slate-600">Merged vs Drafted</span>
          <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">0 Gaps</span>
        </div>
      )
    },
    {
      id: 'evaluation-lab',
      title: 'Evaluation Lab',
      description: 'Tests system resilience using controlled test cases with fabricated refs and missing items.',
      linkText: 'Open evaluation lab',
      icon: FlaskConical,
      stage: 'STAGE 05',
      miniDiagram: (
        <div className="flex items-center justify-between font-mono text-[11px] bg-amber-50/70 p-2.5 rounded-lg border border-amber-100 text-amber-900">
          <div className="flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Adversarial Suite</span>
          </div>
          <span className="text-amber-800 font-bold">3 Test Suites</span>
        </div>
      )
    },
  ];

  return (
    <section id="capabilities" className="py-20 bg-white border-b border-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs font-bold tracking-wider text-brand-orange uppercase mb-2 block">
            CORE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            From merged PRs to verified release notes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-surface-muted leading-relaxed">
            Five dedicated intelligence stages ensuring release note accuracy, traceability, and completeness.
          </p>
        </div>

        {/* Responsive Grid: 3 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => onSelectCapability(cap.id)}
                className="group bg-white rounded-xl border border-surface-border p-6 shadow-subtle hover:shadow-card hover:border-slate-300 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Header: Icon + Stage */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 text-navy-900 flex items-center justify-center group-hover:bg-brand-orange-light group-hover:text-brand-orange transition-colors">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {cap.stage}
                    </span>
                  </div>

                  {/* Title & Description (concise 2 lines) */}
                  <h3 className="text-base font-bold text-navy-900 mb-2 group-hover:text-brand-orange transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-surface-muted leading-relaxed mb-5">
                    {cap.description}
                  </p>
                </div>

                <div>
                  {/* CSS Illustration / Mini Diagram */}
                  <div className="mb-4">
                    {cap.miniDiagram}
                  </div>

                  {/* Navigation Link with Arrow */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-orange group-hover:text-brand-orange-hover transition-colors">
                    <span>{cap.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
