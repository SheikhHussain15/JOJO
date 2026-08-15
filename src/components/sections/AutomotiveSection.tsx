import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";
import heroImage from "../../assets/hero.png";

export const AutomotiveSection: React.FC = () => {
  const { automotive } = company;

  return (
    <section id="automotive" className="relative z-20 bg-[#08090d] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/10]">
              <img
                src={heroImage}
                alt="JOJO International automotive and machinery"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d]/60 to-transparent" />
            </div>
          </Reveal>

          <Reveal direction="left">
            <Eyebrow>{automotive.eyebrow}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] mb-6">
              {automotive.headline}
            </h2>
            <p className="text-zinc-400 font-light text-lg leading-relaxed mb-10 max-w-xl">
              {automotive.description}
            </p>
            <Button to="/automotive" variant="secondary">
              {automotive.cta}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default AutomotiveSection;