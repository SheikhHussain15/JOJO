import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MachineryProduct } from "../../types/machinery";

interface ProductCardProps {
  product: MachineryProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/machinery/${product.slug}`}
      className="group block bg-[#12141c] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c5a059]/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#08090d]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1 rounded-full bg-[#08090d]/80 backdrop-blur-sm border border-white/10 text-zinc-300">
          {product.category}
        </span>
      </div>

      <div className="p-6 md:p-7">
        <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-5 line-clamp-2">
          {product.description}
        </p>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#c5a059] group-hover:gap-3.5 transition-all">
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;