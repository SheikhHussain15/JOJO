import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { Footer } from "./components/layout/Footer";
import { Preloader } from "./components/ui/Preloader";
import { HomePage } from "./pages/HomePage";
import { AutomotivePage } from "./pages/AutomotivePage";
import { MachineryPage } from "./pages/MachineryPage";
import { MachineryDetailPage } from "./pages/MachineryDetailPage";
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
      <Preloader onComplete={() => setIsLoading(false)} />
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/automotive" element={<AutomotivePage />} />
            <Route path="/machinery" element={<MachineryPage />} />
            <Route path="/machinery/:slug" element={<MachineryDetailPage />} />
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