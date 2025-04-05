import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEC Management Software",
  description: "A SAAS for AEC firm management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
