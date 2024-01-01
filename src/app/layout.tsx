import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/_components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tweex",
  description: "A twitter clone built with Next.js, typescipt, and Prisma",
};

export default function RootLayout({
  children,
  flow,
}: {
  children: React.ReactNode;
  flow: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          {children}
          {flow}
          <Toaster />
        </body>
    </html>
  );
}
