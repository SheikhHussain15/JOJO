import React from "react";
import { Search } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Search products"
        aria-label="Search products"
        className="
          w-full pl-11 pr-4 py-3 rounded-full
          bg-[#12141c] border border-white/10 text-white text-sm
          placeholder:text-zinc-500 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-[#c5a059]
          disabled:opacity-50 transition-colors
        "
      />
    </div>
  );
};

export default ProductSearch;