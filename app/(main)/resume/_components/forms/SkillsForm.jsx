// app/(main)/resume/_components/forms/SkillsForm.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SkillsForm({ data = {}, setData }) {
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : []);
  const [input, setInput] = useState("");

  function addSkill() {
    if (!input.trim()) return;
    const next = [...skills, input.trim()];
    setData({ ...data, skills: next });
    setInput("");
  }

  function removeSkill(i) {
    const next = skills.filter((_, idx) => idx !== i);
    setData({ ...data, skills: next });
  }

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-semibold mb-2">Skills</h3>
      <div className="flex gap-2">
        <Input placeholder="Add skill (press Enter or click Add)" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
        <Button onClick={addSkill}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {skills.map((s, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
            <span>{s}</span>
            <button type="button" onClick={() => removeSkill(i)} className="text-red-500">✕</button>
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-2">Tip: include hard skills and tools first (e.g. React, Next.js, PostgreSQL).</p>
    </div>
  );
}
