"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/axios";
import { AuthField, AuthPasswordField, AuthSubmitButton } from "@/components/auth/auth-field";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data.step === "done") {
        router.push("/dashboard");
        router.refresh();
      } else if (res.data.step === "otp") {
        localStorage.setItem("loginEmail", email);
        router.push("/verify-login-otp");
      } else {
        setError("Unexpected response");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Sign in</h1>
      <p className="mt-2 text-sm text-[#9298A3]">
        Enter your email and password to continue.
      </p>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <AuthPasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        <AuthSubmitButton disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </AuthSubmitButton>

        <Link
          href="/request-reset-otp"
          className="text-center text-sm text-indigo-400 hover:text-indigo-300 transition"
        >
          Forgot your password?
        </Link>
      </form>

      <p className="mt-6 text-center text-sm text-[#9298A3]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
          Sign up
        </Link>
      </p>

      <button
        type="button"
        onClick={() => {
          setEmail("demo@example.com");
          setPassword("Demo@1234");
        }}
        className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left hover:bg-white/[0.06] transition"
      >
        <div className="text-sm font-semibold text-white">Just want to look around?</div>
        <p className="mt-1 text-xs text-[#9298A3]">
          Click to fill in a demo account — no signup needed.
        </p>
      </button>
    </>
  );
}
