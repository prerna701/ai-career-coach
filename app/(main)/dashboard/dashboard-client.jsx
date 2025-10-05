"use client";

import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function DashboardClient({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Account Verified: {user.isAccountVerified ? "Yes" : "No"}</p>
      <Button onClick={handleLogout} className="mt-4">Logout</Button>
    </div>
  );
}
