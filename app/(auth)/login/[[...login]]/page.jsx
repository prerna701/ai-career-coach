"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "@/lib/axios";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data.step === "otp") {
        localStorage.setItem("loginEmail", email);
        router.push("/verify-login-otp");
      } else {
        setError("Unexpected response");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                bg-gradient-to-br from-[#0d0d0d] via-[#111111] to-[#1a1a1a] relative overflow-hidden">
      {/* optional overlay for subtle glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-10 rounded-2xl 
                   bg-[#212121] border-2 border-[#212121]
                   shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Login
        </h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label className="mb-4 text-gray-200">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full bg-[#212121] text-white placeholder-gray-400 
                         rounded-md border-2 border-[#212121] px-3 py-2
                         shadow-[6px_6px_10px_rgba(0,0,0,1),_1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         focus:scale-105 focus:outline-none
                         focus:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* Password Input with toggle */}
          <div className="flex flex-col gap-2">
            <Label className="mb-4 text-gray-200">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full bg-[#212121] text-white placeholder-gray-400 
                           rounded-md border-2 border-[#212121] px-3 py-2 pr-10
                           shadow-[6px_6px_10px_rgba(0,0,0,1),_1px_1px_10px_rgba(255,255,255,0.6)]
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

          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full py-3 rounded-md font-semibold text-white 
                         bg-[#212121] border-2 border-[#212121]
                         shadow-[6px_6px_10px_rgba(0,0,0,1),_1px_1px_10px_rgba(255,255,255,0.6)]
                         transition-transform duration-300
                         hover:scale-105
                         hover:shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6),_inset_2px_2px_10px_rgba(0,0,0,1),_inset-1px_-1px_5px_rgba(255,255,255,0.6)]
                         focus:outline-none"
            >
              Login
            </Button>
          </motion.div>

          {/* Forgot Password & Register Links */}
          <div className="flex justify-between mt-4">
            <Link
              href="/request-reset-otp"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition"
            >
              Forgot Password?
            </Link>
            <Link
              href="/register"
              className="text-sm text-green-400 hover:text-green-300 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}