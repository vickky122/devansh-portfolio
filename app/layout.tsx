import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Anton, Manrope, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { LenisProvider } from "@/components/LenisProvider";
import { Nav } from "@/components/Nav";
import { ShojiProvider } from "@/components/ShojiTransition";
import { content } from "@/content/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = `${content.name.first} ${content.name.last}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${title}` },
  description: content.seo.description,
  openGraph: {
    type: "website",
    siteName: title,
    title,
    description: content.seo.description,
  },
  twitter: { card: "summary_large_image", title, description: content.seo.description },
};

// Runs before first paint: a visitor who already saw the loader this session never sees it flash.
// The key matches components/Loader.tsx.
const LOADER_SKIP = `try{if(sessionStorage.getItem('loader-seen')==='1')document.documentElement.setAttribute('data-loader','skip')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the head script above may add data-loader before React hydrates
    <html
      lang="en"
      className={`${anton.variable} ${manrope.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SKIP }} />
      </head>
      <body className="surface-washi">
        <a
          href="#main"
          className="t-label surface-sumi sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2"
        >
          skip to content
        </a>
        <noscript>
          <style>{`[data-ink] { visibility: visible !important; } .loader { display: none !important; }`}</style>
        </noscript>
        <LenisProvider>
          <ShojiProvider>
            <Nav />
            {children}
          </ShojiProvider>
        </LenisProvider>
        <Cursor />
        <Analytics />
      </body>
    </html>
  );
}
