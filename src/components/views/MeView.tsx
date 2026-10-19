import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { 
  ArrowLeft, Download, FileText, Mail, Phone, MapPin, 
  ExternalLink, Sparkles, CheckCircle2, 
  BrainCircuit, Compass
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../SocialIcons';

interface MeViewProps {
  onBack: () => void;
  onOpenContact: () => void;
}

export const MeView: React.FC<MeViewProps> = ({ onBack, onOpenContact }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Breadcrumb & Back action */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-semibold tracking-wider hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">RETURN TO PORTFOLIO DECK</span>
          <span className="sm:hidden">BACK TO DECK</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-xs text-[#ea3826] font-bold">//</span>
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">IDENTITY PROFILE</span>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait Card & Direct Details (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Editorial Portrait Box */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 border border-neutral-300/80 dark:border-neutral-800 group">
            <div className="aspect-4/5 w-full relative overflow-hidden bg-neutral-900">
              <img
                src="/assets/about_portrait.jpg"
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{
                  filter: 'contrast(1.02) brightness(0.98)',
                }}
              />
              {/* Subtle transparent bottom-shadow gradient for white text legibility */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.85) 100%)'
                }}
              />
            </div>

            {/* Overlaid badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-neutral-200 border border-white/20">
                AI SPECIALIST '26
              </span>
              <span className="bg-[#ea3826] text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest">
                VERIFIED
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white z-10">
              <h2 className="font-display font-black text-2xl tracking-tight uppercase leading-tight drop-shadow-md">
                {PERSONAL_INFO.name}
              </h2>
              <p className="font-mono text-xs text-neutral-300 mt-1 drop-shadow-sm">
                AI & Technology Consultant | Solutions Architect
              </p>
            </div>
          </div>

          {/* Direct Communication Bar */}
          <div className="bg-white dark:bg-[#1f1f23] rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <Mail className="w-4 h-4 text-[#ea3826] shrink-0" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#ea3826] transition-colors truncate">
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <Phone className="w-4 h-4 text-[#ea3826] shrink-0" />
              <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-[#ea3826] transition-colors">
                {PERSONAL_INFO.phone}
              </a>
            </div>

            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <MapPin className="w-4 h-4 text-[#ea3826] shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-[#0077b5] dark:hover:bg-[#0077b5] hover:text-white transition-all text-[11px] font-semibold"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-900 dark:hover:bg-neutral-700 hover:text-white transition-all text-[11px] font-semibold"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Action CTAs: Download & Contact */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={PERSONAL_INFO.resumePdf}
              download="Sharique_Sayeed_Rahman_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-xs font-bold hover:bg-[#ea3826] dark:hover:bg-[#ea3826] dark:hover:text-white transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME PDF</span>
            </a>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-mono text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#ea3826]" />
              <span>MESSAGE ME</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Narrative, Philosophy, & Experience Highlights (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Executive Summary Card */}
          <div className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea3826] tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXECUTIVE NARRATIVE</span>
            </div>

            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-950 dark:text-white tracking-tight leading-snug">
              INSPIRING AI ENGINEER &amp; TECHNOLOGY CONSULTANT
            </h3>

            <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base font-sans">
              Passionate AI &amp; Data Science graduate dedicated to making artificial intelligence accessible and practical. Eager to leverage my skills in machine learning, GenAI, and data analytics to build intelligent solutions that solve real-world problems.
            </p>

            {/* Quick Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                <BrainCircuit className="w-4 h-4 text-[#ea3826] mb-1.5" />
                <h4 className="font-heading font-bold text-xs text-neutral-900 dark:text-white">GenAI & Automation</h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1">Prompt architecture, NLP screening, and automated enterprise reporting.</p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                <Compass className="w-4 h-4 text-[#ea3826] mb-1.5" />
                <h4 className="font-heading font-bold text-xs text-neutral-900 dark:text-white">Solution Architecture</h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1">Feasibility analysis, requirement discovery, and tech ROI modeling.</p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-[#ea3826] mb-1.5" />
                <h4 className="font-heading font-bold text-xs text-neutral-900 dark:text-white">Team Execution</h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1">Agile collaboration, executive storytelling, and cross-functional leadership.</p>
              </div>
            </div>
          </div>

          {/* Professional Goals & Direction */}
          <div className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h4 className="font-heading font-bold text-lg text-neutral-950 dark:text-white mb-3">
              Professional Goals &amp; Focus
            </h4>
            <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea3826] mt-2 shrink-0" />
                <p>
                  <strong className="text-neutral-950 dark:text-white font-semibold">Passion for AI &amp; Technology:</strong> Driven by a genuine interest in AI, data science, and emerging technologies, with a focus on exploring innovative ideas and turning them into practical solutions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea3826] mt-2 shrink-0" />
                <p>
                  <strong className="text-neutral-950 dark:text-white font-semibold">Building Practical Solutions:</strong> Applying my knowledge of Python, SQL, and data analysis to develop useful projects, solve problems, and make data-driven decisions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea3826] mt-2 shrink-0" />
                <p>
                  <strong className="text-neutral-950 dark:text-white font-semibold">Innovation &amp; Team Contribution:</strong> Bringing curiosity, adaptability, and a problem-solving mindset to collaborative projects while continuously expanding my technical expertise and contributing to meaningful results.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Resume Preview Notice */}
          <div className="bg-neutral-900 dark:bg-[#27272a] text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#ea3826]" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-sm">Full Verified Resume Available</h5>
                <p className="text-xs text-neutral-400 font-mono">PDF Document • Updated 2026</p>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-neutral-950 font-mono text-xs font-bold hover:bg-[#ea3826] hover:text-white transition-colors"
            >
              <span>VIEW IN NEW TAB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
