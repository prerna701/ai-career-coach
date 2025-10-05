// app/(main)/resume/_components/pdf/templates/ClassicTemplate.jsx
"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 11, fontFamily: "Courier" },
  header: { marginBottom: 6 },
  name: { fontSize: 18, fontWeight: "bold" },
  contact: { fontSize: 10, color: "#222" },
  sectionTitle: { marginTop: 10, marginBottom: 4, fontWeight: "bold" },
});

export default function ClassicTemplate({ contact = {}, summary, skills, experience = [], education = [], projects = [] }) {
  const skillsText = Array.isArray(skills) ? skills.join(", ") : skills || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{contact.fullName || "Your Name"}</Text>
          <Text style={styles.contact}>{contact.email || ""} {contact.email && " | "} {contact.mobile || ""} {contact.mobile && " | "} {contact.linkedin || ""}</Text>
        </View>

        {summary && (<View><Text style={styles.sectionTitle}>Professional Summary</Text><Text>{summary}</Text></View>)}
        {skillsText && (<View><Text style={styles.sectionTitle}>Skills</Text><Text>{skillsText}</Text></View>)}

        {experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((e,i)=>(
              <View key={i} style={{marginBottom:6}}>
                <Text style={{fontWeight:"bold"}}>{e.title}</Text>
                <Text style={{fontSize:10,color:"#444"}}>{e.company} • {e.startDate}{e.endDate ? ` – ${e.endDate}` : ""}</Text>
                <Text>{e.description}</Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((ed,i)=>(
              <View key={i} style={{marginBottom:6}}>
                <Text style={{fontWeight:"bold"}}>{ed.degree}</Text>
                <Text style={{fontSize:10,color:"#444"}}>{ed.institution} • {ed.startDate}{ed.endDate ? ` – ${ed.endDate}` : ""}</Text>
                <Text>{ed.description}</Text>
              </View>
            ))}
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p,i)=>(
              <View key={i} style={{marginBottom:6}}>
                <Text style={{fontWeight:"bold"}}>{p.name}</Text>
                <Text style={{fontSize:10,color:"#444"}}>{p.role} • {p.date}</Text>
                <Text>{p.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
