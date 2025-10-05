// pages/auth/reset-password.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import axios from "@/lib/axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg(""); 
    setErr("");

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email, otp, newpassword: newPassword
      });
      if (res.data.success) setMsg(res.data.message);
      else setErr(res.data.message);
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                bg-gradient-to-br from-[#0d0d0d] via-[#111111] to-[#1a1a1a] relative overflow-hidden">
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-10 rounded-2xl 
                   bg-[#212121] border-2 border-[#212121]
                   shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Reset Password
        </h1>

        {err && <p className="text-red-400 mb-4 text-center">{err}</p>}
        {msg && <p className="text-green-400 mb-4 text-center">{msg}</p>}

        <form onSubmit={handleReset} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label className="mb-2 text-gray-200">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full bg-[#212121] text-white placeholder-gray-400 
                         rounded-md border-2 border-[#212121] px-3 py-2
                         shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         focus:scale-105 focus:outline-none
                         focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* OTP Input */}
          <div className="flex flex-col gap-2">
            <Label className="mb-2 text-gray-200">OTP</Label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
              className="w-full bg-[#212121] text-white placeholder-gray-400 
                         rounded-md border-2 border-[#212121] px-3 py-2
                         shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         focus:scale-105 focus:outline-none
                         focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* New Password Input with toggle */}
          <div className="flex flex-col gap-2">
            <Label className="mb-2 text-gray-200">New Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full bg-[#212121] text-white placeholder-gray-400 
                           rounded-md border-2 border-[#212121] px-3 py-2 pr-10
                           shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                           transition-transform duration-300
                           focus:scale-105 focus:outline-none
                           focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Update Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full py-3 rounded-md font-semibold text-white 
                         bg-[#212121] border-2 border-[#212121]
                         shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         hover:scale-105
                         hover:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]
                         focus:outline-none"
            >
              Update Password
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
