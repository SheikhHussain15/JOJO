import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { MachineryProduct } from "../../types/machinery";

interface ProductDetailProps {
  product: MachineryProduct;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const inquiryLink = `/contact?product=${encodeURIComponent(product.slug)}`;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <Link
        href="/machinery"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-zinc-400 hover:text-[#c5a059] transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Machinery</span>
      </Link>

      {/* Large visual + title */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/11] bg-[#12141c]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-mono px-3 py-1 rounded-full border border-[#c5a059]/50 text-[#c5a059] mb-5">
            {product.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] text-white mb-6">
            {product.name}
          </h1>
          <p className="text-zinc-400 font-light text-lg leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-14">
          {/* Overview */}
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-light tracking-wide text-white mb-5">
              Overview
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed">
              {product.description}
            </p>
          </section>

          {/* Applications */}
          {product.applications && product.applications.length > 0 && (
            <section aria-labelledby="applications-heading">
              <h2 id="applications-heading" className="text-2xl font-light tracking-wide text-white mb-5">
                Applications
              </h2>
              <ul className="space-y-3">
                {product.applications.map((application) => (
                  <li key={application} className="flex items-start gap-3 text-zinc-400 font-light">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
                    {application}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-14">
          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <section aria-labelledby="specifications-heading">
              <h2 id="specifications-heading" className="text-2xl font-light tracking-wide text-white mb-5">
                Specifications
              </h2>
              <dl className="border border-white/10 rounded-2xl divide-y divide-white/10 overflow-hidden">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 px-6 py-4 bg-[#12141c]">
                    <dt className="text-zinc-500 font-light">{spec.label}</dt>
                    <dd className="text-white font-light text-right break-words">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-light tracking-wide text-white mb-5">
                Features
              </h2>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-zinc-400 font-light">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Inquiry CTA — preserves selected product */}
          <section aria-label="Request information">
            <Link
              href={inquiryLink}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-mono px-8 py-4 rounded-full bg-[#c5a059] text-[#08090d] hover:bg-[#d4af37] transition-all"
            >
              <span>Request Information</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;