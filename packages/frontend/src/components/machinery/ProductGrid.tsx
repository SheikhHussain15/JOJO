import React from "react";
import { ProductCard } from "./ProductCard";
import type { MachineryProduct } from "../../types/machinery";

interface ProductGridProps {
  products: MachineryProduct[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;