"use client";

import { Header } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar =
    pathname === "/dashboard/form" ||
    (pathname.includes("/dashboard/resume/") &&
      (pathname.endsWith("/clone") || pathname.endsWith("/edit")));
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      open={hideSidebar ? false : undefined}
    >
      <div className="flex min-h-screen w-full">
        <AppSidebar variant="inset" />
        <SidebarInset>
          <Header />
          <main>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
