import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  // IntersectionObserver for active section highlighting in nav
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2B2420] relative selection:bg-[#C4623E]/20 selection:text-[#C4623E] font-sans antialiased">
      {/* Subtle Paper Grain Texture */}
      <div className="fixed inset-0 paper-texture opacity-70 pointer-events-none z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar
          activeSection={activeSection}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <main>
          <Hero onOpenResume={() => setResumeModalOpen(true)} />
          <About onOpenResume={() => setResumeModalOpen(true)} />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Resume Viewer / Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;
