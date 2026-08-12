import { useState } from "react";
import { Navbar } from "./components/navigation/Navbar";
import { CinematicHero } from "./components/cinematic/CinematicHero";
import { NextSection } from "./components/sections/NextSection";
import { Preloader } from "./components/ui/Preloader";

export function App() {
  const [, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-white selection:bg-[#c5a059] selection:text-[#08090d]">
      <Preloader onComplete={() => setIsLoading(false)} />
      <Navbar />
      <main>
        <CinematicHero />
        <NextSection />
      </main>
    </div>
  );
}

export default App;
