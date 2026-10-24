import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Menu, 
  X, 
  ShieldCheck, 
  Github, 
  GitPullRequest
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
  onOpenEvaluationModal: _onOpenEvaluationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Overview', href: '#overview' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Verification', href: '#verification' },
    { name: 'Evaluation', href: '#evaluation' },
    { name: 'Workspace', href: '#workspace' },
  ];

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['overview', 'capabilities', 'verification', 'evaluation', 'workspace'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id) || (id === 'workspace' ? document.getElementById('generate-form') : null))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const matched = navItems.find((item) => {
              if (item.href === `#${targetId}`) return true;
              if (targetId === 'generate-form' && item.href === '#workspace') return true;
              return false;
            });
            if (matched) {
              setActiveNav(matched.name);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -55% 0px',
        threshold: 0.1,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Keyboard accessibility: Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { name: string; href: string }
  ) => {
    e.preventDefault();
    setActiveNav(item.name);
    setMobileMenuOpen(false);

    let targetEl: HTMLElement | null = null;
    if (item.href === '#workspace') {
      targetEl = document.getElementById('workspace') || document.getElementById('generate-form');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        const input = document.getElementById('repoUrl');
        if (input) {
          setTimeout(() => input.focus(), 400);
        }
      }
    } else if (item.href === '#verification') {
      onExploreVerification();
    } else {
      const id = item.href.replace('#', '');
      targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (window.history.pushState) {
      window.history.pushState(null, '', item.href);
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-200">
      {/* 1. Subtle, Compact Deep Navy Announcement Bar (#0B1220, 34px height) */}
      <div className="bg-[#0B1220] border-b border-slate-800/80 text-slate-300 text-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 sm:h-9 flex items-center justify-between">
          
          {/* Left: Grounded product claims with restrained icons */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-300 font-normal">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <GitPullRequest className="w-3.5 h-3.5 text-blue-400 stroke-[2]" aria-hidden="true" />
              <span>GitHub-integrated release tracking</span>
            </span>

            <span className="hidden sm:inline text-slate-600" aria-hidden="true">·</span>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 stroke-[2]" aria-hidden="true" />
              <span>Evidence-backed verification</span>
            </span>
          </div>

          {/* Right: Repository Link */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ALN-web/GitWise"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 hover:text-slate-100 transition-colors py-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
              aria-label="GitWise GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden md:inline font-mono text-[11px] text-slate-400">v1.0</span>
              <span className="hidden xs:inline text-slate-300 hover:text-white">GitHub</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean White, 72px height, balanced layout) */}
      <nav 
        className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] sm:h-[72px] gap-4">
            
            {/* Left: Brand */}
            <div className="flex items-center">
              <a 
                href="#overview" 
                onClick={(e) => handleNavClick(e, { name: 'Overview', href: '#overview' })}
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5"
                aria-label="GitWise Home"
              >
                {/* Compact Logo Mark */}
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                  <GitBranch className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                </div>
                
                {/* Wordmark with restrained typography */}
                <div className="flex items-center">
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                    Git<span className="text-blue-600">Wise</span>
                  </span>
                  
                  {/* Subtle Subtitle - cleanly separated and compact */}
                  <span className="hidden lg:inline-block ml-2.5 pl-2.5 border-l border-slate-200 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Release Intelligence
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Navigation Links (Visually centered, restrained styling) */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
              {navItems.map((item) => {
                const isActive = activeNav === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavHighlight"
                        className="absolute inset-0 bg-blue-50/80 rounded-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: Single Primary Action (No fake search, clean button) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onScrollToForm}
                className="hidden sm:inline-flex items-center justify-center h-10 px-4 sm:px-5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm"
              >
                Generate Release Notes
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg overflow-hidden"
            >
              {navItems.map((item) => {
                const isActive = activeNav === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                );
              })}

              {/* Mobile Primary CTA */}
              <div className="pt-3 mt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToForm();
                  }}
                  className="w-full h-11 inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
