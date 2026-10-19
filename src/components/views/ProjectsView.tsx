import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, Sparkles, Layers, Cpu, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';

interface ProjectsViewProps {
  onBack: () => void;
  onOpenContact: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onBack, onOpenContact }) => {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Breadcrumb & Return to Deck */}
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
          <span className="font-mono text-xs text-cyan-600 font-bold">//</span>
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">ENGINEERED REPOSITORIES</span>
        </div>
      </div>

      {/* Main Grid: Projects List & Deep-Dive Inspection Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Project Selector (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-neutral-900 dark:bg-[#18181b] text-white p-5 rounded-3xl border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>TECHNICAL REPOSITORIES</span>
            </div>
            <h3 className="font-heading font-black text-xl tracking-tight">
              Enterprise AI & Predictive Systems
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Select any project below to inspect architectural details.
            </p>
          </div>

          <div className="space-y-3">
            {PROJECTS.map((proj) => {
              const isActive = selectedProject.id === proj.id;
              return (
                <motion.div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-white dark:bg-[#1f1f23] border-[#ea3826] shadow-lg ring-2 ring-[#ea3826]/20'
                      : 'bg-white/80 dark:bg-[#18181b] border-neutral-300/80 dark:border-neutral-800 hover:bg-white dark:hover:bg-[#1f1f23] hover:border-neutral-400 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500">
                      SYS // {proj.id.toUpperCase()}
                    </span>
                    {isActive && (
                      <span className="bg-[#ea3826] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-base text-neutral-950 dark:text-white mt-1.5 leading-snug">
                    {proj.title}
                  </h4>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 mt-1">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    {proj.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-700 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {proj.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                        +{proj.tags.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Architectural Inspection (7 Cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea3826] tracking-wider uppercase mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>ARCHITECTURE & IMPLEMENTATION</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Narrative description */}
              <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {selectedProject.description}
              </div>

              {/* Core Resume Accomplishments */}
              <div className="bg-neutral-50 dark:bg-neutral-900/60 rounded-2xl p-5 border border-neutral-200/80 dark:border-neutral-800">
                <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ea3826]" />
                  <span>Key Engineering Deliverables & Workflows</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 leading-normal">
                      <ChevronRight className="w-3.5 h-3.5 text-[#ea3826] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Components */}
              <div>
                <h4 className="font-heading font-bold text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                  <span>System Architecture Pipeline</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedProject.architecture.map((block, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-900 dark:bg-black text-white font-mono text-[11px] flex flex-col justify-between gap-2 border border-neutral-800 dark:border-neutral-700"
                    >
                      <span className="text-[#ea3826] text-[9px] font-bold">LAYER 0{idx + 1}</span>
                      <span className="font-semibold">{block}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business & Technical Impact */}
              <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 text-cyan-950 dark:text-cyan-200 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-cyan-800 dark:text-cyan-400 uppercase">
                    MEASURABLE IMPACT
                  </div>
                  <div className="text-xs font-medium text-cyan-900 dark:text-cyan-300 mt-0.5">
                    {selectedProject.impact}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-mono text-xs font-bold hover:bg-[#ea3826] dark:hover:bg-[#ea3826] dark:hover:text-white transition-colors shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW REPOSITORY ON GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>

                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-200 font-mono text-xs font-semibold transition-colors"
                >
                  <span>DISCUSS ARCHITECTURE</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
