import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Score Inference | ML Infrastructure Dashboard",
  description: "High-performance production ML inference engine for student score prediction, powered by FastAPI and Scikit-learn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="font-sans min-h-full flex flex-col antialiased bg-[#f8f9fb] text-[#191c1e] selection:bg-[#0052cc] selection:text-white">
        {children}
      </body>
    </html>
  );
}
