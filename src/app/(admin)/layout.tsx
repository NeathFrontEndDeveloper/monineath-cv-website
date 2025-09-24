"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import AppHeader from "@/components/admin/app-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 overflow-auto p-8 bg-gray-100 ">
            {/* <LoadingScreen /> */}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
