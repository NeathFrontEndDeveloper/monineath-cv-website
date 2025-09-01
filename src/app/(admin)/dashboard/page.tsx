"use client";

import { useState, useEffect } from "react";
import {
  RefreshCw,
  AlertCircle,
  FolderOpen,
  MessageCircleMore,
  GraduationCap,
} from "lucide-react";

interface DashboardStats {
  totalProjects: number;
  totalContacts?: number;
  totalEducations?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Fetch contacts from Strapi
  const contactsRes = await fetch(`${BASE_URL}/api/contacts`);
  const contactsData = await contactsRes.json();

  // Fetch projects
  const projectsRes = await fetch(`${BASE_URL}/api/projects`);
  const projectsData = await projectsRes.json();

  // Fetch educations
  const educationsRes = await fetch(`${BASE_URL}/api/educations`);
  const educationsData = await educationsRes.json();

  return {
    totalProjects:
      projectsData?.meta?.pagination?.total ?? projectsData?.data?.length ?? 0,
    totalContacts:
      contactsData?.meta?.pagination?.total ?? contactsData?.data?.length ?? 0,
    totalEducations:
      educationsData?.meta?.pagination?.total ??
      educationsData?.data?.length ??
      0,
  };
};

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalContacts: 0,
    totalEducations: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const loadDashboardStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const stats = await fetchDashboardStats();
      setDashboardStats(stats);
    } catch (err) {
      setStatsError(
        err instanceof Error ? err.message : "Failed to load stats"
      );
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

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
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
