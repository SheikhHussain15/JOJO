import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { company } from "../../data/company";

const navLinks = [
  { label: "Automotive", to: "/automotive" },
  { label: "Machinery", to: "/machinery" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const Footer: React.FC = () => {
  const { contact } = company;

  return (
    <footer className="bg-[#08090d] py-20 md:py-24 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

          {/* JOJO International */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
              <span className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-white font-mono">JOJO</span>
              <span className="text-xs md:text-base uppercase tracking-[0.3em] text-zinc-400 font-mono">International</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              {company.brandIntro.description}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h4 className="text-zinc-400 uppercase tracking-[0.2em] text-xs font-medium mb-4">Navigation</h4>
            <ul className="space-y-3 text-zinc-400 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-[#c5a059] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-zinc-400 uppercase tracking-[0.2em] text-xs font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>
                <span className="font-medium">Office</span>
                <span className="ml-2 text-zinc-500">{contact.office}</span>
              </li>
              <li>
                <span className="font-medium">Email</span>
                <a href={`mailto:${contact.email}`} className="ml-2 text-zinc-500 hover:text-[#c5a059] transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="font-medium">Phone</span>
                <span className="ml-2 text-zinc-500">{contact.phone}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400 text-sm">
          <p>© JOJO International</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#c5a059] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#c5a059] transition-colors">Terms</Link>
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;