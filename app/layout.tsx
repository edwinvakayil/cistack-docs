import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cistack | Automated GitHub Actions for Your Stack",
  description: "cistack deep-scans your repository to generate production-ready GitHub Actions workflows instantly. Supports 30+ frameworks and 10+ platforms.",
  keywords: ["github actions", "automation", "ci/cd", "devops", "workflow generator", "nextjs", "docker", "vercel", "aws", "firebase"],
  authors: [{ name: "Edwin", url: "https://www.edwinvakayil.info/" }],
  openGraph: {
    title: "cistack | Automated GitHub Actions for Your Stack",
    description: "Deep-scans your codebase to generate production-grade CI/CD pipelines in seconds.",
    url: "https://cistack.edwinvakayil.info",
    siteName: "cistack",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cistack | Professional Workflow Automation",
    description: "Generate hardened GitHub Actions for any stack instantly.",
    creator: "@edwinvakayil",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
