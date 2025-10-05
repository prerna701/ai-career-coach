// app/(main)/resume/_components/pdf/ResumePDF.jsx
"use client";

import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

export default function ResumePDF({ data = {}, template = "modern" }) {
  const tpl = (template || "modern").toLowerCase();
  if (tpl === "minimal") return <MinimalTemplate {...data} />;
  if (tpl === "classic") return <ClassicTemplate {...data} />;
  return <ModernTemplate {...data} />;
}
