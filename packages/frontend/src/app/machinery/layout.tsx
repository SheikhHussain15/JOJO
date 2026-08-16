import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Machinery — JOJO International",
  description:
    "Explore JOJO International's agricultural and industrial machinery — equipment engineered to work hard, backed by consistent standards.",
  path: "/machinery",
});

export default function MachineryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
