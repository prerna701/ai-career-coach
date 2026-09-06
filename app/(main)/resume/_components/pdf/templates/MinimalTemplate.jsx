// app/(main)/resume/_components/pdf/templates/MinimalTemplate.jsx
"use client";

import { Document, Page, Text, View, Link, StyleSheet } from "@react-pdf/renderer";

const toHref = (url) => (url ? (url.startsWith("http") ? url : `https://${url}`) : "");

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 10, fontFamily: "Times-Roman" },
  header: { textAlign: "center", marginBottom: 6 },
  name: { fontSize: 16, fontWeight: "bold" },
  title: { fontSize: 10, color: "#333", marginTop: 1 },
  contact: { fontSize: 9, color: "#444", marginTop: 1 },
  sectionTitle: { fontSize: 11, marginTop: 8, marginBottom: 3, textDecoration: "underline" },
  entryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontSize: 10, fontWeight: "bold" },
  entryLink: { fontSize: 9, color: "#1a4fd6" },
  entryDate: { fontSize: 9, color: "#555" },
  bulletRow: { flexDirection: "row", marginTop: 2, paddingLeft: 4 },
  bulletDot: { width: 8, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 1.3 },
  skillLine: { fontSize: 10, lineHeight: 1.3, marginBottom: 1.5 },
  skillLabel: { fontWeight: "bold" },
});

function Bullets({ text }) {
  const lines = (text || "").split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;
  return (
    <View style={{ marginTop: 2 }}>
      {lines.map((line, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{line.replace(/^[•\-*]\s*/, "")}</Text>
        </View>
      ))}
    </View>
  );
}

function EntryBlock({ heading, link, dateRange, description }) {
  return (
    <View style={{ marginBottom: 7 }}>
      <View style={styles.entryRow}>
        <Text style={styles.entryTitle}>
          {heading}
          {link ? (
            <Text style={styles.entryLink}>
              {" "}
              (live at <Link src={link.href} style={styles.entryLink}>{link.label}</Link>)
            </Text>
          ) : null}
        </Text>
        {dateRange ? <Text style={styles.entryDate}>{dateRange}</Text> : null}
      </View>
      <Bullets text={description} />
    </View>
  );
}

export default function MinimalTemplate({
  contact = {},
  summary,
  skills = [],
  experience = [],
  projects = [],
  education = [],
  certifications = [],
}) {
  const skillList = Array.isArray(skills) ? skills : skills ? [skills] : [];
  const contactLine = [contact.location, contact.mobile, contact.email].filter(Boolean).join("  |  ");
  const contactLinks = [
    contact.github && { label: contact.github.replace(/^https?:\/\//, ""), href: toHref(contact.github) },
    contact.linkedin && { label: "LinkedIn", href: toHref(contact.linkedin) },
    contact.portfolio && { label: contact.portfolio.replace(/^https?:\/\//, ""), href: toHref(contact.portfolio) },
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{contact.fullName || "Your Name"}</Text>
          {contact.title ? <Text style={styles.title}>{contact.title}</Text> : null}
          {contactLine ? <Text style={styles.contact}>{contactLine}</Text> : null}
          {contactLinks.length > 0 ? (
            <Text style={styles.contact}>
              {contactLinks.map((l, i) => (
                <Text key={l.href}>
                  {i > 0 ? "  |  " : ""}
                  <Link src={l.href} style={styles.contact}>{l.label}</Link>
                </Text>
              ))}
            </Text>
          ) : null}
        </View>

        {summary ? (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.35 }}>{summary}</Text>
          </View>
        ) : null}

        {skillList.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skillList.map((s, i) => {
              const idx = s.indexOf(":");
              if (idx === -1) return <Text key={i} style={styles.skillLine}>{s}</Text>;
              return (
                <Text key={i} style={styles.skillLine}>
                  <Text style={styles.skillLabel}>{s.slice(0, idx)}:</Text>
                  {s.slice(idx + 1)}
                </Text>
              );
            })}
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((e, i) => (
              <EntryBlock
                key={i}
                heading={[e.title, [e.company, e.location].filter(Boolean).join(", ")].filter(Boolean).join(" — ")}
                dateRange={[e.startDate, e.current ? "Present" : e.endDate].filter(Boolean).join(" – ")}
                description={e.description}
              />
            ))}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <EntryBlock
                key={i}
                heading={p.name}
                link={p.link ? { label: p.link.replace(/^https?:\/\//, ""), href: toHref(p.link) } : null}
                dateRange={p.date}
                description={p.description}
              />
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((ed, i) => (
              <EntryBlock
                key={i}
                heading={[ed.degree, [ed.institution, ed.location].filter(Boolean).join(", ")].filter(Boolean).join(" — ")}
                dateRange={[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}
                description={ed.description}
              />
            ))}
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.35 }}>{certifications.join("  |  ")}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
