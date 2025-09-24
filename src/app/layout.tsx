import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/Theme/ThemeProvider";

// Import Fira Code
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sol Monineath | Front-End Developer & Graphic Designer",
  description:
    "Personal Portfolio of Sol Monineath — a passionate front-end developer and Graphic designer crafting modern, responsive, and visually stunning web experiences. Explore my projects, skills, and creative journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable}`}>
      <body className="antialiased">
        {/* <ThemeProvider>{children}</ThemeProvider> */}
        {children}
      </body>
    </html>
  );
}
