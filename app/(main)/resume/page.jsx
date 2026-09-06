import ResumeBuilder from "./_components/resume-builder";
import { getResume } from "@/actions/resume";

export default async function ResumePage() {
  const resume = await getResume();

  let initialContent = null;
  if (resume?.content) {
    try {
      initialContent = JSON.parse(resume.content);
    } catch (err) {
      console.error("Failed to parse saved resume content:", err);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <ResumeBuilder initialContent={initialContent} />
    </div>
  );
}
