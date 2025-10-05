// app/(main)/resume/_components/pdf/templates/ModernTemplate.jsx
"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },
  header: { textAlign: "center", marginBottom: 8 },
  name: { fontSize: 20, fontWeight: "bold" },
  contact: { fontSize: 9, color: "#555", marginBottom: 8 },
  sectionTitle: { fontSize: 12, marginTop: 8, marginBottom: 4, fontWeight: "bold" },
  entryTitle: { fontSize: 11, fontWeight: "600" },
  entryMeta: { fontSize: 9, color: "#666" },
  entryDesc: { fontSize: 10, marginTop: 4 },
});

export default function ModernTemplate({
  contact = {},
  summary,
  skills,
  experience = [],
  education = [],
  projects = [],
}) {
  const skillsText = Array.isArray(skills) ? skills.join(", ") : skills || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{contact.fullName || "Your Name"}</Text>
          <Text style={styles.contact}>
            {contact.email || ""}{contact.email && " | "}{contact.mobile || ""}{contact.mobile && " | "}{contact.linkedin || ""}
          </Text>
        </View>

        {summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>{summary}</Text>
          </View>
        )}

        {skillsText && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text>{skillsText}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((e, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.entryTitle}>{e.title}</Text>
                <Text style={styles.entryMeta}>{e.company} • {e.startDate}{e.endDate ? ` – ${e.endDate}` : " – Present"}</Text>
                <Text style={styles.entryDesc}>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((ed, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.entryTitle}>{ed.degree}</Text>
                <Text style={styles.entryMeta}>{ed.institution} • {ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ""}</Text>
                <Text style={styles.entryDesc}>{ed.description}</Text>
              </View>
            ))}
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.entryTitle}>{p.name}</Text>
                <Text style={styles.entryMeta}>{p.role} • {p.date}</Text>
                <Text style={styles.entryDesc}>{p.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
