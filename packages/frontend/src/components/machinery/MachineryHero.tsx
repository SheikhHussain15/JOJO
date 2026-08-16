import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";

interface MachineryHeroProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export const MachineryHero: React.FC<MachineryHeroProps> = ({
  eyebrow,
  heading,
  description,
}) => {
  return (
    <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
            {heading}
          </h1>
          <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default MachineryHero;