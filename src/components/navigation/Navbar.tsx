import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const desktopLinks = [
  { label: "Automotive", to: "/automotive" },
  { label: "Machinery", to: "/machinery" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive ? "font-semibold text-[#c5a059]" : "hover:text-[#c5a059]"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#08090d]/70 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-xl md:text-2xl font-bold tracking-[0.25em] text-white font-mono group-hover:text-[#c5a059] transition-colors">
            JOJO
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono border-l border-white/20 pl-3">
            International
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em] font-medium text-zinc-300">
          {desktopLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono px-5 py-2.5 rounded-full border border-white/20 text-white hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
          >
            <span>Inquiries</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 w-full bg-[#08090d]/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
        >
          {desktopLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-lg uppercase tracking-[0.2em] text-zinc-200 hover:text-[#c5a059] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em] font-mono px-6 py-3 rounded-full border border-[#c5a059] text-[#c5a059] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059]"
          >
            <span>Inquiries</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;