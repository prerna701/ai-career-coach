// app/(main)/resume/_components/forms/SummaryForm.jsx
"use client";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryForm({ data = {}, setData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          className="h-28"
          placeholder="Two to four concise lines focusing on achievements and impact."
          value={data.summary || ""}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
        />
        <p className="text-xs text-muted-foreground mt-2">Tip: use action verbs and include one quantifiable result.</p>
      </CardContent>
    </Card>
  );
}
