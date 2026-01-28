import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Menu,
  X,
  GitBranch,
  Users,
  Award,
  BarChart3,
  Search,
  TrendingUp,
  AlertCircle,
  ClipboardList,
  LogOut } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
{ label: "SIPOC", href: "/sipoc", icon: GitBranch },
{ label: "Process Map", href: "/process-map", icon: GitBranch },
{ label: "Metrics", href: "/metrics", icon: BarChart3 },
{ label: "Root Cause", href: "/root-cause", icon: Search },
{ label: "Improvements", href: "/improvements", icon: TrendingUp },
{ label: "Attendance", href: "/attendance", icon: Users },
{ label: "Skills Matrix", href: "/skills-matrix", icon: Award },
{ label: "Control Plan", href: "/control-plan", icon: ClipboardList }];


export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 w-full" style={{ backgroundColor: "#1d4ed8" }}>
        <div className="flex h-20 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-blue-700">

            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/IMG_0910.jpeg"
              alt="Philtech Logo"
              width={32}
              height={32}
              className="h-8 w-auto" />

            <div className="flex flex-col">
              <span className="text-lg font-bold text-cyan-300 leading-tight" style={{ textAlign: "center", fontSize: "24px" }}>
                Philtech
              </span>
              <span className="text-[9px] font-semibold text-blue-200 tracking-wider leading-tight">
                OPERATIONAL EXCELLENCE TOOL
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-white hover:bg-blue-700"
              title="Logout">

              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen &&
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={() => setSidebarOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r bg-white dark:bg-gray-900 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
        }>

        <div className="flex h-full flex-col">
          {/* Logo - Desktop Only */}
          <div className="hidden lg:flex items-center gap-3 border-b px-6 py-5">
            <Image
              src="/IMG_0910.jpeg"
              alt="Philtech Logo"
              width={40}
              height={40}
              className="h-10 w-auto" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 leading-tight">
                Philtech
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider leading-tight">
                OPERATIONAL EXCELLENCE
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
              router.pathname === item.href ||
              item.href === "/sipoc" && router.pathname === "/";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  isActive ?
                  "bg-blue-600 text-white shadow-lg shadow-blue-600/30" :
                  "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-800"}`
                  }>

                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>);

            })}
          </nav>

          {/* Footer - Desktop Only */}
          <div className="hidden lg:block border-t px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  OP
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Operations
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Admin
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-600 dark:text-slate-300"
                title="Logout">

                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Desktop Header */}
        <header className="hidden lg:flex sticky top-0 z-30 h-20 items-center justify-between px-8" style={{ backgroundColor: "#1d4ed8" }}>
          <div className="flex items-center gap-4">
            <Image
              src="/IMG_0910.jpeg"
              alt="Philtech Logo"
              width={48}
              height={48}
              className="h-12 w-auto" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-cyan-300 leading-tight">
                Philtech
              </span>
              <span className="text-xs font-semibold text-blue-200 tracking-widest leading-tight">
                OPERATIONAL EXCELLENCE TOOL
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeSwitch />
            <div className="h-6 w-px bg-blue-500" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden xl:block">
                <div className="text-sm font-semibold text-white">
                  Operations Admin
                </div>
                <div className="text-xs text-blue-200">
                  Philtech
                </div>
              </div>
              <Link href="/profile">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                  OP
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-blue-700 gap-2">

                <LogOut className="h-4 w-4" />
                <span className="hidden xl:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>);

}