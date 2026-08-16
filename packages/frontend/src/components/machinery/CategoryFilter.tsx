import React from "react";
import { MACHINERY_CATEGORIES } from "../../types/machinery";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
  resultCounts?: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  active,
  onChange,
  resultCounts,
}) => {
  const options = ["All", ...MACHINERY_CATEGORIES];

  return (
    <div
      role="group"
      aria-label="Filter products by category"
      className="flex flex-wrap gap-2 md:gap-3"
    >
      {options.map((option) => {
        const isActive = active === option;
        const count = resultCounts ? resultCounts[option] ?? 0 : undefined;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`
              inline-flex items-center gap-2
              text-xs uppercase tracking-[0.2em] font-mono
              px-5 py-2.5 rounded-full border transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d] focus-visible:ring-[#c5a059]
              ${
                isActive
                  ? "border-[#c5a059] bg-[#c5a059] text-[#08090d]"
                  : "border-white/20 text-zinc-300 hover:border-[#c5a059]/50 hover:text-white"
              }
            `}
          >
            <span>{option}</span>
            {count !== undefined && (
              <span
                className={`text-[10px] ${
                  isActive ? "text-[#08090d]/70" : "text-zinc-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;