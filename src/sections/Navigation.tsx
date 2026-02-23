import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('.pinned-section');
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F17]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-[6vw] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-tight"
          >
            Pulse Gear Hub
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection(3)}
              className="link-underline text-sm font-medium"
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection(1)}
              className="link-underline text-sm font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection(1)}
              className="link-underline text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(11)}
              className="link-underline text-sm font-medium"
            >
              Contact
            </button>
            <button className="btn-primary text-sm ml-4">Request a quote</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-[#0B0F17]/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection(3)}
            className="text-2xl font-['Space_Grotesk'] font-semibold text-white"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection(1)}
            className="text-2xl font-['Space_Grotesk'] font-semibold text-white"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection(1)}
            className="text-2xl font-['Space_Grotesk'] font-semibold text-white"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(11)}
            className="text-2xl font-['Space_Grotesk'] font-semibold text-white"
          >
            Contact
          </button>
          <button className="btn-primary text-lg mt-4">Request a quote</button>
        </div>
      </div>
    </>
  );
}
