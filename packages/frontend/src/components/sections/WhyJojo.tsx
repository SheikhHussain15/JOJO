import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const WhyJojo: React.FC = () => {
  const { whyJojo } = company;

  return (
    <section className="relative z-20 bg-[#08090d] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <Reveal>
          <Eyebrow>{whyJojo.eyebrow}</Eyebrow>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] max-w-3xl mb-16">
            {whyJojo.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyJojo.points.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 100}
              className="p-8 rounded-2xl bg-[#12141c] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300"
            >
              <span className="block text-xs font-mono text-[#c5a059] mb-6">
                0{index + 1}
              </span>
              <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3">
                {point.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                {point.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyJojo;