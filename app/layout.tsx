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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body className="surface-washi">
        <noscript>
          <style>{`[data-ink] { visibility: visible !important; }`}</style>
        </noscript>
        <LenisProvider>{children}</LenisProvider>
        <Cursor />
      </body>
    </html>
  );
}
