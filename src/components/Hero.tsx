import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="space-y-8"
        >
          {/* Greeting in Simplefolio rhythm */}
          <div className="space-y-3">
            <span className="inline-block text-sm sm:text-base font-medium text-[#C4623E] tracking-wide">
              Hi, my name is
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#2B2420] tracking-tight leading-[1.1]">
              {PORTFOLIO_DATA.profile.name}
            </h1>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#665B53] tracking-tight leading-[1.25] pt-1">
              I build applied ML systems end-to-end.
            </h2>
          </div>

          {/* Editorial Positioning Statement */}
          <p className="text-lg sm:text-xl text-[#5F554E] max-w-3xl leading-relaxed font-normal">
            From model training to deployment, monitoring, and scalable APIs. AI & Data Science
            undergraduate at{' '}
            <span className="text-[#2B2420] font-medium underline decoration-[#C4623E]/40 underline-offset-4">
              IIITDM Kurnool
            </span>{' '}
            with practical experience across reproducible data pipelines and real-time inference.
          </p>

          {/* Simplefolio style Pill CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToProjects}
              className="px-8 py-3.5 rounded-full bg-[#C4623E] hover:bg-[#A84E2D] text-[#FAF5EE] text-sm font-semibold tracking-wide shadow-warm hover:shadow-warm-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={onOpenResume}
              className="px-8 py-3.5 rounded-full bg-transparent hover:bg-[#C4623E]/10 text-[#C4623E] border-2 border-[#C4623E] text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Location & Quick Meta */}
          <div className="pt-6 border-t border-[#DDD0BE]/80 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#665B53]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C4623E]" />
              <span>{PORTFOLIO_DATA.profile.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4623E]" />
              <span>IIITDM Kurnool (2023–2027)</span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#665B53] hover:text-[#C4623E] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#665B53] hover:text-[#C4623E] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="text-[#665B53] hover:text-[#C4623E] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
