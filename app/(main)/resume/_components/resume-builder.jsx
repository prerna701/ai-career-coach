// app/(main)/resume/_components/resume-builder.jsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import ContactForm from "./forms/ContactForm";
import SummaryForm from "./forms/SummaryForm";
import SkillsForm from "./forms/SkillsForm";
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
    return [
      d.contact?.fullName ? `# ${d.contact.fullName}` : "",
      d.contact ? `${d.contact.email || ""} ${d.contact.mobile ? "| " + d.contact.mobile : ""}` : "",
      d.summary ? `\n\n## Professional Summary\n\n${d.summary}` : "",
      d.skills && d.skills.length ? `\n\n## Skills\n\n${Array.isArray(d.skills) ? d.skills.join(", ") : d.skills}` : "",
      entriesToMarkdown(d.experience || [], "Work Experience"),
      entriesToMarkdown(d.education || [], "Education"),
      entriesToMarkdown(d.projects || [], "Projects"),
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
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border rounded px-2 py-1"
            aria-label="Template"
          >
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="classic">Classic</option>
          </select>

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
            </div>

            <div className="space-y-6">
              <EntryForm label="Experience" field="experience" data={data} setData={setData} />
              <EntryForm label="Education" field="education" data={data} setData={setData} />
              <EntryForm label="Projects" field="projects" data={data} setData={setData} />
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
    </div>
  );
}
