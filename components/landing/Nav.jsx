"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Arrow, Menu, Close } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, PenBox, GraduationCap, ChevronDown, LayoutDashboard, User as UserIcon, LogOut, Settings, ClipboardList } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "AI Insights", href: "#insights" },
  { label: "Resume", href: "#resume" },
  { label: "Interview", href: "#interview" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(!!data?.id);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.push("/login");
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/85 border-b-[#1C2028]/90 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
            : "bg-[#0A0A0A]/55 border-b-[#1C2028]/60"
        } backdrop-blur-xl border-b`}
      >
        <div className="flex items-center justify-between px-16 sm:px-32 lg:px-48 h-16 sm:h-[68px]">
          <Link href="/" className="flex items-center gap-2.5 pl-1">
            <Image src="/logo.png" alt="Logo" width={140} height={44} className="h-9 sm:h-10 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-[15.5px] text-[#C9D0DB] hover:text-white transition-colors rounded-lg hover:bg-white/[0.03]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="hidden sm:inline-flex btn-primary !py-2.5 !px-4 !text-[15px]">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden sm:inline-flex items-center gap-1.5 text-[15.5px] text-[#C9D0DB] hover:text-white px-3.5 py-2 rounded-lg transition-colors border border-[#1C2028]">
                      <UserIcon className="h-4 w-4" />
                      Account
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/onboarding" className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        <span>Onboarding Data</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/resume" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Build Resume</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/ai-cover-letter" className="flex items-center gap-2">
                        <PenBox className="h-4 w-4" />
                        <span>Cover Letter</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/interview" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Interview Prep</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex text-[15.5px] text-[#C9D0DB] hover:text-white px-3.5 py-2 rounded-lg transition-colors"
                >
                  Log in
                </Link>
                <Link href="/register" className="btn-primary hidden sm:inline-flex !py-2.5 !px-4 !text-[15px]">
                  Get Started <Arrow size={14} />
                </Link>
              </>
            )}
            <button
              className="lg:hidden text-white/90 p-2.5 rounded-lg border border-[#1C2028] hover:bg-white/[0.03]"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-[#1C2028] p-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3.5 py-3 text-[15.5px] text-[#C9D0DB] hover:text-white hover:bg-white/[0.03] rounded-lg"
              >
                {l.label}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary w-full justify-center mt-1">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="btn-ghost w-full justify-center mt-1 text-red-400"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost w-full justify-center mt-1">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn-primary w-full justify-center mt-1">
                  Get Started <Arrow size={14} />
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
