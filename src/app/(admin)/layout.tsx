import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import NotificationIcon from "@/components/admin/notification-icon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard | Sol Monineath Portfolio",
  description:
    "Administrative dashboard for managing Sol Monineath portfolio content, projects, and site settings.",
  robots: "noindex, nofollow", // Prevent search engine indexing of admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className={`
        min-h-screen 
        bg-gradient-to-br from-[#F5F0E6] to-[#E8DCC0] 
        font-sans 
        antialiased
        ${geistSans.variable} 
        ${geistMono.variable}
      `}
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
                <div className="w-full flex items-center justify-between">
                  <SidebarTrigger className="hover:bg-gray-100 transition-colors" />

                  {/* button notification */}
                  <NotificationIcon />
                </div>
              </header>
              <main className="flex-1 overflow-auto p-8 bg-gray-100">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
