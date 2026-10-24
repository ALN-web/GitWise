import React, { useState } from 'react';
import { 
  FileCheck2, 
  FlaskConical, 
  SearchCode
} from 'lucide-react';

export const TrustCards: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const cards = [
    {
      title: 'Grounded in Evidence',
      tagline: 'SPECIFICATION 01',
      description: 'Important release-note claims should be traceable to real source records.',
      icon: FileCheck2,
      subsystem: 'AST Diff Extractor',
      subsystemDetail: 'Links every bullet point to merged PR commits and git diff hunk hashes.',
      badgeText: 'Traceable Records',
    },
    {
      title: 'Tested Against Errors',
      tagline: 'SPECIFICATION 02',
      description: 'Evaluate whether the system detects missing PRs, fabricated references, and unsupported claims.',
      icon: FlaskConical,
      subsystem: 'Adversarial Benchmarks',
      subsystemDetail: 'Continuous regression testing against hallucinated PR IDs and dropped features.',
      badgeText: 'Adversarial Defense',
    },
    {
      title: 'Designed for Inspection',
      tagline: 'SPECIFICATION 03',
      description: 'Understand what passed, what failed, and why a draft needs another review.',
      icon: SearchCode,
      subsystem: 'Deterministic Audit Log',
      subsystemDetail: 'Exposes model reasoning, verification pass/fail flags, and retry loops.',
      badgeText: 'Transparent Audit',
    },
  ];

  return (
    <section className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase mb-2 block">
            VERIFICATION GUARANTEES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight">
            Release notes you can trust
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-muted">
            Engineered with strict verification principles instead of unchecked AI generation.
          </p>
        </div>

        {/* 3 Horizontal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-xl p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Top Restrained Orange Accent Indicators */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Small orange dots indicator */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="w-2 h-2 rounded-full bg-brand-orange/60" />
                      <span className="w-2 h-2 rounded-full bg-brand-orange/30" />
                      <span className="ml-2 text-[11px] font-mono font-semibold tracking-wider text-brand-orange">
                        {card.tagline}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {card.badgeText}
                    </span>
                  </div>

                  {/* Main Title & Statement */}
                  <h3 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-brand-orange transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                    "{card.description}"
                  </p>
                </div>

                {/* Subsystem Architecture Footnote matching reference's bottom persona block */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy-900 text-brand-orange flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-navy-900">
                        {card.subsystem}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Verified Architecture
                      </div>
                    </div>
                  </div>

                  {/* Restrained quotation mark styling */}
                  <div className="text-slate-200 font-serif text-3xl select-none group-hover:text-brand-orange/30 transition-colors">
                    ”
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots matching reference */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button 
            type="button" 
            onClick={() => setActiveSlide(0)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${activeSlide === 0 ? 'bg-brand-orange w-6' : 'bg-slate-300'}`}
            aria-label="View trust guarantee 1"
          />
          <button 
            type="button" 
            onClick={() => setActiveSlide(1)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${activeSlide === 1 ? 'bg-brand-orange w-6' : 'bg-slate-300'}`}
            aria-label="View trust guarantee 2"
          />
          <button 
            type="button" 
            onClick={() => setActiveSlide(2)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${activeSlide === 2 ? 'bg-brand-orange w-6' : 'bg-slate-300'}`}
            aria-label="View trust guarantee 3"
          />
        </div>

      </div>
    </section>
  );
};
