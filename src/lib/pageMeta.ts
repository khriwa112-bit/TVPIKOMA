import { FAQ_DATA } from "../data";

interface FaqEntry {
  question: string;
  answer: string;
}

function buildFaqPageJsonLd(items: FaqEntry[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}

/** Swaps the shared #faqpage-schema script to match the FAQ actually visible on the
 * current page. Pass null to restore the homepage's FAQ_DATA-derived default. */
export function setFaqPageSchema(items: FaqEntry[] | null) {
  const el = document.getElementById("faqpage-schema");
  if (!el) return;
  el.textContent = buildFaqPageJsonLd(items ?? FAQ_DATA);
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export const DEFAULT_PAGE_META: PageMeta = {
  title: "tvpikoma | #1 IPTV Nederland – 80.000+ Kanalen & 4K",
  description:
    "tvpikoma is de #1 IPTV provider van Nederland met 80.000+ kanalen en 200.000+ films & series in 4K/8K. Bestel je abonnement vandaag.",
  canonical: "https://tivipikoma.com/",
  ogTitle: "tvpikoma | #1 IPTV Nederland – 80.000+ Kanalen & 4K",
  ogDescription:
    "tvpikoma is de #1 IPTV provider van Nederland met 80.000+ kanalen en 200.000+ films & series in 4K/8K. Bestel je abonnement vandaag.",
  twitterTitle: "tvpikoma | #1 IPTV Nederland",
  twitterDescription:
    "tvpikoma – De beste IPTV provider van Nederland. 80.000+ kanalen, 4K kwaliteit, alle apparaten. Bestel nu.",
};

interface BreadcrumbEntry {
  name: string;
  path: string;
}

const HOME_CRUMB: BreadcrumbEntry = { name: "tvpikoma", path: "/" };

/** Swaps the shared #breadcrumb-schema script to reflect the current page's position in the
 * site. Pass a list of crumbs *after* Home (Home is always prepended). Pass null to restore
 * the Home-only default. */
export function setBreadcrumbSchema(trail: BreadcrumbEntry[] | null) {
  const el = document.getElementById("breadcrumb-schema");
  if (!el) return;
  const items = [HOME_CRUMB, ...(trail ?? [])];
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://tivipikoma.com${item.path}`,
    })),
  });
}

export function applyPageMeta(meta: PageMeta) {
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.canonical);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.ogTitle ?? meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.ogDescription ?? meta.description);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", meta.canonical);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", meta.twitterTitle ?? meta.ogTitle ?? meta.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", meta.twitterDescription ?? meta.ogDescription ?? meta.description);
}
