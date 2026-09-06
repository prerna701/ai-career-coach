"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition";

export function AuthField({ label, className, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm font-medium text-white">{label}</Label>}
      <Input {...props} className={cn(inputClass, className)} />
    </div>
  );
}

export function AuthPasswordField({ label = "Password", className, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm font-medium text-white">{label}</Label>}
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          {...props}
          className={cn(inputClass, "pr-10", className)}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export function AuthSubmitButton({ children, className, ...props }) {
  return (
    <Button
      type="submit"
      className={cn(
        "w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
