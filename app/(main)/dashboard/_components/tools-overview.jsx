import Link from "next/link";
import { FileText, PenBox, GraduationCap, ClipboardList, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function humanizeIndustry(industry) {
  if (!industry) return "Not set";
  return industry
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ToolCard({ icon: Icon, title, description, actionLabel, href }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription>{description}</CardDescription>
        <Link href={href}>
          <Button variant="outline" size="sm" className="gap-1.5">
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function ToolsOverview({ resume, coverLetters = [], assessments = [], profile }) {
  const hasResume = !!resume?.content;
  const avgScore =
    assessments.length > 0
      ? (assessments.reduce((sum, a) => sum + a.quizScore, 0) / assessments.length).toFixed(0)
      : null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Your Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ToolCard
          icon={FileText}
          title="Resume"
          description={
            hasResume
              ? `Saved${resume.atsScore ? ` · ATS score ${resume.atsScore}` : ""}`
              : "Not created yet"
          }
          actionLabel={hasResume ? "Edit Resume" : "Build Resume"}
          href="/resume"
        />

        <ToolCard
          icon={PenBox}
          title="Cover Letters"
          description={
            coverLetters.length > 0
              ? `${coverLetters.length} created`
              : "None created yet"
          }
          actionLabel={coverLetters.length > 0 ? "View Cover Letters" : "Create One"}
          href="/ai-cover-letter"
        />

        <ToolCard
          icon={GraduationCap}
          title="Interview Prep"
          description={
            assessments.length > 0
              ? `${assessments.length} quiz${assessments.length === 1 ? "" : "zes"} · avg ${avgScore}%`
              : "No quizzes taken yet"
          }
          actionLabel={assessments.length > 0 ? "Practice Again" : "Start Quiz"}
          href="/interview"
        />

        <ToolCard
          icon={ClipboardList}
          title="Onboarding Data"
          description={`Industry: ${humanizeIndustry(profile?.industry)}`}
          actionLabel="Edit Profile"
          href="/onboarding"
        />
      </div>
    </div>
  );
}
