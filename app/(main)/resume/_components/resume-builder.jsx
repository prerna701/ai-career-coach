// app/(main)/resume/_components/resume-builder.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Save, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import ContactForm from "./forms/ContactForm";
import SummaryForm from "./forms/SummaryForm";
import SkillsForm from "./forms/SkillsForm";
import CertificationsForm from "./forms/CertificationsForm";
import { EntryForm } from "./forms/EntryForm";

import MarkdownPreview from "./preview/MarkdownPreview";
import ResumeLivePreview from "./preview/ResumeLivePreview";
import ClientPDFDownload from "./pdf/ClientPDFDownload";

import { entriesToMarkdown } from "./utils/helper";
import sampleData from "./utils/sample-data";
import useFetch from "@/hooks/use-fetch";
import { saveResume } from "@/actions/resume";

export default function ResumeBuilder({ initialContent = null }) {
  // load sampleData if no initial content
  const initial = initialContent ? initialContent : sampleData;

  const [activeTab, setActiveTab] = useState("edit");
  const [data, setData] = useState(initial);
  const [markdown, setMarkdown] = useState("");
  const [template, setTemplate] = useState("modern");

  const { loading: isSaving, fn: saveResumeFn } = useFetch(saveResume);

  useEffect(() => {
    setMarkdown(computeMarkdown(data));
  }, [data]);

  function computeMarkdown(d) {
    const c = d.contact || {};
    const contactLine = [c.location, c.mobile, c.email].filter(Boolean).join("  ·  ");
    const links = [c.github, c.linkedin, c.portfolio].filter(Boolean).join("  ·  ");
    const skills = Array.isArray(d.skills) ? d.skills : d.skills ? [d.skills] : [];
    const certifications = Array.isArray(d.certifications) ? d.certifications : [];

    return [
      c.fullName ? `# ${c.fullName}` : "",
      c.title ? `${c.title}` : "",
      contactLine,
      links,
      d.summary ? `\n\n## Summary\n\n${d.summary}` : "",
      skills.length ? `\n\n## Technical Skills\n\n${skills.map((s) => `- ${s}`).join("\n")}` : "",
      entriesToMarkdown(d.experience || [], "Experience"),
      entriesToMarkdown(d.projects || [], "Projects"),
      entriesToMarkdown(d.education || [], "Education"),
      certifications.length ? `\n\n## Certifications\n\n${certifications.join("  |  ")}` : "",
    ].filter(Boolean).join("\n\n");
  }

  const handleSave = async () => {
    try {
      await saveResumeFn(JSON.stringify(data));
      toast.success("Resume saved");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Resume Builder — Placement Ready</h1>

        <div className="flex gap-2 items-center">
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger className="w-32" aria-label="Template">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : <><Save className="h-4 w-4 mr-2" />Save</>}
          </Button>

          <ClientPDFDownload data={data} template={template} />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ContactForm data={data} setData={setData} />
              <SummaryForm data={data} setData={setData} />
              <SkillsForm data={data} setData={setData} />
              <CertificationsForm data={data} setData={setData} />
            </div>

            <div className="space-y-6">
              <EntryForm label="Experience" field="experience" data={data} setData={setData} />
              <EntryForm label="Projects" field="projects" data={data} setData={setData} />
              <EntryForm label="Education" field="education" data={data} setData={setData} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-2">Markdown Preview</h2>
              <MarkdownPreview markdown={markdown} />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Live Preview ({template})</h2>
              <ResumeLivePreview data={data} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-2 border-t">
        <Link href="/ai-cover-letter/new">
          <Button variant="outline" className="gap-2">
            Next: Create Cover Letter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
