"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">{children}</main>
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p>Made by Prerna Arora</p>
        </div>
      </footer>
    </>
  );
}
