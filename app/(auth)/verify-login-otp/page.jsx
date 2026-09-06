"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { AuthField, AuthSubmitButton } from "@/components/auth/auth-field";

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

  if (!email) {
    return (
      <p className="text-center text-sm text-red-400">
        No email found. Please login first.
      </p>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Verify it&apos;s you</h1>
      <p className="mt-2 text-sm text-[#9298A3]">
        Enter the code sent to <span className="font-medium text-white">{email}</span>.
      </p>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleVerify} className="mt-8 flex flex-col gap-5">
        <AuthField
          label="OTP"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />

        <AuthSubmitButton disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </AuthSubmitButton>
      </form>
    </>
  );
}
