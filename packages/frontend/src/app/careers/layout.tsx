import type { Metadata } from "next";
import { company } from "../../data/company";
import { buildPageMetadata } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers — JOJO International",
  description: `Join the ${company.name} team — service, quality and affordability at the heart of everything we do.`,
  path: "/careers",
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
