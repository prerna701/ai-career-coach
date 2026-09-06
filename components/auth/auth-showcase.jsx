import { FileText, Mail, GraduationCap, TrendingUp } from "lucide-react";

const points = [
  { icon: FileText, label: "Build and improve resumes with AI feedback" },
  { icon: Mail, label: "Generate tailored cover letters for every role" },
  { icon: GraduationCap, label: "Practice with adaptive mock interviews" },
  { icon: TrendingUp, label: "Track career readiness and progress over time" },
];

export default function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden bg-[#050505] lg:flex lg:flex-col lg:justify-end">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(59,130,246,0.08) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-30" />

      <div className="relative px-12 pb-16 pt-24 xl:px-16">
        <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white text-balance">
          Every application, every interview, one clear plan.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#9298A3]">
          Your resume, cover letters, and interview prep stay in sync with one
          profile — so nothing about your job search is guesswork.
        </p>

        <ul className="mt-10 space-y-4">
          {points.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#1C2028] bg-[#0D0D0F] text-blue-400">
                <Icon size={15} />
              </span>
              <span className="text-[14px] text-[#C9D0DB]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
