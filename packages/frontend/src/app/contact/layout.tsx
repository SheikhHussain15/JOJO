import type { Metadata } from "next";
import { company } from "../../data/company";
import { buildPageMetadata } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — JOJO International",
  description: `Contact ${company.name} for vehicles, industrial machinery or a long-term partnership.`,
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
