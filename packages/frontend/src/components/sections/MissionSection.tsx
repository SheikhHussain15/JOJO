import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const MissionSection: React.FC = () => {
  const { mission } = company;

  return (
    <section className="relative z-20 bg-[#12141c] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="right">
            <Eyebrow className="mb-6">{mission.eyebrow}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08]">
              {mission.heading}
            </h2>
          </Reveal>
          <Reveal direction="left" delay={100}>
            <p className="text-zinc-400 font-light text-2xl leading-relaxed text-balance">
              {mission.statement}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default MissionSection;