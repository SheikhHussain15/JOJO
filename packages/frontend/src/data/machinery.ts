import type { MachineryProduct } from "../types/machinery";

export const machineryProducts: MachineryProduct[] = [];

export const getProductBySlug = (slug: string): MachineryProduct | undefined =>
  machineryProducts.find((product) => product.slug === slug);

export const getFeaturedProducts = (): MachineryProduct[] =>
  machineryProducts.filter((product) => product.featured === true);

export const getProductsByCategory = (products: MachineryProduct[], category: string): MachineryProduct[] =>
  category === "All"
    ? products
    : products.filter((product) => product.category === category);