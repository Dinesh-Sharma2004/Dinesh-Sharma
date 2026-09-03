import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 relative border-t border-[#DDD0BE]/60 bg-[#FAF5EE]/50">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        {/* Simplefolio Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] tracking-tight">
              Let's Connect
            </h2>
            <div className="w-16 h-1 bg-[#C4623E] mx-auto mt-4 rounded-full" />
          </div>

          <p className="text-base sm:text-lg text-[#5F554E] max-w-xl mx-auto leading-relaxed">
            Interested in applied ML collaboration, forecasting systems, or open engineering roles?
            My inbox is always open.
          </p>

          {/* Simplefolio style Pill CTA Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              className="px-10 py-4 rounded-full bg-[#C4623E] hover:bg-[#A84E2D] text-[#FAF5EE] text-sm font-semibold tracking-wide shadow-warm hover:shadow-warm-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Say Hello</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-full bg-[#FAF5EE] hover:bg-[#EFE6D8] text-[#2B2420] border border-[#DDD0BE] text-xs font-semibold tracking-wide transition-all duration-200 inline-flex items-center gap-2 shadow-warm-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C4623E]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-4 text-xs text-[#665B53]">
            <span>{PORTFOLIO_DATA.profile.email}</span>
            <span className="mx-2">•</span>
            <span>{PORTFOLIO_DATA.profile.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
