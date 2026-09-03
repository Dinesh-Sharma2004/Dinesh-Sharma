import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative border-t border-[#DDD0BE]/60">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Simplefolio Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2420] tracking-tight">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-[#C4623E] mx-auto mt-3 rounded-full" />
        </div>

        {/* Grouped Pill Clusters in Warm Paper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((cluster, cIdx) => (
            <motion.div
              key={cluster.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: cIdx * 0.06 }}
              className="rounded-2xl bg-[#FAF5EE] border border-[#DDD0BE] p-6 shadow-warm hover:shadow-warm-lg transition-all duration-200 space-y-4"
            >
              <div className="border-b border-[#DDD0BE]/70 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#2B2420]">
                  {cluster.category}
                </h3>
              </div>

              {/* Pill cluster with warm hover state */}
              <div className="flex flex-wrap gap-2">
                {cluster.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#FAF5EE] hover:bg-[#C4623E] text-[#5F554E] hover:text-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] transition-all duration-200 cursor-default shadow-warm-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
