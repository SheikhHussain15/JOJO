import { useState } from "react";
import { Navbar } from "./components/navigation/Navbar";
import { CinematicHero } from "./components/cinematic/CinematicHero";
import { BrandIntro } from "./components/sections/BrandIntro";
import { AutomotiveSection } from "./components/sections/AutomotiveSection";
import { MachineryPreview } from "./components/sections/MachineryPreview";
import { WhyJojo } from "./components/sections/WhyJojo";
import { CompanyStory } from "./components/sections/CompanyStory";
import { VisionSection } from "./components/sections/VisionSection";
import { MissionSection } from "./components/sections/MissionSection";
import { CtaSection } from "./components/sections/CtaSection";
import { ContactTeaser } from "./components/sections/ContactTeaser";
import { Footer } from "./components/layout/Footer";
import { Preloader } from "./components/ui/Preloader";

export function App() {
  const [, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-white selection:bg-[#c5a059] selection:text-[#08090d]">
      <Preloader onComplete={() => setIsLoading(false)} />
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;