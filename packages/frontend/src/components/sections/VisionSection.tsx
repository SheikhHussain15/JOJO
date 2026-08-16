import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const VisionSection: React.FC = () => {
  const { vision } = company;

  return (
    <section className="relative z-20 bg-[#08090d] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>{vision.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] mb-8">
              {vision.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-zinc-400 font-light text-2xl md:text-3xl leading-relaxed text-balance">
              {vision.statement}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default VisionSection;