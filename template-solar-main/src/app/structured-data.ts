import { siteConfig } from "./siteConfig"
import { homeFaqItems } from "@/components/marketing/faqContent"

const homeUrl = `${siteConfig.url}/`

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${homeUrl}#organization`,
      name: siteConfig.brandName,
      url: homeUrl,
      email: siteConfig.contactEmail,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/questra-logo.png`,
        width: 789,
        height: 206,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      name: siteConfig.brandName,
      url: homeUrl,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${homeUrl}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${homeUrl}#webpage`,
      name: siteConfig.name,
      url: homeUrl,
      description: siteConfig.description,
      inLanguage: "en",
      isPartOf: { "@id": `${homeUrl}#website` },
      about: { "@id": `${homeUrl}#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${homeUrl}#software`,
      name: siteConfig.brandName,
      url: homeUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web browser",
      description: siteConfig.description,
      provider: { "@id": `${homeUrl}#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${homeUrl}#faq`,
      mainEntity: homeFaqItems.map(([name, answer]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
      isPartOf: { "@id": `${homeUrl}#website` },
    },
  ],
}
