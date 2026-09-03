import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Projects: React.FC = () => {
  // Rich editorial descriptions verbatim as requested
  const projectItems = [
    {
      ...PORTFOLIO_DATA.projects[0],
      editorialDescription: (
        <span>
          Implemented 9 ML algorithms from first principles — spanning regression, classification,
          and clustering — with independent training, prediction, and evaluation modules covering
          gradient descent, Gini splitting, kernel functions, and numerical stability. Validated against
          known benchmarks across supervised, unsupervised, and kernel-based approaches.
        </span>
      ),
      visualGraphic: (
        <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#FAF5EE] to-[#EFE6D8] border border-[#DDD0BE] rounded-2xl">
          <div className="flex items-center justify-between text-xs font-serif text-[#665B53]">
            <span className="font-semibold text-[#C4623E]">First-Principles Engine</span>
            <span>Zero External ML Libs</span>
          </div>
          <div className="py-6 space-y-2.5">
            <div className="font-serif text-2xl font-bold text-[#2B2420]">
              9 Core Algorithms
            </div>
            <p className="text-xs text-[#665B53]">
              Gradient Descent • Gini Splitting • Kernel Functions • Vectorized NumPy Broadcasts
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#DDD0BE] text-xs font-medium text-[#2B2420] w-fit shadow-warm-sm">
            <Cpu className="w-3.5 h-3.5 text-[#C4623E]" />
            <span>100% Numerical Stability Verified</span>
          </div>
        </div>
      )
    },
    {
      ...PORTFOLIO_DATA.projects[1],
      editorialDescription: (
        <span>
          Applied Gaussian Mixture Model regime discovery (K=4) to multivariate MetroPT2 sensor data and
          trained per-regime LightGBM specialists with buffer-triggered selective retraining (buffer ≥ 50
          samples, MAE threshold 1.2x).{' '}
          <strong className="text-[#2B2420] font-bold bg-[#C4623E]/10 px-1.5 py-0.5 rounded">
            Reduced MAE from 0.22 to 0.15 (31.2% improvement)
          </strong>{' '}
          across 292 detected regime transitions, using warm-start retraining and exposing
          ingestion/prediction/reporting through FastAPI.
        </span>
      ),
      visualGraphic: (
        <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#FAF5EE] to-[#EAE0CF] border border-[#DDD0BE] rounded-2xl">
          <div className="flex items-center justify-between text-xs font-serif text-[#665B53]">
            <span className="font-semibold text-[#C4623E]">Regime Adaptation</span>
            <span>MetroPT2 Sensor Feed</span>
          </div>
          <div className="py-6 space-y-2">
            <div className="font-serif text-3xl font-bold text-[#C4623E]">
              31.2% MAE Drop
            </div>
            <p className="text-xs text-[#665B53]">
              K=4 GMM Latent Regimes • 292 Regime Transitions • Buffer Selective Retraining
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#DDD0BE] text-xs font-medium text-[#2B2420] w-fit shadow-warm-sm">
            <TrendingUp className="w-3.5 h-3.5 text-[#C4623E]" />
            <span>0.22 → 0.15 Error Reduction</span>
          </div>
        </div>
      )
    },
    {
      ...PORTFOLIO_DATA.projects[2],
      editorialDescription: (
        <span>
          Designed a 7-service Docker stack with async PDF ingestion, FAISS retrieval, Redis/Celery
          workers, and Prometheus monitoring. Scaled retrieval candidates from 18 to 100, tuned LLM
          context to 8 documents, and reached{' '}
          <strong className="text-[#2B2420] font-bold bg-[#C4623E]/10 px-1.5 py-0.5 rounded">
            90.5ms mean retrieval latency
          </strong>{' '}
          while reducing answer abstention. Benchmarked 3 LLM candidates on latency, quality, and
          hallucination rate via a custom evaluation pipeline.
        </span>
      ),
      visualGraphic: (
        <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#FAF5EE] to-[#E8DDD0] border border-[#DDD0BE] rounded-2xl">
          <div className="flex items-center justify-between text-xs font-serif text-[#665B53]">
            <span className="font-semibold text-[#C4623E]">Distributed Clinical RAG</span>
            <span>7-Service Docker Stack</span>
          </div>
          <div className="py-6 space-y-2">
            <div className="font-serif text-3xl font-bold text-[#2B2420]">
              90.5ms Latency
            </div>
            <p className="text-xs text-[#665B53]">
              18 → 100 Candidate Scale • FAISS Vector Store • Prometheus Telemetry Pipeline
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#DDD0BE] text-xs font-medium text-[#2B2420] w-fit shadow-warm-sm">
            <Layers className="w-3.5 h-3.5 text-[#C4623E]" />
            <span>Zero-Abstention Evaluation</span>
          </div>
        </div>
      )
    },
    {
      ...PORTFOLIO_DATA.projects[3],
      editorialDescription: (
        <span>
          Fine-tuned Whisper against wav2vec2 on WER/CER, reaching{' '}
          <strong className="text-[#2B2420] font-bold bg-[#C4623E]/10 px-1.5 py-0.5 rounded">
            93.5% word accuracy
          </strong>{' '}
          on a LibriSpeech benchmark slice. Built an end-to-end ASR pipeline from browser mic capture
          through preprocessing to transcript output, feeding an LLM-backed fact-checking workflow that
          structures claim-verification into labelled JSON, containerized with Docker and served via
          FastAPI to a React frontend.
        </span>
      ),
      visualGraphic: (
        <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#FAF5EE] to-[#E3D8C6] border border-[#DDD0BE] rounded-2xl">
          <div className="flex items-center justify-between text-xs font-serif text-[#665B53]">
            <span className="font-semibold text-[#C4623E]">Speech-to-Claim Pipeline</span>
            <span>Whisper Seq2SeqTrainer</span>
          </div>
          <div className="py-6 space-y-2">
            <div className="font-serif text-3xl font-bold text-[#2B2420]">
              93.5% Accuracy
            </div>
            <p className="text-xs text-[#665B53]">
              Browser Mic Capture → Resampling → Fine-Tuned Whisper → Fact Verification
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#DDD0BE] text-xs font-medium text-[#2B2420] w-fit shadow-warm-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C4623E]" />
            <span>Labelled JSON Verification</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="py-24 relative border-t border-[#DDD0BE]/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Simplefolio Section Title */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2420] tracking-tight">
            Projects
          </h2>
          <div className="w-16 h-1 bg-[#C4623E] mx-auto mt-3 rounded-full" />
        </div>

        {/* Simplefolio-style Alternating Layout */}
        <div className="space-y-24">
          {projectItems.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Project Narrative Text (6 cols) */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C4623E]">
                    {project.category}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2420]">
                    {project.title}
                  </h3>

                  <div className="text-sm sm:text-base text-[#5F554E] leading-relaxed">
                    {project.editorialDescription}
                  </div>

                  {/* Tech Tag Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-[#EFE6D8] border border-[#DDD0BE] text-[#5F554E]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Simplefolio Pill CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full bg-[#FAF5EE] hover:bg-[#C4623E] text-[#2B2420] hover:text-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] text-xs font-semibold tracking-wide transition-all duration-200 shadow-warm-sm flex items-center gap-2"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Tilt Card Thumbnail (6 cols) */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <TiltCard className="w-full">
                    <div className="w-full aspect-[16/11] rounded-2xl shadow-warm hover:shadow-warm-lg transition-shadow duration-300 overflow-hidden">
                      {project.visualGraphic}
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
