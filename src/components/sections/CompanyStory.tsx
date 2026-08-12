import React from "react";
import { Container } from "../layout/Container";
import { Eyebrow } from "../layout/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { company } from "../../data/company";

export const CompanyStory: React.FC = () => {
  const { story } = company;

  return (
    <section className="relative z-20 bg-[#12141c] text-white py-28 md:py-36 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal direction="right" className="lg:sticky lg:top-32 self-start">
            <Eyebrow className="mb-6">{story.eyebrow}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08]">
              {story.heading}
            </h2>
          </Reveal>

          <div className="space-y-8">
            {story.paragraphs.map((paragraph, index) => (
              <Reveal
                key={index}
                delay={index * 80}
                className="text-zinc-400 font-light text-lg leading-relaxed"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CompanyStory;