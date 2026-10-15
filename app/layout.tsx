import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { SiteProviders } from "@/components/providers/site-providers";
import { Header } from "@/components/layout/header";
import { BackgroundRoot } from "@/components/visuals/background-root";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { site } from "@/data/site";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Syne({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const canonical = site.profileUrl;

export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title: {
    default: "Dinesh Sharma — AI Engineer & Data Scientist",
    template: "%s — Dinesh Sharma"
  },
  description:
    "Dinesh Sharma — AI Engineer & Data Scientist. Retrieval-augmented systems, agentic LLM workflows, deep-learning models and the backends that serve them.",
  keywords: [
    "Dinesh Sharma",
    "AI Engineer",
    "Data Scientist",
    "Machine Learning",
    "RAG",
    "LLM Agents",
    "LangGraph",
    "FastAPI"
  ],
  authors: [{ name: "Dinesh Sharma", url: site.github }],
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Dinesh Sharma — AI Engineer & Data Scientist",
    description:
      "Retrieval-augmented systems, agentic LLM workflows, deep-learning models and resilient backends.",
    images: ["/og-image.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinesh Sharma — AI Engineer & Data Scientist",
    description:
      "Retrieval-augmented systems, agentic LLM workflows, deep-learning models and resilient backends."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#080A10",
  colorScheme: "dark"
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dinesh Sharma",
  jobTitle: "AI Engineer & Data Scientist",
  url: canonical,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:text-obsidian"
        >
          Skip to content
        </a>

        <SiteProviders>
          <div className="atmosphere" aria-hidden="true" />
          <BackgroundRoot />
          <ScrollProgress />
          <CustomCursor />
          <Header />
          {children}
        </SiteProviders>
      </body>
    </html>
  );
}
