import type { Metadata } from "next";
import { Anton, Manrope, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { LenisProvider } from "@/components/LenisProvider";
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

export const metadata: Metadata = {
  title: "Devansh Singha",
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
        <noscript>
          <style>{`[data-ink] { visibility: visible !important; } .loader { display: none !important; }`}</style>
        </noscript>
        <LenisProvider>{children}</LenisProvider>
        <Cursor />
      </body>
    </html>
  );
}
