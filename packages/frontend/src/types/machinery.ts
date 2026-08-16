export const MACHINERY_CATEGORIES = [
  "Agriculture",
  "Industrial",
  "Construction",
  "Power",
  "Transport",
  "Utility",
] as const;

export type MachineryCategory = (typeof MACHINERY_CATEGORIES)[number];

export interface MachineryProduct {
  id: string;
  slug: string;
  name: string;
  category: MachineryCategory;
  description: string;
  image: string;
  gallery?: string[];
  applications?: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  features?: string[];
  featured?: boolean;
}

export type MachineryCategoryFilter = "All" | MachineryCategory;