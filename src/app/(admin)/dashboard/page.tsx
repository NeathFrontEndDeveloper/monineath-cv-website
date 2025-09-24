"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  AlertCircle,
  FolderOpen,
  MessageCircleMore,
  GraduationCap,
  BellRing,
} from "lucide-react";
import { DashboardStats } from "@/types/dashboard-type";
import api from "@/lib/request";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalContacts: 0,
    totalEducations: 0,
    totalNotifications: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const fetchDashboardStats = async (): Promise<DashboardStats> => {
    // Fetch contacts
    const contactsRes = await api.get("/contacts");
    const contactsData = contactsRes.data;

    // Fetch projects
    const projectsRes = await api.get("/projects");
    const projectsData = projectsRes.data;

    // Fetch educations
    const educationsRes = await api.get("/educations");
    const educationsData = educationsRes.data;

    // Fetch notifications
    const notificationRes = await api.get("/notifications");
    const notificationsData = notificationRes.data;

    return {
      totalProjects:
        projectsData?.meta?.pagination?.total ??
        projectsData?.data?.length ??
        0,
      totalContacts:
        contactsData?.meta?.pagination?.total ??
        contactsData?.data?.length ??
        0,
      totalEducations:
        educationsData?.meta?.pagination?.total ??
        educationsData?.data?.length ??
        0,
      totalNotifications:
        notificationsData?.meta?.pagination?.total ??
        notificationsData?.data?.length ??
        0,
    };
  };

  const loadDashboardStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const stats = await fetchDashboardStats();
      setDashboardStats(stats);
    } catch (error) {
      console.log(error, "===dashboard state error===");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardStats();
  }, [loadDashboardStats]);

  const cardData = [
    {
      title: "Total Projects",
      value: statsLoading
        ? "..."
        : statsError
        ? "Error"
        : dashboardStats.totalProjects.toString(),
      icon: FolderOpen,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Contacts",
      value: statsLoading
        ? "..."
        : statsError
        ? "Error"
        : dashboardStats.totalContacts?.toString() || "0",
      icon: MessageCircleMore,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Educations",
      value: statsLoading
        ? "..."
        : statsError
        ? "Error"
        : dashboardStats.totalEducations?.toString() || "0",
      icon: GraduationCap,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Notifications",
      value: statsLoading
        ? "..."
        : statsError
        ? "Error"
        : dashboardStats.totalNotifications?.toString() || "0",
      icon: BellRing,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`${card.bgColor} border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold ${card.textColor}`}>
                    {statsLoading && (
                      <RefreshCw className="h-5 w-5 animate-spin inline" />
                    )}
                    {!statsLoading && !statsError && card.value}
                    {statsError && (
                      <span className="text-red-500 text-base">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        {statsError}
                      </span>
                    )}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-full`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
