import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "~/lib/orpc/server";
import { cn } from "~/lib/utils";
import "./globals.css";
import { RootLayoutClient } from './layout.client';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freetup",
  description: "A platform for creating and managing events",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-svh"
        )}
      >
    <RootLayoutClient>
        {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
