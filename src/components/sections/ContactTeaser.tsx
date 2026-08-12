import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const ContactTeaser: React.FC = () => {
  const { contact } = company;

  return (
    <section id="contact" className="relative z-20 bg-[#12141c] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <Reveal>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] mb-16 max-w-3xl">
            {contact.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Office", value: contact.office },
            { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
            { label: "Phone", value: contact.phone },
          ].map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 80}
              className="p-8 rounded-2xl bg-[#08090d] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300"
            >
              <span className="block text-xs uppercase tracking-[0.25em] font-mono text-zinc-500 mb-4">
                {item.label}
              </span>
              {item.href ? (
                <a href={item.href} className="text-xl md:text-2xl font-light tracking-wide text-white hover:text-[#c5a059] transition-colors">
                  {item.value}
                </a>
              ) : (
                <span className="text-xl md:text-2xl font-light tracking-wide text-white">
                  {item.value}
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactTeaser;