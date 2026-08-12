import React, { useMemo, useState } from "react";
import { MachineryHero } from "../components/machinery/MachineryHero";
import { CategoryFilter } from "../components/machinery/CategoryFilter";
import { ProductSearch } from "../components/machinery/ProductSearch";
import { ProductGrid } from "../components/machinery/ProductGrid";
import { ProductEmptyState } from "../components/machinery/ProductEmptyState";
import { Container } from "../components/layout/Container";
import { Reveal } from "../components/ui/Reveal";
import { machineryProducts, getFeaturedProducts } from "../data/machinery";
import { MACHINERY_CATEGORIES } from "../types/machinery";

export const MachineryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MACHINERY_CATEGORIES.forEach((category) => {
      counts[category] = machineryProducts.filter((p) => p.category === category).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return machineryProducts.filter((product) => {
      if (activeCategory !== "All" && product.category !== activeCategory) return false;
      if (normalized && !product.name.toLowerCase().includes(normalized) && !product.description.toLowerCase().includes(normalized)) {
        return false;
      }
      return true;
    });
  }, [activeCategory, searchTerm]);

  const featured = useMemo(() => getFeaturedProducts(), []);

  const hasProducts = machineryProducts.length > 0;

  return (
    <>
      <MachineryHero
        eyebrow="Machinery"
        heading="AGRICULTURAL AND INDUSTRIAL MACHINERY."
        description="Explore JOJO's machinery capability across agriculture, industry, construction, power, transport and utility. Full catalog availability to come."
      />

      <section className="bg-[#08090d] text-white pb-28 md:pb-36">
        <Container>
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
              resultCounts={hasProducts ? categoryCounts : undefined}
            />
            <ProductSearch value={searchTerm} onChange={setSearchTerm} disabled={!hasProducts} />
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <Reveal className="mb-16">
              <h2 className="text-2xl font-light tracking-wide text-white mb-8">Featured</h2>
              <ProductGrid products={featured} />
            </Reveal>
          )}

          {/* All products */}
          <Reveal delay={80}>
            <h2 className="text-2xl font-light tracking-wide text-white mb-8">
              {activeCategory === "All" ? "All Products" : activeCategory}
              <span className="ml-3 text-zinc-500 text-sm font-mono">{filtered.length}</span>
            </h2>

            {filtered.length > 0 ? (
              <ProductGrid products={filtered} />
            ) : (
              <ProductEmptyState variant={hasProducts ? "no-results" : "catalog"} />
            )}
          </Reveal>
        </Container>
      </section>
    </>
  );
};

export default MachineryPage;