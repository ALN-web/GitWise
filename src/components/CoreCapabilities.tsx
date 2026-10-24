import React from 'react';
import { 
  GitPullRequest, 
  FileEdit, 
  ShieldCheck, 
  SearchCheck, 
  FlaskConical, 
  ArrowRight 
} from 'lucide-react';

interface CoreCapabilitiesProps {
  onSelectCapability: (id: string) => void;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ onSelectCapability }) => {
  const capabilities = [
    {
      id: 'github-research',
      title: 'GitHub Research',
      description: 'Collect merged pull requests and source details for a defined release window.',
      linkText: 'Explore research stage',
      icon: GitPullRequest,
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 01',
    },
    {
      id: 'ai-drafting',
      title: 'AI Drafting',
      description: 'Organize changes into clear, structured release notes.',
      linkText: 'See drafting format',
      icon: FileEdit,
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 02',
    },
    {
      id: 'independent-verification',
      title: 'Independent Verification',
      description: 'Check claims against source evidence and flag unsupported statements.',
      linkText: 'View verification engine',
      icon: ShieldCheck,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 03',
    },
    {
      id: 'coverage-analysis',
      title: 'Coverage Analysis',
      description: 'Identify relevant pull requests that may be missing from the draft.',
      linkText: 'Audit missing changes',
      icon: SearchCheck,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 04',
    },
    {
      id: 'evaluation-lab',
      title: 'Evaluation Lab',
      description: 'Test the system using controlled cases with missing items, fabricated references, and misleading claims.',
      linkText: 'Run evaluation lab',
      icon: FlaskConical,
      imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80',
      badge: 'Step 05',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching Reference */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase mb-2 block">
            CORE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight">
            From merged PRs to verified release notes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-surface-muted leading-relaxed">
            Generate useful release notes while checking coverage, traceability, and factual accuracy.
          </p>
        </div>

        {/* 5 Equal-Height Horizontal Cards Grid matching the Reference 5-Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => onSelectCapability(cap.id)}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Image Container */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cap.imageUrl}
                      alt={cap.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors" />
                    
                    {/* Badge */}
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold bg-navy-900/80 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                      {cap.badge}
                    </span>

                    {/* Overlapping Orange Icon Badge — exactly as in reference */}
                    <div className="absolute -bottom-4 left-4 w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center shadow-md group-hover:bg-brand-orange-hover transition-colors z-10">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pt-6 px-4 pb-4">
                    <h3 className="text-base font-bold text-navy-900 mb-2 group-hover:text-brand-orange transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {cap.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Link with Arrow */}
                <div className="px-4 pb-5 pt-1">
                  <div className="inline-flex items-center text-xs font-semibold text-brand-orange group-hover:text-brand-orange-hover transition-colors gap-1">
                    <span>{cap.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
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
