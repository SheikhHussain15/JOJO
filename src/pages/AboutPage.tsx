import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Eyebrow } from "../components/layout/Eyebrow";
import { Reveal } from "../components/ui/Reveal";
import { CompanyStory } from "../components/sections/CompanyStory";
import { VisionSection } from "../components/sections/VisionSection";
import { MissionSection } from "../components/sections/MissionSection";
import { CtaSection } from "../components/sections/CtaSection";
import { company } from "../data/company";
import { usePageMeta } from "../lib/seo";

export const AboutPage: React.FC = () => {
  const { name, tagline, brandIntro, ceo } = company;

  usePageMeta({
    title: "About — JOJO International",
    description: brandIntro.description,
    path: "/about",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow className="mb-6">About {name}</Eyebrow>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
                {tagline}
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                {brandIntro.description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="bg-[#08090d] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="right">
              <Eyebrow className="mb-6">{brandIntro.eyebrow}</Eyebrow>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] mb-6">
                {brandIntro.heading}
              </h2>
            </Reveal>
            <Reveal direction="left" delay={80}>
              <p className="text-zinc-400 font-light text-lg leading-relaxed mb-6">
                {name} is an automotive and industrial machinery company,
                combining automotive insight with agricultural and industrial
                machinery since 2016.
              </p>
              <p className="text-zinc-400 font-light text-lg leading-relaxed">
                Built on reliability, standards and continual improvement — and
                relationships that outlast any single deal.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Story */}
      <CompanyStory />

      {/* What We Do */}
      <section className="relative z-20 bg-[#08090d] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <Reveal>
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.08] max-w-3xl mb-16">
              TWO CAPABILITIES, ONE STANDARD.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={80} className="group">
              <Link
                to="/automotive"
                className="block h-full p-8 md:p-10 rounded-2xl bg-[#12141c] border border-white/10 group-hover:border-[#c5a059]/50 transition-all duration-300"
              >
                <span className="block text-xs font-mono text-[#c5a059] mb-6">01</span>
                <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
                  Automotive
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  {company.automotive.description}
                </p>
              </Link>
            </Reveal>

            <Reveal delay={160} className="group">
              <Link
                to="/machinery"
                className="block h-full p-8 md:p-10 rounded-2xl bg-[#12141c] border border-white/10 group-hover:border-[#c5a059]/50 transition-all duration-300"
              >
                <span className="block text-xs font-mono text-[#c5a059] mb-6">02</span>
                <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
                  Agricultural & Industrial Machinery
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Equipment across agriculture, industry, construction, power,
                  transport and utility — engineered to work hard and backed by
                  JOJO's quality standards.
                </p>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <VisionSection />

      {/* Mission */}
      <MissionSection />

      {/* Leadership */}
      <section className="relative z-20 bg-[#08090d] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <Reveal>
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.08] mb-16">
              MESSAGE FROM THE CEO.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="max-w-3xl rounded-2xl border border-white/10 bg-[#12141c] p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#08090d] border border-white/10 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-mono text-[#c5a059]">
                    {ceo?.name.charAt(0) ?? name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg md:text-xl font-light text-white">
                    {ceo?.name}
                  </p>
                  <p className="text-sm text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1">
                    {ceo?.title}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  );
};

export default AboutPage;
