import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Journal of First-Year Writing | CUNY",
  description: "Founded in 1975 by Mina Shaughnessy, the Journal of First-Year Writing is a premier academic journal dedicated to research, theory, and pedagogy in first-year writing and composition studies.",
  keywords: "first-year writing, composition, rhetoric, writing pedagogy, CUNY, Mina Shaughnessy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
