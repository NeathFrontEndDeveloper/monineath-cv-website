"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import NotificationIcon from "@/components/admin/notification-icon";
import LoadingScreen from "@/components/shared/Loading";

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
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
            <div className="w-full flex items-center justify-between">
              <SidebarTrigger className="hover:bg-gray-100 transition-colors" />
              <NotificationIcon />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-8 bg-gray-100">
            <LoadingScreen />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
