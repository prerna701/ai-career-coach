"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { AuthField, AuthSubmitButton } from "@/components/auth/auth-field";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const email = typeof window !== "undefined" ? localStorage.getItem("registerEmail") : "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/verify-otp", { otp });
      if (res.data.success) {
        localStorage.removeItem("registerEmail");
        router.push("/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setInfo("");
    try {
      const res = await axios.post("/api/auth/send-verify-otp");
      if (res.data.success) {
        setInfo("A new code has been sent to your email.");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <p className="text-center text-sm text-red-400">
        No email found. Please register first.
      </p>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Verify your email</h1>
      <p className="mt-2 text-sm text-[#9298A3]">
        Enter the code sent to <span className="font-medium text-white">{email}</span>.
      </p>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {info && <p className="mt-4 text-sm text-green-400">{info}</p>}

      <form onSubmit={handleVerify} className="mt-8 flex flex-col gap-5">
        <AuthField
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter OTP"
        />

        <AuthSubmitButton disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </AuthSubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-[#9298A3]">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="font-medium text-indigo-400 hover:text-indigo-300 transition disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend code"}
        </button>
      </p>
    </>
  );
}
