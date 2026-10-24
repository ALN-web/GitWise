import React from 'react';
import { 
  GitPullRequest, 
  ShieldCheck, 
  FlaskConical, 
  ArrowRight,
  GitCommit,
  CheckCircle2,
  Terminal,
  FileCode2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardsSectionProps {
  onSelectCapability: (id: string) => void;
}

export const ServiceCardsSection: React.FC<ServiceCardsSectionProps> = ({ onSelectCapability }) => {
  const cards = [
    {
      id: 'github-research',
      title: 'GitHub Ingestion Pipeline',
      description: 'Automatically collects merged pull requests, commit messages, file modifications, and author references across the release window.',
      linkText: 'Read more',
      icon: GitPullRequest,
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=700&q=80',
      tag: 'Ingest & Parse',
    },
    {
      id: 'independent-verification',
      title: 'Dual-Pass Adversary Review',
      description: 'An isolated verification stage tests each release bullet point against raw git diff tokens, eliminating ungrounded claims and hallucinations.',
      linkText: 'Read more',
      icon: ShieldCheck,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80',
      tag: 'AST Diff Grounding',
    },
    {
      id: 'evaluation-lab',
      title: 'Adversarial Evaluation Lab',
      description: 'Continuous regression benchmarks that inject missing pull requests, fake IDs, and misleading claims to measure factual accuracy.',
      linkText: 'Read more',
      icon: FlaskConical,
      imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=700&q=80',
      tag: 'Benchmarking',
    },
  ];

  return (
    <section id="capabilities" className="py-24 bg-surface-light border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-2.5 block">
            OUR CORE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight leading-tight font-sans">
            We're providing verified Release Intelligence <br className="hidden sm:inline" />
            & Change Auditing
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Eliminate guesswork in software release engineering with deterministic evidence linking.
          </p>
        </div>

        {/* 3 Large Cards Grid with Floating Circular Blue Icon Badges matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onClick={() => onSelectCapability(card.id)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Image Container with Wave/Curve at bottom */}
                  <div className="relative h-56 w-full overflow-hidden bg-navy-950">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Top Tag */}
                    <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-navy-950/80 text-white px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                      {card.tag}
                    </span>

                    {/* Floating Circular Blue Icon Badge overlapping the seam matching reference */}
                    <div className="absolute -bottom-6 right-6 z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 border-4 border-white group-hover:scale-110 group-hover:bg-primary-700 transition-all duration-300">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 pt-8">
                    <h3 className="text-xl font-bold text-navy-950 mb-3 group-hover:text-primary-600 transition-colors font-sans">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Link matching reference */}
                <div className="px-7 pb-6 pt-2">
                  <div className="inline-flex items-center text-xs font-bold text-primary-600 group-hover:text-primary-700 transition-colors gap-1.5 border-t border-slate-100 pt-4 w-full">
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
