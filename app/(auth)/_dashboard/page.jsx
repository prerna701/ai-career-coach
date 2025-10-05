"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/data");
        if (res.data.success) {
          setUser(res.data.userData);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Account Verified: {user.isAccountVerified ? "Yes" : "No"}</p>
      <Button onClick={handleLogout} className="mt-4">Logout</Button>
    </div>
  );
}

