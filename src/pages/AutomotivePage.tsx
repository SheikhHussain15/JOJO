import React from "react";
import { Container } from "../components/layout/Container";
import { Eyebrow } from "../components/layout/Eyebrow";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { company } from "../data/company";
import heroImage from "../assets/hero.png";
import { usePageMeta } from "../lib/seo";

export const AutomotivePage: React.FC = () => {
  const { automotive, name } = company;

  usePageMeta({
    title: "Automotive — JOJO International",
    description: automotive.description,
    path: "/automotive",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow className="mb-6">{automotive.eyebrow}</Eyebrow>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
                {automotive.headline}
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                {automotive.description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Capability visual */}
      <section className="bg-[#08090d] text-white pb-28 md:pb-36">
        <Container>
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[21/9] mb-20">
              <img
                src={heroImage}
                alt={`${name} automotive capability`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d]/70 to-transparent" />
            </div>
          </Reveal>

          {/* Sales & marketing capability — approved content only */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="right">
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-[1.08] text-white mb-6">
                WHAT WE DO IN AUTOMOTIVE.
              </h2>
            </Reveal>
            <Reveal direction="left" delay={80}>
              <div className="space-y-6">
                <p className="text-zinc-400 font-light text-lg leading-relaxed">
                  {name} is an automotive sales and marketing agency with automotive industry experience since 2016.
                </p>
                <p className="text-zinc-400 font-light text-lg leading-relaxed">
                  We combine sales capability with marketing reach — sourcing the right vehicles and connecting them with the right customers, built on long-term relationships.
                </p>
                <div className="pt-6">
                  <Button to="/contact">Discuss Your Requirement</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AutomotivePage;