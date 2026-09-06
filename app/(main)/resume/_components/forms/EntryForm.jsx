// app/(main)/resume/_components/forms/EntryForm.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      ? { degree: "", institution: "", location: "", startDate: "", endDate: "", description: "" }
      : field === "projects"
      ? { name: "", link: "", techStack: "", date: "", description: "" }
      : { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" };

    setData({ ...data, [field]: [...entries, empty] });
  }

  function removeEntry(i) {
    const next = entries.filter((_, idx) => idx !== i);
    setData({ ...data, [field]: next });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{label}</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addEntry}>
          + Add {label}
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {(entries || []).map((entry, idx) => (
          <Card key={idx} className="border-muted-foreground/15">
            <CardHeader className="flex flex-row justify-between items-center py-3">
              <div className="font-medium text-sm">{(entry.title || entry.name || `${label} ${idx + 1}`)}</div>
              <button
                type="button"
                onClick={() => removeEntry(idx)}
                className="text-xs font-medium text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {field === "education" ? (
                <>
                  <Input placeholder="Degree (e.g. MCA - Cloud Computing; CGPA: 7.4)" value={entry.degree || ""} onChange={(e) => updateEntry(idx, "degree", e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <Input placeholder="Institution" value={entry.institution || ""} onChange={(e) => updateEntry(idx, "institution", e.target.value)} />
                    <Input placeholder="Location" value={entry.location || ""} onChange={(e) => updateEntry(idx, "location", e.target.value)} />
                  </div>
                </>
              ) : field === "projects" ? (
                <>
                  <Input placeholder="Project name" value={entry.name || ""} onChange={(e) => updateEntry(idx, "name", e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <Input placeholder="Link (optional)" value={entry.link || ""} onChange={(e) => updateEntry(idx, "link", e.target.value)} />
                    <Input placeholder="Tech stack (e.g. React, Node.js, MongoDB)" value={entry.techStack || ""} onChange={(e) => updateEntry(idx, "techStack", e.target.value)} />
                  </div>
                </>
              ) : (
                <>
                  <Input placeholder="Job title" value={entry.title || ""} onChange={(e) => updateEntry(idx, "title", e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <Input placeholder="Company" value={entry.company || ""} onChange={(e) => updateEntry(idx, "company", e.target.value)} />
                    <Input placeholder="Location" value={entry.location || ""} onChange={(e) => updateEntry(idx, "location", e.target.value)} />
                  </div>
                </>
              )}

              {field === "projects" ? (
                <Input placeholder="Date (optional)" value={entry.date || ""} onChange={(e) => updateEntry(idx, "date", e.target.value)} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <Input placeholder="Start date (e.g. Jan 2023)" value={entry.startDate || ""} onChange={(e) => updateEntry(idx, "startDate", e.target.value)} />
                  <Input placeholder="End date or Present" value={entry.endDate || ""} onChange={(e) => updateEntry(idx, "endDate", e.target.value)} />
                </div>
              )}

              <Textarea
                placeholder="One achievement per line — each line becomes its own bullet point"
                value={entry.description || ""}
                onChange={(e) => updateEntry(idx, "description", e.target.value)}
                className="h-28"
              />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
