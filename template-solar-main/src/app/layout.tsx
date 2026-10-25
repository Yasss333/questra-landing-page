import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"

import Footer from "@/components/ui/Footer"
import { NavBar } from "@/components/ui/Navbar"
import { siteConfig } from "./siteConfig"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Questra",
    "examination intelligence",
    "AI question bank",
    "faculty review",
    "syllabus management",
    "student portal",
  ],
  authors: [
    {
      name: "Questra",
      url: siteConfig.url,
    },
  ],
  creator: "Questra",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Questra — Intelligence behind every Question",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { document.documentElement.classList.toggle("dark", localStorage.getItem("theme") === "dark"); } catch {}`,
          }}
        />
      </head>
      <body
        className={`${GeistSans.className} min-h-screen antialiased selection:bg-blue-100 selection:text-blue-900`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
