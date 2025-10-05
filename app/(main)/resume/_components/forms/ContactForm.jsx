// app/(main)/resume/_components/forms/ContactForm.jsx
"use client";

import { Input } from "@/components/ui/input";

export default function ContactForm({ data = {}, setData }) {
  const contact = data.contact || {};

  function update(field, value) {
    setData({ ...data, contact: { ...contact, [field]: value } });
  }

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-semibold mb-2">Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input placeholder="Full name" value={contact.fullName || ""} onChange={(e) => update("fullName", e.target.value)} />
        <Input placeholder="Email" value={contact.email || ""} onChange={(e) => update("email", e.target.value)} />
        <Input placeholder="Mobile" value={contact.mobile || ""} onChange={(e) => update("mobile", e.target.value)} />
        <Input placeholder="LinkedIn" value={contact.linkedin || ""} onChange={(e) => update("linkedin", e.target.value)} />
        <Input placeholder="GitHub" value={contact.github || ""} onChange={(e) => update("github", e.target.value)} />
        <Input placeholder="Portfolio / Website" value={contact.portfolio || ""} onChange={(e) => update("portfolio", e.target.value)} />
      </div>
    </div>
  );
}
