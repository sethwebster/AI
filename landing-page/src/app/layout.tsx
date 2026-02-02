import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Dev Tools - Expert Agents for Claude Code & Codex",
  description: "Install specialized AI agents into Claude Code and Codex in 30 seconds. Five expert agents for code review, documentation, UX design, and systems architecture.",
  keywords: ["Claude Code", "Codex", "AI agents", "code review", "documentation", "developer tools"],
  openGraph: {
    title: "AI Dev Tools - Expert Agents for Claude Code & Codex",
    description: "One command. Five specialized agents. Better code, faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
