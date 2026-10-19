import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeView: string | null;
  onBack: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleGoHome = () => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-4 flex items-center justify-between ${
      isMobileMenuOpen ? 'z-[100]' : 'z-30'
    } relative select-none`}>
      {/* Left: Welcome / view label */}
      <div className="flex flex-col max-w-[60%] sm:max-w-none">
        <span className="font-heading text-xs sm:text-sm font-black tracking-[0.22em] text-neutral-800 dark:text-neutral-400 uppercase transition-colors truncate">
          WELCOME TO MY
        </span>
        <span className="text-xs xs:text-sm sm:text-base md:text-lg font-mono font-black text-neutral-950 dark:text-white tracking-wide mt-0.5 transition-colors truncate">
          {activeView ? (
            `// EXPLORING: ${activeView.toUpperCase()}`
          ) : (
            <>
              // <span className="hidden sm:inline">INTERACTIVE </span>PORTFOLIO
            </>
          )}
        </span>
      </div>

      {/* Centre Nav Links (Desktop only — 100% UNTOUCHED) */}
      <nav className="hidden lg:flex items-center gap-6 text-[11px] font-mono font-medium tracking-[0.18em] text-neutral-500 dark:text-neutral-400 transition-colors">
        <button
          onClick={handleGoHome}
          className={`hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer uppercase ${
            isHomePage ? 'text-neutral-950 dark:text-white font-bold' : ''
          }`}
        >
          HOME
        </button>
        <button
          onClick={() => navigate('/about')}
          className={`hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer uppercase ${
            location.pathname === '/about' ? 'text-neutral-950 dark:text-white font-bold' : ''
          }`}
        >
          ABOUT
        </button>
        <button
          onClick={() => navigate('/projects')}
          className={`hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer uppercase ${
            location.pathname === '/projects' ? 'text-neutral-950 dark:text-white font-bold' : ''
          }`}
        >
          PROJECT
        </button>
        <button
          onClick={() => navigate('/achievements')}
          className={`hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer uppercase ${
            location.pathname === '/achievements' ? 'text-neutral-950 dark:text-white font-bold' : ''
          }`}
        >
          SPORTS
        </button>
        <button
          onClick={() => navigate('/skills-education')}
          className={`hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer uppercase ${
            location.pathname === '/skills-education' ? 'text-neutral-950 dark:text-white font-bold' : ''
          }`}
        >
          SKILLS / EDUCATION
        </button>
        <button
          onClick={() => navigate('/contact')}
          className={`hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer uppercase ${
            location.pathname === '/contact' ? 'text-neutral-950 dark:text-white font-bold' : ''
          }`}
        >
          CONTACT
        </button>
      </nav>

      {/* Right controls: Theme toggle + Mobile Menu Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Circular Light / Dark Mode Toggle Button (Preserved 100%) */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border shadow-sm transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea3826] bg-white border-neutral-300 text-neutral-800 hover:border-neutral-400 hover:shadow-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500"
        >
          {theme === 'light' ? (
            <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-400 dark:text-indigo-300 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        {/* Mobile Hamburger Toggle Button (Mobile/Tablet only, hidden on lg) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full border shadow-sm transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea3826] bg-white border-neutral-300 text-neutral-800 hover:border-neutral-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Drawer (Mobile/Tablet only) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Dimmer — tap outside to close, background card animations continue running */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/65 z-[99] pointer-events-auto"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden fixed inset-x-4 top-20 z-[100] rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] p-5 flex flex-col gap-2 max-w-md mx-auto"
            >
              {/* Header label in Mobile Menu */}
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-neutral-200 dark:border-neutral-800 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                <span className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-[#ea3826]" />
                  NAVIGATION
                </span>
                <span>PORTFOLIO // SECTIONS</span>
              </div>

              {/* Navigation links */}
              {[
                { label: 'HOME', path: '/', action: handleGoHome },
                { label: 'ABOUT', path: '/about', action: () => navigate('/about') },
                { label: 'PROJECT', path: '/projects', action: () => navigate('/projects') },
                { label: 'SPORTS', path: '/achievements', action: () => navigate('/achievements') },
                { label: 'SKILLS / EDUCATION', path: '/skills-education', action: () => navigate('/skills-education') },
                { label: 'CONTACT', path: '/contact', action: () => navigate('/contact') },
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-mono font-bold tracking-[0.16em] uppercase transition-all min-h-[46px] cursor-pointer ${
                      isActive
                        ? 'bg-[#ea3826] text-white shadow-md'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="text-[10px] opacity-80">// ACTIVE</span>}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
