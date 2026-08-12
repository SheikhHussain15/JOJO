import React from "react";
import { CinematicHero } from "../components/cinematic/CinematicHero";
import { BrandIntro } from "../components/sections/BrandIntro";
import { AutomotiveSection } from "../components/sections/AutomotiveSection";
import { MachineryPreview } from "../components/sections/MachineryPreview";
import { WhyJojo } from "../components/sections/WhyJojo";
import { CompanyStory } from "../components/sections/CompanyStory";
import { VisionSection } from "../components/sections/VisionSection";
import { MissionSection } from "../components/sections/MissionSection";
import { CtaSection } from "../components/sections/CtaSection";
import { ContactTeaser } from "../components/sections/ContactTeaser";

export const HomePage: React.FC = () => {
  return (
    <>
      <CinematicHero />
      <BrandIntro />
      <AutomotiveSection />
      <MachineryPreview />
      <WhyJojo />
      <CompanyStory />
      <VisionSection />
      <MissionSection />
      <CtaSection />
      <ContactTeaser />
    </>
  );
};

export default HomePage;