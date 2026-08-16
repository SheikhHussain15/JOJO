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
import { buildPageMetadata, SITE_DEFAULT_TITLE, SITE_DEFAULT_DESCRIPTION } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
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
}
