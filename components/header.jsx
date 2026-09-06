"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FileText, PenBox, GraduationCap, Settings, ClipboardList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-0 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="p-3 rounded-xl bg-black/50 backdrop-blur-md shadow-md hover:bg-black/70 transition"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={160}
            height={50}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Dashboard shortcut */}
              <Link href="/dashboard">
                <Button>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>

              {/* Manage Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:block">Manage Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href={"/onboarding"} className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      <span>Onboarding Data</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={"/profile"} className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href={"/resume"} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={"/ai-cover-letter"} className="flex items-center gap-2">
                      <PenBox className="h-4 w-4" />
                      <span>Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={"/interview"} className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Interview Prep</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { FileText, PenBox, GraduationCap, Sun, Moon, LogOut, HelpCircle, Settings, KeyRound } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";

// export default function Header() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Fetch current user
//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch("/api/auth/me");
//         if (res.ok) {
//           const data = await res.json();
//           if (data?.id) {
//             setIsAuthenticated(true);
//             setUser(data); // expecting { id, name, profilePic }
//           } else {
//             setIsAuthenticated(false);
//           }
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch {
//         setIsAuthenticated(false);
//       }
//     }
//     checkAuth();
//   }, []);

//   async function handleLogout() {
//     await fetch("/api/auth/logout", { method: "POST" });
//     setIsAuthenticated(false);
//     router.push("/login");
//   }

//   return (
//     <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-0 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="p-3 rounded-xl bg-black/50 backdrop-blur-md shadow-md hover:bg-black/70 transition"
//         >
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={160}
//             height={50}
//             className="h-12 w-auto object-contain"
//           />
//         </Link>

//         <div className="flex items-center gap-3">
//           {/* Theme Toggle (optional quick button) */}
//           {mounted && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               {theme === "dark" ? (
//                 <Sun className="h-5 w-5" />
//               ) : (
//                 <Moon className="h-5 w-5" />
//               )}
//             </Button>
//           )}

//           {isAuthenticated ? (
//             <>
//               {/* Avatar Dropdown */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="rounded-full w-10 h-10 overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition">
//                     <Image
//                       src={user?.profilePic || "/default-avatar.png"}
//                       alt="Profile"
//                       width={40}
//                       height={40}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent className="w-56">
//                   <DropdownMenuLabel>
//                     {user?.name || "Account"}
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />

//                   {/* Profile */}
//                   <DropdownMenuItem asChild>
//                     <Link href={"/profile"} className="flex items-center gap-2">
//                       <Settings className="h-4 w-4" />
//                       <span>Profile</span>
//                     </Link>
//                   </DropdownMenuItem>

//                   {/* Reset Password */}
//                   <DropdownMenuItem asChild>
//                     <Link href={"/reset-password"} className="flex items-center gap-2">
//                       <KeyRound className="h-4 w-4" />
//                       <span>Reset Password</span>
//                     </Link>
//                   </DropdownMenuItem>

//                   {/* Help */}
//                   <DropdownMenuItem asChild>
//                     <Link href={"/help"} className="flex items-center gap-2">
//                       <HelpCircle className="h-4 w-4" />
//                       <span>Help</span>
//                     </Link>
//                   </DropdownMenuItem>

//                   {/* Theme change inside dropdown */}
//                   {mounted && (
//                     <DropdownMenuItem
//                       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                       className="flex items-center gap-2"
//                     >
//                       {theme === "dark" ? (
//                         <Sun className="h-4 w-4" />
//                       ) : (
//                         <Moon className="h-4 w-4" />
//                       )}
//                       <span>Change Theme</span>
//                     </DropdownMenuItem>
//                   )}

//                   <DropdownMenuSeparator />

//                   {/* Logout */}
//                   <DropdownMenuItem
//                     className="text-red-600"
//                     onClick={handleLogout}
//                   >
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </>
//           ) : (
//             <>
//               <Link href="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link href="/register">
//                 <Button>Sign Up</Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }
