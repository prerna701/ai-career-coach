"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/axios";
import { AuthField, AuthPasswordField, AuthSubmitButton } from "@/components/auth/auth-field";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      if (res.data.success) {
        localStorage.setItem("registerEmail", email);
        router.push("/verify-otp");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Create your account</h1>
      <p className="mt-2 text-sm text-[#9298A3]">
        Start building your career toolkit in minutes.
      </p>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-5">
        <AuthField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />

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
          placeholder="Create a password"
        />

        <AuthSubmitButton disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </AuthSubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-[#9298A3]">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
          Sign in
        </Link>
      </p>
    </>
  );
}
