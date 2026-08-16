import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const CtaSection: React.FC = () => {
  const { cta } = company;

  return (
    <section className="relative z-20 bg-[#08090d] text-white py-32 md:py-44 border-t border-white/10 overflow-hidden">
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>{cta.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1.05] mb-8">
              {cta.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-zinc-400 font-light text-xl md:text-2xl leading-relaxed max-w-2xl mb-12">
              {cta.description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <Button to="/contact" size="lg">
              {cta.button}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default CtaSection;