import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 50);
      scrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active link based on scroll position
  useEffect(() => {
    const sections = ['#automotive', '#machinery', '#about', '#contact'];
    const handleScroll = () => {
      const current = scrollRef.current;
      let lastSection: string | null = null;
      let maxOffset = 0;

      sections.forEach(section => {
        const element = document.querySelector(section) as HTMLElement | null;
        if (element) {
          const offset = element.offsetTop - 100;
          if (current >= offset && current - offset > maxOffset) {
            maxOffset = current - offset;
            lastSection = section;
          }
        }
      });

      if (activeLink !== lastSection) {
        setActiveLink(lastSection);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeLink]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-[#08090d]/70 backdrop-blur-md border2 border-white/5/ box-shadow: 0 4px 20px rgba(0,0,0,0.3)" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="text-xl md:text-2xl font-bold tracking-[0.25em] text-white font-mono group-hover:text-[#c5a059] transition-colors">
            JOJO
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono border-l border-white/20 pl-3">
            International
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em] font-medium text-zinc-300">
          <a
            href="#automotive"
            className={activeLink === "#automotive" ? "font-semibold text-[#c5a059]" : "hover:text-[#c5a059] transition-colors"}
          >
            Automotive
          </a>
          <a
            href="#machinery"
            className={activeLink === "#machinery" ? "font-semibold text-[#c5a059]" : "hover:text-[#c5a059] transition-colors"}
          >
            Machinery
          </a>
          <a
            href="#about"
            className={activeLink === "#about" ? "font-semibold text-[#c5a059]" : "hover:text-[#c5a059] transition-colors"}
          >
            About
          </a>
          <a
            href="#contact"
            className={activeLink === "#contact" ? "font-semibold text-[#c5a059]" : "hover:text-[#c5a059] transition-colors"}
          >
            Contact
          </a>
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono px-5 py-2.5 rounded-full border border-white/20 text-white hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
          >
            <span>Inquiries</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#08090d]/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden shadow-2xl">
          <a
            href="#automotive"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg uppercase tracking-[0.2em] text-zinc-200 hover:text-[#c5a059] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          >
            Automotive
          </a>
          <a
            href="#machinery"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg uppercase tracking-[0.2em] text-zinc-200 hover:text-[#c5a059] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          >
            Machinery
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg uppercase tracking-[0.2em] text-zinc-200 hover:text-[#c5a059] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em] font-mono px-6 py-3 rounded-full border border-[#c5a059] text-[#c5a059] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          >
            <span>Inquiries</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;