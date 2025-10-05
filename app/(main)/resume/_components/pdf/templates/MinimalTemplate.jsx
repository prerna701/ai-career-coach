// app/(main)/resume/_components/pdf/templates/MinimalTemplate.jsx
"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 10.5, fontFamily: "Times-Roman" },
  header: { textAlign: "center", marginBottom: 6 },
  name: { fontSize: 16, fontWeight: "bold" },
  contact: { fontSize: 9, color: "#444" },
  sectionTitle: { fontSize: 11, marginTop: 8, marginBottom: 4, textDecoration: "underline" },
});

export default function MinimalTemplate({ contact = {}, summary, skills, experience = [], education = [], projects = [] }) {
  const skillsText = Array.isArray(skills) ? skills.join(", ") : skills || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{contact.fullName || "Your Name"}</Text>
          <Text style={styles.contact}>{contact.email || ""}{contact.email && " | "}{contact.mobile || ""}{contact.mobile && " | "}{contact.linkedin || ""}</Text>
        </View>

        {summary && (<View><Text style={styles.sectionTitle}>Summary</Text><Text>{summary}</Text></View>)}
        {skillsText && (<View><Text style={styles.sectionTitle}>Skills</Text><Text>{skillsText}</Text></View>)}

        {experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((e,i)=>(
              <View key={i} style={{marginBottom:6}}>
                <Text style={{fontWeight:"bold"}}>{e.title} • {e.company}</Text>
                <Text style={{fontSize:9,color:"#666"}}>{e.startDate}{e.endDate ? ` – ${e.endDate}` : ""}</Text>
                <Text>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((ed,i)=>(<View key={i} style={{marginBottom:6}}>
              <Text style={{fontWeight:"bold"}}>{ed.degree} • {ed.institution}</Text>
              <Text style={{fontSize:9,color:"#666"}}>{ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ""}</Text>
              <Text>{ed.description}</Text>
            </View>))}
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p,i)=>(<View key={i} style={{marginBottom:6}}>
              <Text style={{fontWeight:"bold"}}>{p.name} • {p.role}</Text>
              <Text style={{fontSize:9,color:"#666"}}>{p.date}</Text>
              <Text>{p.description}</Text>
            </View>))}
          </View>
        )}
      </Page>
    </Document>
  );
}
