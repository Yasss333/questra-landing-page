import type { Metadata } from "next"
import { siteConfig } from "./siteConfig"
export function marketingMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: siteConfig.brandName,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  }
}
export function pageStructuredData(
  path: string,
  title: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": siteConfig.url + path + "#webpage",
    url: siteConfig.url + path,
    name: title,
    description,
    isPartOf: { "@id": siteConfig.url + "/#website" },
    about: { "@id": siteConfig.url + "/#organization" },
  }
}
