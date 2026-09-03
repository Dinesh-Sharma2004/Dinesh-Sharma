import React from 'react';
import { motion } from 'framer-motion';
import { Download, GraduationCap, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-24 relative border-t border-[#DDD0BE]/60">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Simplefolio Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2420] tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[#C4623E] mx-auto mt-3 rounded-full" />
        </div>

        {/* Two-column layout like Simplefolio's About section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Portrait Card Placeholder (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="w-full max-w-sm rounded-2xl bg-[#FAF5EE] border border-[#DDD0BE] p-5 shadow-warm">
              {/* Photo / Portrait frame */}
              {/* NOTE: To use your own photo, place it in public/profile.jpg and replace the inner div with <img src="/profile.jpg" alt="Dinesh Sharma" className="w-full aspect-square object-cover rounded-xl" /> */}
              <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-[#EFE6D8] to-[#E2D6C3] border border-[#DDD0BE] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                <div className="w-24 h-24 rounded-full bg-[#FAF5EE] border-2 border-[#C4623E]/30 flex items-center justify-center text-3xl font-serif font-bold text-[#C4623E] shadow-warm-sm mb-4">
                  DS
                </div>

                <h3 className="font-serif font-bold text-lg text-[#2B2420]">
                  Dinesh Sharma
                </h3>

                <p className="text-xs text-[#665B53] mt-1 font-medium">
                  AI & Data Science Engineer
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#DDD0BE] text-[11px] text-[#665B53]">
                  <MapPin className="w-3 h-3 text-[#C4623E]" />
                  <span>Bangalore, India</span>
                </div>
              </div>

              {/* Education callout banner inside card */}
              <div className="mt-4 pt-4 border-t border-[#DDD0BE] flex items-center justify-between text-xs text-[#665B53]">
                <div className="flex items-center gap-1.5 font-medium text-[#2B2420]">
                  <GraduationCap className="w-4 h-4 text-[#C4623E]" />
                  <span>IIITDM Kurnool</span>
                </div>
                <span className="font-semibold text-[#C4623E] bg-[#C4623E]/10 px-2.5 py-0.5 rounded-full">
                  CPI 7.75/10
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Narrative Bio & Details (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-[#5F554E] leading-relaxed text-base"
          >
            {/* Verbatim summary text */}
            <p>
              {PORTFOLIO_DATA.profile.bio}
            </p>

            {/* Education Highlight Card */}
            <div className="p-5 rounded-xl bg-[#FAF5EE] border border-[#DDD0BE] shadow-warm-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C4623E]">
                  Education
                </span>
                <span className="text-xs font-medium text-[#665B53]">2023 – 2027</span>
              </div>

              <div className="text-base font-serif font-bold text-[#2B2420]">
                B.Tech, Artificial Intelligence & Data Science
              </div>

              <div className="text-sm text-[#665B53]">
                Indian Institute of Information Technology, Design and Manufacturing (IIITDM) Kurnool
              </div>

              <div className="pt-1 text-sm font-semibold text-[#C4623E]">
                Cumulative Performance Index: 7.75 / 10.0
              </div>
            </div>

            {/* Leadership & Co-curricular */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C4623E] block">
                Leadership & Co-Curricular
              </span>

              <div className="space-y-2.5">
                {PORTFOLIO_DATA.leadership.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#FAF5EE]/70 border border-[#DDD0BE]/80 text-xs text-[#5F554E]"
                  >
                    <span className="font-semibold text-[#2B2420] mr-1.5">
                      {item.title} — {item.organization}:
                    </span>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simplefolio style Resume Pill Button */}
            <div className="pt-4">
              <button
                onClick={onOpenResume}
                className="px-8 py-3 rounded-full bg-[#C4623E] hover:bg-[#A84E2D] text-[#FAF5EE] text-sm font-semibold tracking-wide shadow-warm transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
