import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2420]/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="rounded-2xl bg-[#FAF5EE] border border-[#DDD0BE] max-w-4xl w-full my-auto shadow-warm-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-[#FAF5EE] border-b border-[#DDD0BE] px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#2B2420]">
              Curriculum Vitae
            </h3>
            <p className="text-xs text-[#665B53]">
              {PORTFOLIO_DATA.profile.name} — {PORTFOLIO_DATA.profile.title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#DDD0BE] hover:border-[#C4623E] text-xs font-medium text-[#5F554E] hover:text-[#C4623E] transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Direct download */}
            <a
              href="/resume.pdf"
              download="Dinesh_Sharma_Resume.pdf"
              className="px-4 py-1.5 rounded-full bg-[#C4623E] hover:bg-[#A84E2D] text-[#FAF5EE] text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer shadow-warm-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EFE6D8] text-[#665B53] hover:text-[#2B2420] transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-sm text-[#5F554E] leading-relaxed bg-[#FFFFFF]/60">
          {/* Header Dossier */}
          <div className="border-b border-[#DDD0BE] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#2B2420]">
                  {PORTFOLIO_DATA.profile.name}
                </h1>
                <div className="text-base text-[#C4623E] font-medium mt-0.5">
                  {PORTFOLIO_DATA.profile.title}
                </div>
              </div>
              <div className="text-right text-xs text-[#665B53] space-y-0.5">
                <div>{PORTFOLIO_DATA.profile.location}</div>
                <div>{PORTFOLIO_DATA.profile.email}</div>
                <div>IIITDM Kurnool (2023–2027)</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-[#5F554E] leading-relaxed border-l-2 border-[#C4623E] pl-4 py-0.5">
              {PORTFOLIO_DATA.profile.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <div className="font-serif text-base font-bold text-[#2B2420] flex items-center gap-3">
              <span>Education</span>
              <div className="h-px bg-[#DDD0BE] flex-1" />
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#2B2420]">
                {PORTFOLIO_DATA.education.degree}
              </span>
              <span className="text-xs text-[#665B53]">{PORTFOLIO_DATA.education.period}</span>
            </div>
            <div className="text-xs text-[#665B53]">
              {PORTFOLIO_DATA.education.institution} •{' '}
              <span className="text-[#C4623E] font-semibold">
                CPI {PORTFOLIO_DATA.education.cpi}
              </span>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="font-serif text-base font-bold text-[#2B2420] flex items-center gap-3">
              <span>Work Experience</span>
              <div className="h-px bg-[#DDD0BE] flex-1" />
            </div>
            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-[#2B2420]">
                    {exp.role} — {exp.company}
                  </span>
                  <span className="text-xs text-[#665B53]">{exp.period}</span>
                </div>
                <div className="text-xs text-[#C4623E] font-medium">
                  {exp.tags.join(' • ')}
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#5F554E]">
                  {exp.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div className="space-y-4">
            <div className="font-serif text-base font-bold text-[#2B2420] flex items-center gap-3">
              <span>Selected Applied Projects</span>
              <div className="h-px bg-[#DDD0BE] flex-1" />
            </div>
            {PORTFOLIO_DATA.projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-[#2B2420]">
                    {proj.title}
                  </span>
                  <span className="text-xs text-[#665B53]">{proj.period}</span>
                </div>
                <div className="text-xs text-[#C4623E] font-medium">
                  {proj.tech.join(', ')}
                </div>
                <ul className="space-y-1 pl-4 list-disc text-xs text-[#5F554E]">
                  {proj.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <div className="font-serif text-base font-bold text-[#2B2420] flex items-center gap-3">
              <span>Technical Skills</span>
              <div className="h-px bg-[#DDD0BE] flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PORTFOLIO_DATA.skills.map((cluster) => (
                <div key={cluster.code} className="p-2.5 rounded-lg bg-[#FAF5EE] border border-[#DDD0BE]">
                  <span className="text-[#C4623E] font-semibold block mb-0.5">
                    {cluster.category}:
                  </span>
                  <span className="text-[#5F554E]">{cluster.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="bg-[#FAF5EE] border-t border-[#DDD0BE] px-6 py-3.5 flex items-center justify-between text-xs text-[#665B53] shrink-0">
          <span>Replace public/resume.pdf with your latest exported PDF.</span>
          <button
            onClick={onClose}
            className="text-[#C4623E] font-medium hover:underline cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
