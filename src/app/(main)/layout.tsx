import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "PortfolioForge - Build Your Portfolio in Minutes",
  description:
    "Create a stunning developer portfolio without writing a single line of code. Fill in your details, preview live, and publish instantly.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
