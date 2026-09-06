"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/axios";
import { AuthField, AuthSubmitButton } from "@/components/auth/auth-field";

export default function RequestResetOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/send-reset-otp", { email });
      if (res.data.success) {
        setMessage(res.data.message);
        localStorage.setItem("resetEmail", email);
        setTimeout(() => router.push("/reset-password"), 1000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Reset your password</h1>
      <p className="mt-2 text-sm text-[#9298A3]">
        Enter your email and we&apos;ll send you a one-time code.
      </p>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}

      <form onSubmit={handleRequest} className="mt-8 flex flex-col gap-5">
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <AuthSubmitButton disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </AuthSubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-[#9298A3]">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
          Sign in
        </Link>
      </p>
    </>
  );
}
