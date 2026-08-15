import { useEffect } from "react";

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

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, path }: PageMeta): void {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);

    const url = `${SITE_URL}${path}`;
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }, [title, description, path]);
}
