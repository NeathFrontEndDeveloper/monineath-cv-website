import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { BG } from "@/constant/color";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sol Monineath | Front-End Developer & Graphic Designer",
  description:
    "Personal Portfolio of Sol Monineath — a passionate front-end developer and Graphic designer crafting modern, responsive, and visually stunning web experiences. Explore my projects, skills, and creative journey.",
  keywords: [
    "Sol Monineath",
    "Front-End Developer",
    "Graphic Designer",
    "Web Developer",
    "Portfolio",
    "Monineath Portfolio",
  ],
  authors: [{ name: "Sol Monineath" }],
  creator: "Sol Monineath",
  publisher: "Sol Monineath",
  openGraph: {
    title: "Sol Monineath | Front-End Developer & Graphic Designer",
    description:
      "Crafting modern and responsive web experiences with React, Next.js, and Tailwind CSS. Discover my projects and creative journey.",
    url: "https://your-portfolio-url.com",
    siteName: "Sol Monineath Portfolio",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=Sol+Monineath+Portfolio",
        width: 1200,
        height: 630,
        alt: "Sol Monineath Portfolio",
      },
    ],
    locale: "en_US",
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
        <div className={`${BG}`}>
          <div className="fixed top-0 left-0 w-full z-50">
            <Header />
          </div>
          <main className="mt-24">{children}</main>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
