// app/(main)/resume/_components/pdf/ClientPDFDownload.jsx
"use client";

import { pdf } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ClientPDFDownload({ data = {}, template = "modern" }) {
  async function handleDownload() {
    try {
      const doc = <ResumePDF data={data} template={template} />; // ResumePDF returns a <Document/>
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const name = (data.contact?.fullName || "resume").replace(/\s+/g, "_");
      a.download = `${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF in this browser.");
    }
  }

  return (
    <Button onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" /> Download PDF
    </Button>
  );
}
