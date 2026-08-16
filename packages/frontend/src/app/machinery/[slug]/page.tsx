import type { Metadata } from "next";
import { ProductDetail } from "../../../components/machinery/ProductDetail";
import { Container } from "../../../components/layout/Container";
import { Button } from "../../../components/ui/Button";
import { getProductBySlug } from "../../../data/machinery";
import { buildPageMetadata } from "../../../lib/seo";

interface MachineryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: MachineryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return buildPageMetadata({
    title: product
      ? `${product.name} — JOJO International`
      : "Product Not Found — JOJO International",
    description: product
      ? product.description
      : "The machinery you're looking for isn't listed in the catalog right now.",
    path: `/machinery/${slug}`,
  });
}

export default async function MachineryDetailPage({
  params,
}: MachineryDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
            <Button to="/contact">Request Information</Button>
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
}
