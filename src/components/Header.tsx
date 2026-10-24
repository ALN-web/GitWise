import React, { useState } from 'react';
import { 
  GitPullRequest, 
  ShieldCheck, 
  FileCheck2, 
  Terminal, 
  Search, 
  Menu, 
  X, 
  GitBranch
} from 'lucide-react';

interface HeaderProps {
  onOpenGenerateModal: () => void;
  onOpenEvaluationModal: () => void;
  onOpenVerificationDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGenerateModal,
  onOpenEvaluationModal,
  onOpenVerificationDrawer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');

  const navItems = [
    { name: 'Overview', href: '#overview' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Verification', href: '#verification', onClick: onOpenVerificationDrawer },
    { name: 'Evaluation', href: '#evaluation', onClick: onOpenEvaluationModal },
    { name: 'Documentation', href: '#documentation' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* 1. Thin Dark Top Announcement Bar */}
      <div className="bg-navy-900 text-slate-300 text-xs py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left items */}
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="w-4 h-4 rounded-full bg-navy-800 flex items-center justify-center text-brand-orange">
                <GitPullRequest className="w-2.5 h-2.5" />
              </span>
              <span>GitHub-integrated release tracking</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="w-4 h-4 rounded-full bg-navy-800 flex items-center justify-center text-brand-orange">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              <span>Independent AI verification</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="w-4 h-4 rounded-full bg-navy-800 flex items-center justify-center text-brand-orange">
                <FileCheck2 className="w-2.5 h-2.5" />
              </span>
              <span>Traceable source evidence</span>
            </div>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-brand-orange" />
            <span className="font-medium text-slate-300">Built for reliable software releases</span>
          </div>
        </div>
      </div>

      {/* 2. Main White Navigation Bar */}
      <nav className="border-b border-surface-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#overview" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center shadow-md border border-navy-800 group-hover:border-brand-orange transition-colors">
                <GitBranch className="w-5 h-5 text-brand-orange" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-orange rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-navy-900">
                    Git<span className="text-brand-orange">Wise</span>
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-navy-900 text-white px-1.5 py-0.5 rounded">
                    ReleaseGuard
                  </span>
                </div>
                <span className="text-[11px] text-surface-muted font-medium tracking-tight">
                  Verified Weekly Release Notes
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
                    onClick={(e) => {
                      setActiveNav(item.name);
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-navy-900 font-semibold' 
                        : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-orange rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Actions: Search + CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                type="button"
                onClick={onOpenEvaluationModal}
                className="p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Search verification records & evaluation lab"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenGenerateModal}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-5 py-2.5 rounded-md shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Generate Release Notes
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-border bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col space-y-2">
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
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    activeNav === item.name
                      ? 'bg-brand-orange-light text-brand-orange font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGenerateModal();
                }}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3 px-4 rounded-md text-center shadow-sm"
              >
                Generate Release Notes
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVerificationDrawer();
                }}
                className="w-full border border-slate-300 text-slate-700 font-medium py-2.5 px-4 rounded-md text-center hover:bg-slate-50"
              >
                View Verification Status
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
