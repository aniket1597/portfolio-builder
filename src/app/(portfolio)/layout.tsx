import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
