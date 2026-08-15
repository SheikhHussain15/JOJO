import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { Footer } from "./components/layout/Footer";
import { Preloader } from "./components/ui/Preloader";
import { HomePage } from "./pages/HomePage";
import { AutomotivePage } from "./pages/AutomotivePage";
import { MachineryPage } from "./pages/MachineryPage";
import { MachineryDetailPage } from "./pages/MachineryDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function App() {
  const [, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-white selection:bg-[#c5a059] selection:text-[#08090d]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-[#c5a059] focus:px-6 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:font-medium focus:text-[#08090d]"
      >
        Skip to main content
      </a>
      <Preloader onComplete={() => setIsLoading(false)} />
      <BrowserRouter>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/automotive" element={<AutomotivePage />} />
            <Route path="/machinery" element={<MachineryPage />} />
            <Route path="/machinery/:slug" element={<MachineryDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ScrollToTop />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;