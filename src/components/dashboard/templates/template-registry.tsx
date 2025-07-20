import { TemplateProps } from "@/types/template";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import SidebarTemplate from "../templates/sidebar-template";
import StandardTemplate from "../templates/standard-template";
import CompactTemplate from "./compact-template";
import ModernTemplate from "./modern-template";

export interface ResumeTemplateProps {
  id: string;
  name: string;
  component: ForwardRefExoticComponent<TemplateProps & RefAttributes<HTMLDivElement>>;
  thumbnail: string;
}

// Template registry
export const resumeTemplates: ResumeTemplateProps[] = [
  {
    id: "1",
    name: "Classic",
    component: StandardTemplate,
    thumbnail: "/path/to/thumbnail1.jpg",
  },
  {
    id: "2",
    name: "Sidebar",
    component: SidebarTemplate,
    thumbnail: "/path/to/thumbnail1.jpg",
  },
  {
    id: "3",
    name: "Modern",
    component: ModernTemplate,
    thumbnail: "/path/to/thumbnail1.jpg",
  },
  {
    id: "4",
    name: "Compact",
    component: CompactTemplate,
    thumbnail: "/path/to/thumbnail1.jpg",
  },
];

export function getTemplateTheme(id: string) {
  return templateThemes.find((theme) => theme.id === id) || templateThemes[0];
}

export interface TemplateTheme {
  id: string;
  name: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    sidebarTextColor: string;
    sidebarBackgroundColor?: string;
    mainTextColor: string;
  };
}

export const templateThemes: TemplateTheme[] = [
  {
    id: "1",
    name: "Elegant Black",
    theme: {
      primaryColor: "#000000",
      secondaryColor: "#555555",
      sidebarTextColor: "#ffffff",
      mainTextColor: "#999999",
    },
  },
  {
    id: "2",
    name: "Classic Blue",
    theme: {
      primaryColor: "#121f7d",
      secondaryColor: "#5c6b9c",
      sidebarTextColor: "#ffffff",
      mainTextColor: "#6b7280",
    },
  },
  {
    id: "3",
    name: "Modern Sky",
    theme: {
      primaryColor: "#2563eb", // Tailwind blue-600
      secondaryColor: "#60a5fa", // Tailwind blue-400
      sidebarTextColor: "#ffffff",
      sidebarBackgroundColor: "#1e3a8a", // Tailwind blue-900
      mainTextColor: "#475569", // slate-600
    },
  },
  {
    id: "4",
    name: "Forest Green",
    theme: {
      primaryColor: "#065f46", // emerald-900
      secondaryColor: "#34d399", // emerald-400
      sidebarTextColor: "#ffffff",
      mainTextColor: "#4b5563", // gray-700
    },
  },
  {
    id: "5",
    name: "Sunset",
    theme: {
      primaryColor: "#c2410c", // orange-700
      secondaryColor: "#fb923c", // orange-400
      sidebarTextColor: "#ffffff",
      sidebarBackgroundColor: "#7c2d12", // orange-900
      mainTextColor: "#374151", // gray-800
    },
  },
  {
    id: "6",
    name: "Charcoal",
    theme: {
      primaryColor: "#1f2937", // gray-800
      secondaryColor: "#6b7280", // gray-500
      sidebarTextColor: "#ffffff",
      mainTextColor: "#9ca3af", // gray-400
    },
  },
  {
    id: "7",
    name: "Lavender",
    theme: {
      primaryColor: "#7c3aed", // violet-600
      secondaryColor: "#a78bfa", // violet-400
      sidebarTextColor: "#ffffff",
      sidebarBackgroundColor: "#4c1d95", // violet-900
      mainTextColor: "#4b5563", // gray-700
    },
  },
  {
    id: "8",
    name: "Ocean",
    theme: {
      primaryColor: "#0e7490", // cyan-700
      secondaryColor: "#155e75", // cyan-800 (muted, balanced contrast)
      sidebarTextColor: "#e0f2f1", // slightly dimmed (cyan-50 to cyan-100)
      sidebarBackgroundColor: "#164e63", // cyan-900
      mainTextColor: "#334155", // slate-700
    },
  },
  {
    id: "9",
    name: "Rose Gold",
    theme: {
      primaryColor: "#b76e79", // muted rose
      secondaryColor: "#f4c2c2", // light pinkish highlight
      sidebarTextColor: "#ffffff",
      sidebarBackgroundColor: "#5a2a2a", // deep rose-brown
      mainTextColor: "#3f3f46", // zinc-700
    },
  },
];
