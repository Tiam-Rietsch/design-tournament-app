"use client"

import { CalendarDays, LayoutDashboard, LogOut, Shield, Trophy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar className="border-r border-border/50 bg-gradient-to-b from-white to-muted/30 shadow-sm">
      <SidebarHeader className="flex items-center px-4 py-2 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary animate-pulse-glow" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-esports-gradient animate-gradient-shift">
            TournaMate
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/")}
              className="transition-all duration-200 hover:bg-primary/10 font-medium"
            >
              <Link href="/" className="group">
                <LayoutDashboard className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/tournaments")}
              className="transition-all duration-200 hover:bg-primary/10 font-medium"
            >
              <Link href="/tournaments" className="group">
                <Trophy className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Tournaments</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/matches")}
              className="transition-all duration-200 hover:bg-primary/10 font-medium"
            >
              <Link href="/matches" className="group">
                <Shield className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Matches</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/calendar")}
              className="transition-all duration-200 hover:bg-primary/10 font-medium"
            >
              <Link href="/calendar" className="group">
                <CalendarDays className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Calendar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/30">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="transition-all duration-200 hover:bg-destructive/10">
              <button className="w-full group">
                <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
