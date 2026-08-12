import React from "react";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../components/machinery/ProductDetail";
import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { getProductBySlug } from "../data/machinery";

export const MachineryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <Container className="pt-40 md:pt-48 pb-32">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.08] text-white mb-6">
            PRODUCT NOT FOUND.
          </h1>
          <p className="text-zinc-400 font-light text-lg leading-relaxed mb-10">
            The machinery you're looking for isn't listed in our catalog right now — or its details haven't been published yet. Browse the full catalog or contact JOJO for current availability.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/machinery" variant="secondary">
              Browse Machinery
            </Button>
            <Button href="/contact">Request Information</Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-[#08090d] text-white pt-36 md:pt-44 pb-28 md:pb-36">
      <ProductDetail product={product} />
    </div>
  );
};

export default MachineryDetailPage;