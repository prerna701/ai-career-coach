"use client";

function SectionTitle({ children }) {
  return (
    <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-gray-900 border-b border-gray-300 pb-1 mb-2.5">
      {children}
    </h2>
  );
}

function Bullets({ text }) {
  const lines = (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return null;
  return (
    <ul className="mt-1 space-y-0.5 list-disc pl-4 marker:text-gray-400">
      {lines.map((line, i) => (
        <li key={i} className="text-[12.5px] leading-relaxed text-gray-800">
          {line.replace(/^[•\-*]\s*/, "")}
        </li>
      ))}
    </ul>
  );
}

// Single-line "Heading — Sub, Location    DateRange" row, bullets below.
function EntryRow({ heading, link, dateRange, description }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-semibold text-[13.5px] text-gray-900">
          {heading}
          {link && (
            <a href={link.href} className="ml-1.5 text-[12px] font-normal text-blue-700 underline">
              (live at {link.label})
            </a>
          )}
        </div>
        {dateRange && <div className="shrink-0 text-[12px] italic text-gray-600">{dateRange}</div>}
      </div>
      <Bullets text={description} />
    </div>
  );
}

function toHref(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
}

export default function ResumeLivePreview({ data = {} }) {
  const c = data.contact || {};
  const skills = Array.isArray(data.skills)
    ? data.skills
    : data.skills
    ? data.skills.split(",").map((s) => s.trim())
    : [];
  const certifications = Array.isArray(data.certifications) ? data.certifications : [];

  const contactLine = [c.location, c.mobile, c.email].filter(Boolean).join("  ·  ");
  const links = [
    c.github && { label: c.github.replace(/^https?:\/\//, ""), href: toHref(c.github) },
    c.linkedin && { label: "LinkedIn", href: toHref(c.linkedin) },
    c.portfolio && { label: c.portfolio.replace(/^https?:\/\//, ""), href: toHref(c.portfolio) },
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-[820px] bg-white text-gray-900 shadow-md rounded-sm border border-gray-200 p-10 font-sans">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="text-[22px] font-bold tracking-tight">{c.fullName || "Your Name"}</h1>
        {c.title && <p className="mt-1 text-[13px] text-gray-800">{c.title}</p>}
        {contactLine && <p className="mt-1 text-[12.5px] text-gray-700">{contactLine}</p>}
        {links.length > 0 && (
          <p className="mt-0.5 text-[12.5px]">
            {links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && "  ·  "}
                <a href={l.href} className="text-blue-700 underline">{l.label}</a>
              </span>
            ))}
          </p>
        )}
      </header>

      {data.summary && (
        <section className="mb-4">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-[12.5px] leading-relaxed text-gray-800">{data.summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="space-y-1">
            {skills.map((s, i) => {
              const idx = s.indexOf(":");
              if (idx > -1) {
                return (
                  <p key={i} className="text-[12.5px] leading-relaxed text-gray-800">
                    <span className="font-semibold">{s.slice(0, idx)}:</span>
                    {s.slice(idx + 1)}
                  </p>
                );
              }
              return null;
            })}
            {skills.every((s) => s.indexOf(":") === -1) && (
              <p className="text-[12.5px] leading-relaxed text-gray-800">{skills.join(", ")}</p>
            )}
          </div>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Experience</SectionTitle>
          {data.experience.map((e, i) => (
            <EntryRow
              key={i}
              heading={[e.title, [e.company, e.location].filter(Boolean).join(", ")].filter(Boolean).join(" — ")}
              dateRange={[e.startDate, e.current ? "Present" : e.endDate].filter(Boolean).join(" – ")}
              description={e.description}
            />
          ))}
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Projects</SectionTitle>
          {data.projects.map((p, i) => (
            <EntryRow
              key={i}
              heading={p.name}
              link={p.link ? { label: p.link.replace(/^https?:\/\//, ""), href: toHref(p.link) } : null}
              dateRange={p.date}
              description={p.description}
            />
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Education</SectionTitle>
          {data.education.map((ed, i) => (
            <EntryRow
              key={i}
              heading={[ed.degree, [ed.institution, ed.location].filter(Boolean).join(", ")].filter(Boolean).join(" — ")}
              dateRange={[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}
              description={ed.description}
            />
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <p className="text-[12.5px] leading-relaxed text-gray-800">{certifications.join("  |  ")}</p>
        </section>
      )}
    </div>
  );
}
