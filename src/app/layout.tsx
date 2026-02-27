import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillPathX AI - Transform Skills into Career Roadmap",
  description: "AI-powered career roadmap generator for Indian job market. Get realistic salary estimates, placement probability, and personalized career guidance.",
  keywords: ["AI Career", "Skill Roadmap", "Indian Jobs", "Career Planning", "CV Generator", "Placement Probability"],
  authors: [{ name: "SkillPathX AI Team" }],
  icons: {
    icon: "/skillpathx-logo.png",
  },
  openGraph: {
    title: "SkillPathX AI - Transform Skills into Career Roadmap",
    description: "AI-powered career roadmap generator for Indian job market.",
    url: "https://skillpathx.ai",
    siteName: "SkillPathX AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillPathX AI",
    description: "AI-powered career roadmap generator for Indian job market.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
