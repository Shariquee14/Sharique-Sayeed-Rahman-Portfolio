import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, GraduationCap, Award, Cpu, Code2, 
  BarChart3, Users, Wrench, CheckCircle2, BookOpen
} from 'lucide-react';
import { EDUCATION, SKILL_CATEGORIES, CERTIFICATIONS } from '../../data/portfolioData';

interface SkillsViewProps {
  onBack: () => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-[#ea3826]" />;
      case 'Code2': return <Code2 className="w-4 h-4 text-[#ea3826]" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4 text-[#ea3826]" />;
      case 'Users': return <Users className="w-4 h-4 text-[#ea3826]" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-[#ea3826]" />;
      default: return <Cpu className="w-4 h-4 text-[#ea3826]" />;
    }
  };

  const filteredSkillCategories = activeCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.category === activeCategory);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Top Navigation */}
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
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase">ACADEMICS & CAPABILITIES</span>
        </div>
      </div>

      {/* Main Grid: Education Timeline & Technical Skills Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Education & Certifications (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Education Timeline */}
          <div className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea3826] tracking-wider uppercase mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC BACKGROUND</span>
            </div>

            <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-3 space-y-6 pl-5 py-2">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#ea3826] border-2 border-white dark:border-[#1f1f23] shadow-xs" />

                  <div className="text-[10px] font-mono font-semibold text-[#ea3826] uppercase">
                    {edu.period}
                  </div>

                  <h4 className="font-heading font-bold text-sm text-neutral-950 dark:text-white mt-0.5 leading-snug">
                    {edu.degree}
                  </h4>

                  <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">
                    {edu.institution}
                  </div>

                  <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] font-bold text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
                    {edu.score}
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-sans leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-neutral-900 dark:bg-[#18181b] text-white rounded-3xl p-6 sm:p-7 border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mb-4">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-neutral-800/80 dark:bg-neutral-900/90 border border-neutral-700/80 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-300">
                    <span>ISSUED BY: {cert.issuer.toUpperCase()}</span>
                    <span>VERIFIED</span>
                  </div>
                  <h5 className="font-heading font-bold text-sm text-white mt-1">
                    {cert.name}
                  </h5>
                  <p className="text-xs text-neutral-300 mt-1.5 font-sans leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Categorized Technical Competencies (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1f1f23] rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ea3826] tracking-wider uppercase mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>TECHNICAL SKILLS & CORE COMPETENCIES</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-neutral-950 dark:text-white">
                  Engineering & Strategy Stack
                </h3>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {['All', 'AI Consulting & Strategy', 'Technical Core', 'Strategic & Analytical'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {cat === 'AI Consulting & Strategy' ? 'AI Strategy' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Categorized Skills Grid */}
            <div className="space-y-6">
              {filteredSkillCategories.map((cat, idx) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800"
                >
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-2xs">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white tracking-tight">
                      {cat.category}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-700 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 shadow-2xs hover:border-[#ea3826] hover:text-[#ea3826] transition-all"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#ea3826]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
