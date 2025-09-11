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
    <div className={`${BG} flex min-h-screen flex-col`}>
      {/* Notifications */}
      <Toaster richColors position="top-center" />

      {/* Header (fixed) */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Main content with padding to avoid overlap */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
