"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import { AuthField, AuthSubmitButton } from "@/components/auth/auth-field";

export default function RequestResetPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/send-reset-otp", { email });
      if (res.data.success) setMsg(res.data.message);
      else setErr(res.data.message);
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
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

      {err && <p className="mt-4 text-sm text-red-400">{err}</p>}
      {msg && <p className="mt-4 text-sm text-emerald-400">{msg}</p>}

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
