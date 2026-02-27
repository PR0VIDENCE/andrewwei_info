import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { Navigation, Footer, ParticleBackground } from "@/components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "andrew wei",
  description: "andrew's grove",
  keywords: ["software engineer", "AI governance", "AI safety", "strategy", "ERA fellow", "GT AISI"],
  authors: [{ name: "Andrew Wei" }],
  openGraph: {
    title: "andrew wei",
    description: "andrew's grove of growing things",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <ParticleBackground />
          <div className="grain" />
          <Navigation />
          <main className="flex-1 pt-16 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
