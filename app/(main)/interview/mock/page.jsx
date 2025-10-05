import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-900 text-gray-100">
      <div className="container mx-auto space-y-10 py-12 px-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          <Link href="/interview">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-0 text-gray-300 hover:text-white hover:bg-neutral-800 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Interview Preparation
            </Button>
          </Link>

          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
              Mock Interview
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Test your knowledge with industry-specific questions
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="rounded-2xl bg-neutral-950/60 shadow-xl border border-neutral-800 p-6 backdrop-blur-md">
          <Quiz />
        </div>
      </div>
    </div>
  );
}
