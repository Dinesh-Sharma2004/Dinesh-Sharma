import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4EFE6]/92 backdrop-blur-md border-b border-[#DDD0BE] shadow-warm-sm py-3.5'
          : 'bg-[#F4EFE6]/75 backdrop-blur-xs border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B2420] group-hover:text-[#C4623E] transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#C4623E] font-semibold' : 'text-[#665B53] hover:text-[#2B2420]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4623E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Pill Resume Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenResume}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#C4623E] border border-[#C4623E] hover:bg-[#C4623E] hover:text-[#FAF5EE] transition-all duration-200 shadow-warm-sm cursor-pointer"
            >
              Resume
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C4623E] border border-[#C4623E] hover:bg-[#C4623E] hover:text-[#FAF5EE] transition-colors"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2B2420] hover:text-[#C4623E] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF5EE] border-b border-[#DDD0BE] px-6 pt-4 pb-6 space-y-3 shadow-warm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-2 text-base transition-colors ${
                activeSection === item.id
                  ? 'text-[#C4623E] font-semibold'
                  : 'text-[#665B53] hover:text-[#2B2420]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#DDD0BE]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-full bg-[#C4623E] text-[#FAF5EE] text-center text-sm font-semibold shadow-warm-sm"
            >
              Download Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
