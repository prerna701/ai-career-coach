// app/(main)/resume/_components/utils/helper.js
export const entriesToMarkdown = (entries = [], title = "") => {
  if (!entries || entries.length === 0) return "";
  return `## ${title}\n\n${entries
    .map((e) => {
      // unify field keys for education/project/experience
      const heading = e.title || e.name || e.degree || "";
      const sub = [e.company || e.institution || e.subtitle || "", e.location].filter(Boolean).join(", ");
      const date =
        e.date || (e.startDate ? `${e.startDate}${e.endDate || e.current ? " - " + (e.current ? "Present" : e.endDate) : ""}` : "");
      const link = e.link ? ` (live at ${e.link.replace(/^https?:\/\//, "")})` : "";
      const bullets = (e.description || "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => `- ${l.replace(/^[•\-*]\s*/, "")}`)
        .join("\n");
      return `**${heading}**${link}${sub ? " — " + sub : ""}${date ? "  " + date : ""}${bullets ? "\n\n" + bullets : ""}`;
    })
    .join("\n\n")}`;
};
