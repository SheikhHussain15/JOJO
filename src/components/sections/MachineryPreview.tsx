import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

const machineryCategories = ["Agriculture", "Industrial", "Construction", "Power", "Transport", "Utility"];

export const MachineryPreview: React.FC = () => {
  return (
    <section id="machinery" className="relative z-20 bg-[#12141c] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <Reveal>
          <Eyebrow>Machinery</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] max-w-2xl">
              AGRICULTURAL AND INDUSTRIAL MACHINERY, DELIVERED WITH STANDARDS.
            </h2>
            <p className="text-zinc-400 font-light max-w-md">
              From the field to the factory floor — machinery categories JOJO supplies, with the full catalog launching soon.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {machineryCategories.map((category, index) => (
            <Reveal
              key={category}
              delay={index * 50}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#08090d] p-8 md:p-12 min-h-[160px] md:min-h-[200px] flex items-end hover:border-[#c5a059]/50 transition-all duration-300"
            >
              <span className="absolute top-6 right-6 text-xs font-mono text-zinc-600">
                0{index + 1}
              </span>
              <h3 className="text-xl md:text-3xl font-light tracking-wide text-white group-hover:text-[#c5a059] transition-colors">
                {category}
              </h3>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16">
            <Button href="#contact" variant="secondary">
              Explore Machinery
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default MachineryPreview;