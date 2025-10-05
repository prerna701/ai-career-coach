// app/(main)/resume/_components/forms/SummaryForm.jsx
"use client";

import { Textarea } from "@/components/ui/textarea";

export default function SummaryForm({ data = {}, setData }) {
  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-semibold mb-2">Professional Summary</h3>
      <Textarea
        className="h-28"
        placeholder="Two to four concise lines focusing on achievements and impact."
        value={data.summary || ""}
        onChange={(e) => setData({ ...data, summary: e.target.value })}
      />
      <p className="text-xs text-gray-500 mt-2">Tip: use action verbs and include one quantifiable result.</p>
    </div>
  );
}
