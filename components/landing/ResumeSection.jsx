import { Arrow, Doc, Sparkles } from "./icons";
import Reveal from "./Reveal";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Resume AI</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-[52px] font-semibold text-white tracking-[-0.03em] leading-[1.05] text-balance">
            Your resume shouldn&apos;t just describe your work.
            <br />
            <span className="gradient-text-blue">It should sell your impact.</span>
          </h2>
          <p className="mt-5 text-[16.5px] text-[#9298A3] leading-relaxed max-w-xl">
            AI analyzes each section of your resume and rewrites it with stronger action verbs,
            measurable achievements, and industry-specific keywords that make it past ATS filters —
            and past humans.
          </p>

          <ul className="mt-8 space-y-3 text-[15.5px] text-[#C9D0DB]">
            {[
              "Rewrites bullets with measurable outcomes",
              "Injects role-specific keywords automatically",
              "ATS scoring with per-section feedback",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-1 w-4 h-4 rounded-full grid place-items-center border border-blue-500/40 bg-blue-500/10 text-blue-300 text-[11.5px]">✓</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="btn-primary">Improve My Resume <Arrow /></a>
            <a href="#features" className="btn-ghost">See example</a>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="relative">
            <div className="rounded-2xl border border-[#1C2028] bg-[#08080A] overflow-hidden shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(59,130,246,0.35)]">
              <div className="flex items-center justify-between px-4 h-10 border-b border-[#1C2028] bg-[#0A0A0A]/80">
                <div className="flex items-center gap-2">
                  <Doc size={14} className="text-blue-400" />
                  <div className="text-[14px] text-white font-medium">resume.pdf</div>
                  <span className="chip !py-0.5 !px-2 !text-[11.5px] font-mono">AI IMPROVED</span>
                </div>
                <div className="text-[12.5px] font-mono text-[#6B7280]">Autosaved</div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <div className="text-[11.5px] font-mono text-[#6B7280]">EXPERIENCE · SECTION 2</div>
                  <div className="mt-1 text-[14.5px] text-white font-medium">Backend Engineer · Acme Tech</div>
                </div>

                <div className="rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4 relative">
                  <div className="flex items-center gap-2 text-[11.5px] font-mono text-[#6B7280]">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" /> BEFORE
                  </div>
                  <p className="mt-2 text-[15px] text-[#9298A3] line-through decoration-red-500/40">
                    Worked on backend APIs.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1C2028] to-transparent" />
                  <div className="chip !text-[11.5px] font-mono">
                    <Sparkles size={10} className="text-blue-400" /> AI REWRITE
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1C2028] to-transparent" />
                </div>

                <div className="animated-border slow rounded-xl">
                  <div className="rounded-[17px] bg-[#0D0D0F] p-4">
                    <div className="flex items-center gap-2 text-[11.5px] font-mono text-blue-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> AFTER
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-white">
                      Engineered <span className="text-blue-400">scalable REST APIs</span> that improved application response time by <span className="text-blue-400 font-semibold">32%</span>, serving <span className="text-blue-400">2M+ monthly users</span>.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["scalable", "REST", "performance", "monitoring"].map((k) => (
                        <span key={k} className="text-[12px] px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/25 text-blue-300 font-mono">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                  <div className="flex items-center justify-between text-[12.5px] font-mono">
                    <span className="text-[#6B7280]">ATS SCORE</span>
                    <span className="text-blue-400">87 / 100</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#17191F] overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 relative" style={{ width: "87%" }}>
                      <span className="absolute inset-y-0 -right-1 w-3 bg-cyan-300/60 blur-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex absolute -top-4 -right-4 card px-3 py-2 text-[12.5px] font-mono text-blue-300 items-center gap-2 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
              <Sparkles size={12} /> AI rewrote 4 bullets
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
