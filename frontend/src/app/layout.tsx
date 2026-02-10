import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Full Stack AI Engineer",
    template: "%s | Portfolio",
  },
  description:
    "Professional portfolio showcasing full-stack development and AI engineering expertise. Specializing in Next.js, Python, and agentic AI systems.",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "Python",
    "FastAPI",
    "OpenAI",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Portfolio Owner" }],
  creator: "Portfolio Owner",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.vercel.app",
    siteName: "Portfolio",
    title: "Full Stack AI Engineer Portfolio",
    description:
      "Professional portfolio showcasing full-stack development and AI engineering expertise.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack AI Engineer Portfolio",
    description:
      "Professional portfolio showcasing full-stack development and AI engineering expertise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
