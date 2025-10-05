// app/(main)/resume/_components/utils/helper.js
export const entriesToMarkdown = (entries = [], title = "") => {
  if (!entries || entries.length === 0) return "";
  return `## ${title}\n\n${entries
    .map((e) => {
      // unify field keys for education/project/experience
      const heading = e.title || e.name || e.degree || "";
      const sub = e.company || e.subtitle || e.institution || "";
      const date = e.startDate ? ` (${e.startDate}${e.endDate ? " - " + e.endDate : ""})` : "";
      const desc = e.description || "";
      return `**${heading}**${sub ? " — " + sub : ""}${date}\n\n- ${desc}`;
    })
    .join("\n\n")}`;
};
