"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LogOut,
  FolderOpen,
  MessageCircleMore,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logout } from "@/store/auth/useAuth";

// Main navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    icon: FolderOpen,
    url: "/project-admin",
  },
  {
    title: "Education",
    icon: GraduationCap,
    url: "/education-admin",
  },
  {
    title: "Contact",
    icon: MessageCircleMore,
    url: "/contact-admin",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActiveLink = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-semibold text-2xl">Sol Monineath</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveLink(item.url!)}
                    className="group w-full px-3 py-2 rounded-md transition-colors hover:bg-blue-100 hover:text-blue-700 data-[active=true]:bg-gray-200 data-[active=true]:text-blue-500 data-[active=true]:border-r-4 data-[active=true]:border-blue-500"
                  >
                    <Link
                      href={item.url!}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4 transition-colors group-data-[active=true]:text-blue-500" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={Logout}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* User Info */}
        <div className="mt-4 px-3 py-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-medium">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Admin
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin31@jaya-capital.local
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
