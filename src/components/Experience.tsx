import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative border-t border-[#DDD0BE]/60">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Simplefolio Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2420] tracking-tight">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-[#C4623E] mx-auto mt-3 rounded-full" />
        </div>

        {/* Clean cards with inline bold highlight metrics */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-[#FAF5EE] border border-[#DDD0BE] p-6 sm:p-8 shadow-warm"
            >
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#DDD0BE]/80 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2420]">
                    {exp.role}
                  </h3>
                  <div className="text-base font-medium text-[#C4623E] mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-[#665B53]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C4623E]" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 hidden sm:inline-flex">
                    <MapPin className="w-3.5 h-3.5 text-[#C4623E]" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Tag pills in earthy beige palette */}
              <div className="flex flex-wrap gap-2 pt-4">
                {exp.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[#EFE6D8] border border-[#DDD0BE] text-[#5F554E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bullet points with standout numbers pulled as small bold inline highlights */}
              <ul className="space-y-3.5 pt-5 text-sm sm:text-base text-[#5F554E] leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4623E] mt-2.5 shrink-0" />
                  <span>
                    Designed an ETL pipeline (PostgreSQL, Prefect, LangGraph) to ingest raw data,
                    build a feature store, and orchestrate parallel KYC and credit-score prediction workflows.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4623E] mt-2.5 shrink-0" />
                  <span>
                    Deployed a 2-stage face-verification pipeline (VGGFace, FaceNet, ArcFace, Celery, Redis) —{' '}
                    <strong className="text-[#2B2420] font-bold bg-[#C4623E]/10 px-1.5 py-0.5 rounded">
                      97% accuracy, 96.6% balanced accuracy, 0.985 ROC-AUC
                    </strong>{' '}
                    on 1,192 evaluation pairs, using a Random Forest Classifier.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4623E] mt-2.5 shrink-0" />
                  <span>
                    Versioned models with MLflow and Databricks; applied Optuna hyperparameter tuning
                    and SHAP feature-importance analysis for credit-risk scoring.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4623E] mt-2.5 shrink-0" />
                  <span>
                    Deployed{' '}
                    <strong className="text-[#2B2420] font-bold bg-[#C4623E]/10 px-1.5 py-0.5 rounded">
                      10+ microservices
                    </strong>{' '}
                    with SSE-based real-time job-status streaming and Pydantic schema validation across service boundaries.
                  </span>
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
