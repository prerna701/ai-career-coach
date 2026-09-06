// app/(main)/resume/_components/forms/ContactForm.jsx
"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactForm({ data = {}, setData }) {
  const contact = data.contact || {};

  function update(field, value) {
    setData({ ...data, contact: { ...contact, [field]: value } });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
      <div className="grid grid-cols-1 gap-3 mb-3">
        <Input placeholder="Full name" value={contact.fullName || ""} onChange={(e) => update("fullName", e.target.value)} />
        <Input
          placeholder="Title / tagline (e.g. Full Stack Developer | MERN | React.js · Next.js · Node.js · NestJS)"
          value={contact.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input placeholder="Email" value={contact.email || ""} onChange={(e) => update("email", e.target.value)} />
        <Input placeholder="Mobile" value={contact.mobile || ""} onChange={(e) => update("mobile", e.target.value)} />
        <Input placeholder="Location (e.g. Chandigarh, India)" value={contact.location || ""} onChange={(e) => update("location", e.target.value)} />
        <Input placeholder="LinkedIn" value={contact.linkedin || ""} onChange={(e) => update("linkedin", e.target.value)} />
        <Input placeholder="GitHub" value={contact.github || ""} onChange={(e) => update("github", e.target.value)} />
        <Input placeholder="Portfolio / Website" value={contact.portfolio || ""} onChange={(e) => update("portfolio", e.target.value)} />
      </div>
      </CardContent>
    </Card>
  );
}
