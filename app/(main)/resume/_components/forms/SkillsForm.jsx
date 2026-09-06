// app/(main)/resume/_components/forms/SkillsForm.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. React, or a category: Languages & Frameworks: TypeScript, React"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <Button type="button" onClick={addSkill}>Add</Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((s, i) => (
            <span key={i} className="px-3 py-1.5 bg-muted rounded-full flex items-center gap-2 text-sm">
              <span>{s}</span>
              <button type="button" onClick={() => removeSkill(i)} className="text-red-500 hover:text-red-600">✕</button>
            </span>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Tip: prefix with a category and colon (e.g. <span className="font-medium">&quot;Databases: PostgreSQL, MongoDB&quot;</span>) to group skills on the resume, like the reference format.
        </p>
      </CardContent>
    </Card>
  );
}
