import React from "react";
import { PackageSearch, SearchX } from "lucide-react";

interface ProductEmptyStateProps {
  variant?: "catalog" | "no-results";
}

export const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({
  variant = "no-results",
}) => {
  const isCatalog = variant === "catalog";

  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl bg-[#12141c] border border-white/10">
      {isCatalog ? (
        <PackageSearch className="w-12 h-12 text-[#c5a059] mb-6" />
      ) : (
        <SearchX className="w-12 h-12 text-[#c5a059] mb-6" />
      )}

      <h3 className="text-2xl font-light tracking-wide text-white mb-3">
        {isCatalog ? "Catalog Coming Soon" : "No Products Found"}
      </h3>

      <p className="text-zinc-400 font-light leading-relaxed max-w-md">
        {isCatalog
          ? "JOJO's full machinery catalog is being prepared. Please check back soon or contact us for current availability."
          : "No machinery matches your current filter or search. Try a different category or search term."}
      </p>
    </div>
  );
};

export default ProductEmptyState;