"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, logoutUser, type User } from "@/lib/auth";
import {
  Brain,
  BarChart3,
  Heart,
  BookOpen,
  Settings,
  User as UserIcon,
  Calendar,
  TrendingUp,
  Target,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Overview of your emotional journey",
  },
  {
    name: "EQ Assessment",
    href: "/assessment",
    icon: Brain,
    description: "Take your emotional intelligence test",
  },
  {
    name: "Emotional Tracking",
    href: "/tracking",
    icon: Heart,
    description: "Log and track daily emotions",
  },
  {
    name: "Exercises",
    href: "/exercises",
    icon: BookOpen,
    description: "Practice emotional intelligence skills",
  },
  {
    name: "Insights",
    href: "/insights",
    icon: TrendingUp,
    description: "Personalized insights and analytics",
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
    description: "Set and track emotional goals",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    description: "View emotional patterns over time",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
    description: "Manage your profile and settings",
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">EQ360</h1>
              <p className="text-xs text-muted-foreground">
                Your journey to self-awareness
              </p>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>
                  {user
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.profession || "Professional"}
                </p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </Badge>
              </div>
            </div>
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
