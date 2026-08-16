import type { Metadata } from "next";

// Single source of truth for site identity + SEO. SITE_URL is a placeholder —
// update to the real production domain before launch (canonical/sitemap depend
// on it). Verified content only; no fabricated claims.

export const SITE_URL = "https://www.jojo-international.com";
export const SITE_NAME = "JOJO International";
export const SITE_DEFAULT_TITLE =
  "JOJO International — Automotive & Industrial Machinery";
export const SITE_DEFAULT_DESCRIPTION =
  "JOJO International is an automotive and industrial machinery company combining automotive insight with agricultural and industrial equipment since 2016.";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

// Returns a Next.js Metadata object for a single page. Drop-in replacement for
// the old client-side usePageMeta() hook — export from server pages/layouts.
export function buildPageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
