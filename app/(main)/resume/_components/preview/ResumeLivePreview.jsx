// app/(main)/resume/_components/preview/ResumeLivePreview.jsx
"use client";

export default function ResumeLivePreview({ data = {} }) {
  const c = data.contact || {};
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(",").map(s=>s.trim()) : []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <header className="text-center">
        <h1 className="text-2xl font-bold">{c.fullName || "Your Name"}</h1>
        <p className="text-sm text-gray-600">
          {c.email || ""} {c.email && " | "} {c.mobile || ""} {c.mobile && " | "} {c.linkedin || ""}
        </p>
      </header>

      {data.summary && (
        <section className="mt-4">
          <h2 className="font-semibold">Professional Summary</h2>
          <p className="mt-1 text-sm">{data.summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-3">
          <h3 className="font-semibold">Skills</h3>
          <p className="mt-1 text-sm">{skills.join(", ")}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mt-3">
          <h3 className="font-semibold">Work Experience</h3>
          {data.experience.map((e, i) => (
            <div key={i} className="mt-2">
              <div className="font-medium">{e.title} — {e.company}</div>
              <div className="text-xs text-gray-500">{e.startDate} — {e.endDate || "Present"}</div>
              <p className="mt-1 text-sm">{e.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mt-3">
          <h3 className="font-semibold">Education</h3>
          {data.education.map((ed, i) => (
            <div key={i} className="mt-2">
              <div className="font-medium">{ed.degree} — {ed.institution}</div>
              <div className="text-xs text-gray-500">{ed.startDate} — {ed.endDate}</div>
              <p className="mt-1 text-sm">{ed.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="mt-3">
          <h3 className="font-semibold">Projects</h3>
          {data.projects.map((p, i) => (
            <div key={i} className="mt-2">
              <div className="font-medium">{p.name} — {p.role}</div>
              <div className="text-xs text-gray-500">{p.date}</div>
              <p className="mt-1 text-sm">{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
