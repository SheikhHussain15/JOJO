import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const BrandIntro: React.FC = () => {
  const { brandIntro, name } = company;

  return (
    <section id="about" className="relative z-20 bg-[#08090d] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>{brandIntro.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] mb-8">
              {brandIntro.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-zinc-400 font-light text-lg leading-relaxed max-w-2xl">
              {name} is an automotive and industrial machinery company — {brandIntro.description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10">
              <Button to="/automotive">
                Discover JOJO
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default BrandIntro;