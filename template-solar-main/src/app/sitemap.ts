import type { MetadataRoute } from "next"
import { siteConfig } from "./siteConfig"
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "/",
      "/how-it-works",
      "/platform",
      "/about",
      "/approval-automation",
      "/syllabus-intelligence",
      "/ai-question-studio",
      "/question-bank",
      "/bulk-paper-generation",
      "/academic-analytics",
      "/security-governance",
      "/student-portal",
      "/solutions",
      "/book-demo",
    ].map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
  ]
}
