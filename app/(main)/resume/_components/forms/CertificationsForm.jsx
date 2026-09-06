// app/(main)/resume/_components/forms/CertificationsForm.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CertificationsForm({ data = {}, setData }) {
  const certifications = Array.isArray(data.certifications) ? data.certifications : [];
  const [input, setInput] = useState("");

  function addCertification() {
    if (!input.trim()) return;
    setData({ ...data, certifications: [...certifications, input.trim()] });
    setInput("");
  }

  function removeCertification(i) {
    setData({ ...data, certifications: certifications.filter((_, idx) => idx !== i) });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. React.js Certification - Infosys Springboard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
          />
          <Button type="button" onClick={addCertification}>Add</Button>
        </div>

        <div className="mt-3 space-y-2">
          {certifications.map((c, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
              <span>{c}</span>
              <button type="button" onClick={() => removeCertification(i)} className="text-red-500 hover:text-red-600">✕</button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
