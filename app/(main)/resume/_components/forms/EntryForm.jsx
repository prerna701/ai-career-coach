// app/(main)/resume/_components/forms/EntryForm.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EntryForm({ label = "Entry", field = "experience", data = {}, setData }) {
  const entries = data[field] || [];

  useEffect(() => {
    // ensure array exists
    if (!Array.isArray(data[field])) {
      setData({ ...data, [field]: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateEntry(index, key, value) {
    const next = [...entries];
    next[index] = { ...next[index], [key]: value };
    setData({ ...data, [field]: next });
  }

  function addEntry() {
    const empty = field === "education"
      ? { degree: "", institution: "", startDate: "", endDate: "", description: "" }
      : field === "projects"
      ? { name: "", role: "", date: "", description: "" }
      : { title: "", company: "", startDate: "", endDate: "", current: false, description: "" };

    setData({ ...data, [field]: [...entries, empty] });
  }

  function removeEntry(i) {
    const next = entries.filter((_, idx) => idx !== i);
    setData({ ...data, [field]: next });
  }

  return (
    <div className="p-4 border rounded bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold mb-2">{label}</h3>
        <Button variant="outline" onClick={addEntry}>+ Add {label}</Button>
      </div>

      <div className="space-y-4 mt-2">
        {(entries || []).map((entry, idx) => (
          <Card key={idx}>
            <CardHeader className="flex justify-between items-center">
              <div className="font-medium">{(entry.title || entry.name || `${label} ${idx + 1}`)}</div>
              <button onClick={() => removeEntry(idx)} className="text-red-600">Remove</button>
            </CardHeader>
            <CardContent className="space-y-2">
              {field === "education" ? (
                <>
                  <Input placeholder="Degree" value={entry.degree || ""} onChange={(e) => updateEntry(idx, "degree", e.target.value)} />
                  <Input placeholder="Institution" value={entry.institution || ""} onChange={(e) => updateEntry(idx, "institution", e.target.value)} />
                </>
              ) : field === "projects" ? (
                <>
                  <Input placeholder="Project name" value={entry.name || ""} onChange={(e) => updateEntry(idx, "name", e.target.value)} />
                  <Input placeholder="Role" value={entry.role || ""} onChange={(e) => updateEntry(idx, "role", e.target.value)} />
                </>
              ) : (
                <>
                  <Input placeholder="Job title" value={entry.title || ""} onChange={(e) => updateEntry(idx, "title", e.target.value)} />
                  <Input placeholder="Company" value={entry.company || ""} onChange={(e) => updateEntry(idx, "company", e.target.value)} />
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input placeholder="Start date (e.g. Jan 2023)" value={entry.startDate || ""} onChange={(e) => updateEntry(idx, "startDate", e.target.value)} />
                <Input placeholder="End date or Present" value={entry.endDate || ""} onChange={(e) => updateEntry(idx, "endDate", e.target.value)} />
              </div>

              <Textarea placeholder="Description / Achievements" value={entry.description || ""} onChange={(e) => updateEntry(idx, "description", e.target.value)} className="h-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
