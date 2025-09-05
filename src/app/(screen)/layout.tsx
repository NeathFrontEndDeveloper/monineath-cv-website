"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { BG } from "@/constant/color";
import { Toaster } from "sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${BG}`}>
      <Toaster richColors position="top-center" />
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <main className="mt-24 mb-16">{children}</main>
      <Footer />
    </div>
  );
}
