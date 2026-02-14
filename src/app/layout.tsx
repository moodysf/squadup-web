import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Configure Oswald
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SQUADUP",
  description: "Find your squad. Rule the court.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${oswald.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
      >
        {/* 2. RENDER THE HEADER HERE */}
        <SiteHeader />

        <main className="flex-1">{children}</main>

        {/* 3. OPTIONAL: RENDER FOOTER HERE */}
        <SiteFooter />
      </body>
    </html>
  );
}
