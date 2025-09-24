"use client";

import { SidebarTrigger } from "../ui/sidebar";
// import { ThemeToggle } from "@/Theme/ThemeToggle";
import NotificationIcon from "./notification-icon";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
      <div className="w-full flex items-center justify-between">
        <SidebarTrigger className="hover:bg-gray-100 transition-colors" />
        <div className="flex items-center space-x-4">
          {/* <ThemeToggle size="lg" variant="outline" /> */}
          <NotificationIcon />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
