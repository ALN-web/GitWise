import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Menu, 
  X, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Github, 
  Terminal, 
  ExternalLink,
  Sparkles,
  GitPullRequest,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onScrollToForm: () => void;
  onExploreVerification: () => void;
  onOpenEvaluationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToForm,
  onExploreVerification,
  onOpenEvaluationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Overview', href: '#overview' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Verification', href: '#verification', onClick: onExploreVerification },
    { name: 'Evaluation', href: '#evaluation', onClick: onOpenEvaluationModal },
    { name: 'Workspace', href: '#generate-form', onClick: onScrollToForm },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all">
      {/* 1. Vibrant Royal Blue Top Bar matching Reference Image */}
      <div className="bg-primary-600 text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left info items with white icons */}
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 text-blue-100 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <GitPullRequest className="w-3.5 h-3.5 text-blue-200" />
              <span>GitHub-Integrated Release Tracking</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 text-blue-200" />
              <span>Continuous 24/7 Diff Auditing</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Terminal className="w-3.5 h-3.5 text-blue-200" />
              <span>support@gitwise.dev</span>
            </div>
          </div>

          {/* Right badges & links */}
          <div className="flex items-center gap-3 text-white text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-700/80 border border-blue-400/30 text-[10px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ENGINE V2.0 LIVE</span>
            </span>

            <a
              href="https://github.com/ALN-web/GitWise"
              target="_blank"
              rel="noreferrer"
              className="text-blue-100 hover:text-white transition-colors p-1"
              aria-label="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main White Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-surface-border">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo matching "Rooflen" reference style */}
          <a href="#overview" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
              <GitBranch className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-navy-950 font-sans">
                Git<span className="text-primary-600">Wise</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Release Intelligence
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-7">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setActiveNav(item.name);
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`relative py-2 text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'text-primary-600' 
                      : 'text-slate-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenEvaluationModal}
              className="p-2 text-slate-500 hover:text-primary-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Search verification records"
              aria-label="Search records"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Vibrant Blue CTA Button matching reference "Get A Quote" */}
            <button
              type="button"
              onClick={onScrollToForm}
              className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md shadow-primary-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 btn-shimmer"
            >
              Generate Release Notes
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-primary-600 rounded-lg"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-surface-border bg-white py-4 px-2 space-y-2 overflow-hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setActiveNav(item.name);
                    setMobileMenuOpen(false);
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                    activeNav === item.name
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToForm();
                  }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg shadow-md text-sm text-center btn-shimmer"
                >
                  Generate Release Notes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
