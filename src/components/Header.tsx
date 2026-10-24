import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenEvaluationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToForm,
  onOpenEvaluationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');

  // Close mobile menu on ESC
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
    { name: 'How It Works', href: '#capabilities' },
    { name: 'Verification', href: '#verification' },
    { name: 'Evaluation', href: '#evaluation' },
    { name: 'Documentation', href: '#docs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-border transition-all">
      {/* 1. Compact, Low-Key Announcement Bar */}
      <div className="bg-navy-900 text-slate-300 text-xs py-1.5 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-medium text-slate-200">GitWise v2.0</span>
            <span className="text-slate-400 hidden sm:inline">— AI-powered release intelligence with deterministic source grounding</span>
          </div>

          <a 
            href="#verification" 
            className="text-slate-300 hover:text-brand-orange inline-flex items-center gap-1 transition-colors font-medium text-[11px]"
          >
            <span>See how verification works</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Streamlined Navigation Bar (h-16) */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Wordmark */}
          <a href="#overview" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 rounded-lg py-1 px-1.5">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-brand-orange border border-navy-800 shadow-sm group-hover:border-brand-orange transition-colors">
              <GitBranch className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-navy-900">
                Git<span className="text-brand-orange">Wise</span>
              </span>
              <span className="text-[11px] font-medium text-surface-muted hidden sm:inline">
                Release Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveNav(item.name)}
                  className={`text-sm font-medium transition-colors px-2.5 py-1.5 rounded-md ${
                    isActive 
                      ? 'text-navy-900 font-semibold bg-slate-50' 
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50/80'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onScrollToForm}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
            >
              Generate Release Notes
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Accessible Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-border bg-white py-3 px-2 space-y-1.5 animate-in fade-in duration-150">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.name);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  activeNav === item.name
                    ? 'bg-brand-orange-light text-brand-orange font-semibold'
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
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold py-2.5 px-4 rounded-lg text-center shadow-sm"
              >
                Generate Release Notes
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
