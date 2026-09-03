import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#DDD0BE] bg-[#F4EFE6] text-[#665B53] py-14 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
        {/* Simplefolio Return to Top Arrow */}
        <div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#FAF5EE] hover:bg-[#C4623E] text-[#2B2420] hover:text-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] shadow-warm-sm hover:shadow-warm transition-all duration-200 inline-flex items-center justify-center cursor-pointer"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Centered Icon-only Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#FAF5EE] hover:bg-[#C4623E] text-[#2B2420] hover:text-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] shadow-warm-sm transition-all duration-200 inline-flex items-center justify-center"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#FAF5EE] hover:bg-[#C4623E] text-[#2B2420] hover:text-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] shadow-warm-sm transition-all duration-200 inline-flex items-center justify-center"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className="w-10 h-10 rounded-full bg-[#FAF5EE] hover:bg-[#C4623E] text-[#2B2420] hover:text-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] shadow-warm-sm transition-all duration-200 inline-flex items-center justify-center"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Small Copyright Line */}
        <div className="pt-2 text-xs text-[#94887E]">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. Inspired by Simplefolio, reimagined in a warm beige aesthetic.
        </div>
      </div>
    </footer>
  );
};
