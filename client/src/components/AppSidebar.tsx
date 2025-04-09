
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Building,
  FileText,
  Settings,
  Heart,
  Home,
  ChevronLeft,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NAVBAR_HEIGHT } from "@/lib/constants";

interface AppSidebarProps {
  userType: "manager" | "tenant";
}

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          {
            icon: FileText,
            label: "Applications",
            href: "/managers/applications",
          },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          {
            icon: FileText,
            label: "Applications",
            href: "/tenants/applications",
          },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  return (
    <Sidebar
      collapsible="icon"
      side="left"
      className="border-r border-gray-200 bg-white shadow-sm"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader className="px-4 py-3">
        <div
          className={cn(
            "flex items-center justify-between",
            !open && "justify-center"
          )}
        >
          {open ? (
            <>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                {userType === "manager" ? "Manager Portal" : "Renter Portal"}
              </h1>
              <button
                onClick={toggleSidebar}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Expand sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "my-1 transition-all duration-200",
                    open ? "px-4 py-2.5" : "justify-center py-2.5"
                  )}
                >
                  <Link href={link.href} className="w-full">
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isActive
                            ? "text-primary"
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      />
                      {open && (
                        <span
                          className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-primary" : "text-gray-700"
                          )}
                        >
                          {link.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
