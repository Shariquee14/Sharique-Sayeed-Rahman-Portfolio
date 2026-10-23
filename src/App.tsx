import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroHeading } from './components/HeroHeading';
import { CardDeck } from './components/CardDeck';
import { DialBackground } from './components/DialBackground';
import { HeroBackground } from './components/HeroBackground';
import { SubpageBackground } from './components/SubpageBackground';
import { ActiveCardInfo } from './components/ActiveCardInfo';
import { MeView } from './components/views/MeView';
import { ContactView } from './components/views/ContactView';
import { ProjectsView } from './components/views/ProjectsView';
import { SportsView } from './components/views/SportsView';
import { SkillsView } from './components/views/SkillsView';
import { YouTubeView } from './components/views/YouTubeView';
import { HERO_CARDS } from './data/portfolioData';

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [dialText, setDialText] = useState<string>('ME');
  const [dialAngle, setDialAngle] = useState<number>(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(2); // Center card (ME)

  // Map current route to activeView label for Header
  const getActiveView = () => {
    switch (location.pathname) {
      case '/about':
        return 'IDENTITY // ME';
      case '/contact':
        return 'CONTACT US';
      case '/projects':
        return 'PROJECTS & GITHUB';
      case '/achievements':
        return 'SPORTS & ACHIEVEMENTS';
      case '/skills-education':
        return 'SKILLS & EDUCATION';
      case '/youtube':
        return 'YOUTUBE // SHARIQLOGZ';
      default:
        return null;
    }
  };

  const activeView = getActiveView();
  const isHomePage = location.pathname === '/';

  const handlePrevCard = useCallback(() => {
    setFocusedIndex((prev) => {
      const nextIdx = Math.max(0, prev - 1);
      setDialText(HERO_CARDS[nextIdx].title.toUpperCase());
      setDialAngle((nextIdx - 2) * 22);
      setActiveCardId(HERO_CARDS[nextIdx].id);
      return nextIdx;
    });
  }, []);

  const handleNextCard = useCallback(() => {
    setFocusedIndex((prev) => {
      const nextIdx = Math.min(HERO_CARDS.length - 1, prev + 1);
      setDialText(HERO_CARDS[nextIdx].title.toUpperCase());
      setDialAngle((nextIdx - 2) * 22);
      setActiveCardId(HERO_CARDS[nextIdx].id);
      return nextIdx;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape' && !isHomePage) {
        navigate('/');
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextCard();
      }
      if (e.key === '1') { setActiveCardId('projects'); navigate('/projects'); }
      if (e.key === '2') { setActiveCardId('contact'); navigate('/contact'); }
      if (e.key === '3') { setActiveCardId('me'); navigate('/about'); }
      if (e.key === '4') { setActiveCardId('sports'); navigate('/achievements'); }
      if (e.key === '5') { setActiveCardId('skills'); navigate('/skills-education'); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHomePage, navigate, handlePrevCard, handleNextCard]);

  return (
    <div className="relative min-h-screen w-full bg-[#ececee] dark:bg-[#18181b] text-[#121212] dark:text-[#f5f5f5] overflow-x-hidden flex flex-col justify-between selection:bg-[#ea3826] selection:text-white transition-colors duration-300">
      {/* Subtle AI & Technology-Themed Background Graphics (Consistent across all subpages) */}
      {!isHomePage && <SubpageBackground />}

      {/* Top Header Bar */}
      <Header
        activeView={activeView}
        onBack={() => navigate('/')}
        onOpenContact={() => navigate('/contact')}
      />

      {/* Main Routes */}
      <main className="flex-1 w-full flex flex-col justify-center relative">
        <Routes>
          {/* 1. HERO HOME LANDING VIEW (NO FOOTER) */}
          <Route
            path="/"
            element={
              <div className="w-full flex flex-col items-center justify-between flex-1 relative py-2">
                {/* Hero Heading with Red Vertical Accent & Layered Typography */}
                <HeroHeading onPrev={handlePrevCard} onNext={handleNextCard} />

                {/* 3D Radial Dial & Elliptical Moving Cards */}
                <div className="relative w-full flex-1 flex flex-col items-center justify-end mt-4 sm:mt-6 overflow-visible">
                  {/* Futuristic circular background details — behind everything */}
                  <HeroBackground />

                  {/* Concentric Dial Background with Active Rotating Needle */}
                  <DialBackground
                    activeCardIndex={focusedIndex}
                    activeCardName={dialText}
                    activeAngle={dialAngle}
                  />

                  {/* Five Curved Floating Animated Cards */}
                  <CardDeck
                    onHoverCard={(title, angle, cardId) => {
                      setDialText(title.toUpperCase());
                      setDialAngle(angle);
                      setActiveCardId(cardId || null);
                    }}
                    activeAngle={dialAngle}
                  />
                </div>

                {/* Dedicated Centered Card-Info Display BELOW the Floating Cards */}
                <ActiveCardInfo activeCardId={activeCardId} />
              </div>
            }
          />

          {/* 2. DEDICATED /about VIEW */}
          <Route
            path="/about"
            element={
              <MeView
                onBack={() => navigate('/')}
                onOpenContact={() => navigate('/contact')}
              />
            }
          />

          {/* 3. DEDICATED /contact VIEW */}
          <Route
            path="/contact"
            element={<ContactView onBack={() => navigate('/')} />}
          />

          {/* 4. DEDICATED /projects VIEW */}
          <Route
            path="/projects"
            element={
              <ProjectsView
                onBack={() => navigate('/')}
                onOpenContact={() => navigate('/contact')}
              />
            }
          />

          {/* 5. DEDICATED /achievements VIEW */}
          <Route
            path="/achievements"
            element={<SportsView onBack={() => navigate('/')} />}
          />

          {/* 6. DEDICATED /skills-education VIEW */}
          <Route
            path="/skills-education"
            element={<SkillsView onBack={() => navigate('/')} />}
          />

          {/* 7. DEDICATED /youtube VIEW */}
          <Route
            path="/youtube"
            element={
              <YouTubeView
                onBack={() => navigate('/')}
                onOpenContact={() => navigate('/contact')}
              />
            }
          />

          {/* Fallback redirect */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white">Page Not Found</h2>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-xs font-mono"
                >
                  Return to Portfolio
                </button>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Editorial Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-neutral-500 dark:text-neutral-400 border-t border-neutral-300/60 dark:border-neutral-800 z-20 transition-colors">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ea3826]" />
          <span className="text-neutral-900 dark:text-white font-semibold tracking-wide">SHARIQUE SAYEED RAHMAN</span>
        </div>

        <div className="text-neutral-400 dark:text-neutral-500 hidden sm:block">
          © {new Date().getFullYear()} • ALL RIGHTS RESERVED
        </div>

        {/* Footer action buttons — RESUME.PDF + GET IN TOUCH */}
        <div className="flex items-center gap-2">
          <a
            href="./assets/sharique_sayeed_rahman_resume.pdf"
            download="Sharique_Sayeed_Rahman_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-3.5 sm:py-1.5 min-h-[40px] sm:min-h-0 rounded-full text-[10px] sm:text-[11px] font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/80 hover:bg-neutral-900 dark:hover:bg-neutral-800 hover:text-white transition-all duration-200"
          >
            <svg className="w-3 h-3 text-[#ea3826]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M8 2v8M5 7l3 3 3-3M3 12h10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-neutral-700 dark:text-neutral-300 hover:text-white">RESUME.PDF</span>
          </a>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-3.5 sm:py-1.5 min-h-[40px] sm:min-h-0 rounded-full text-[10px] sm:text-[11px] font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/80 hover:bg-neutral-900 dark:hover:bg-neutral-800 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <svg className="w-3 h-3 text-[#ea3826]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="3" width="14" height="10" rx="2"/>
              <path d="M1 5l7 5 7-5" strokeLinecap="round"/>
            </svg>
            <span className="text-neutral-700 dark:text-neutral-300 hover:text-white">GET IN TOUCH</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
