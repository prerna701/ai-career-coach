"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "@/lib/axios";

export default function VerifyLoginOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const email = typeof window !== "undefined" ? localStorage.getItem("loginEmail") : "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/verify-login-otp", { email, otp });
      if (res.data.success) {
        localStorage.removeItem("loginEmail");
        router.push("/dashboard");
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) return <p className="text-center mt-20 text-red-500">No email found. Please login first.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center 
                bg-gradient-to-br from-[#0d0d0d] via-[#111111] to-[#1a1a1a] relative overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-10 rounded-2xl 
                   bg-[#212121] border-2 border-[#212121]
                   shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Verify OTP</h1>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-200 mb-2">
              OTP sent to <span className="text-white font-medium">{email}</span>
            </label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full bg-[#212121] text-white placeholder-gray-400 
                         rounded-md border-2 border-[#212121] px-3 py-2
                         shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         focus:scale-105 focus:outline-none
                         focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-semibold text-white 
                         bg-[#212121] border-2 border-[#212121]
                         shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         hover:scale-105
                         hover:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]
                         focus:outline-none"
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
