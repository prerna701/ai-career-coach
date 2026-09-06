import { Doc, Mail, Mic, Chart, Sparkles, Target, User, Brain } from "./icons";
import Reveal from "./Reveal";

export function TrustStrip() {
  const items = [
    { i: <Doc size={14} />, l: "AI Resume" },
    { i: <Chart size={14} />, l: "Career Insights" },
    { i: <Mail size={14} />, l: "Cover Letters" },
    { i: <Mic size={14} />, l: "Mock Interviews" },
    { i: <Target size={14} />, l: "Skill Development" },
  ];
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="text-center">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[#6B7280]">The Platform</div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
            Everything you need to move from{" "}
            <span className="text-[#9298A3]">&ldquo;applying&rdquo;</span>{" "}
            <br className="hidden sm:block" />
            to <span className="gradient-text-blue">hired.</span>
          </h2>
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-4">
            {items.map((it, idx) => (
              <div key={it.l} className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg border border-[#1C2028] bg-[#0D0D0F] flex items-center justify-center text-blue-400">
                  {it.i}
                </span>
                <span className="text-sm text-white/90">{it.l}</span>
                {idx < items.length - 1 && <span className="hidden sm:inline text-[#262A34] ml-2">|</span>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProblemSolution() {
  const cards = [
    { i: <Doc size={16} />, t: "Resume Tools", d: "Generic suggestions that don't understand your industry." },
    { i: <Mail size={16} />, t: "Cover Letter Tools", d: "Copy-paste templates that sound like everyone else." },
    { i: <Mic size={16} />, t: "Interview Prep", d: "Questions without meaningful, personal feedback." },
  ];

  const flow = ["Your Profile", "AI", "Resume", "Applications", "Interviews", "Improvement"];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C2028] to-transparent" />
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="w-full">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[#6B7280]">The Problem</div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white text-balance leading-[1.05]">
            Your job search shouldn&apos;t feel like{" "}
            <span className="text-[#9298A3]">five different jobs.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i + 1} className="card p-6 shine group">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg border border-[#1C2028] bg-[#111318] flex items-center justify-center text-[#9298A3] group-hover:text-blue-400 transition-colors">
                  {c.i}
                </span>
                <div className="text-white font-medium">{c.t}</div>
              </div>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#9298A3]">{c.d}</p>
              <div className="mt-6 flex items-center gap-1.5 text-[12.5px] font-mono text-[#6B7280]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                Fragmented workflow
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mt-20 text-center">
          <div className="chip !text-[12.5px]">
            <Sparkles size={11} className="text-blue-400" />
            <span className="font-mono text-blue-300">THE SOLUTION</span>
          </div>
          <h3 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white">
            AI Career Coach brings everything <span className="gradient-text-blue">together.</span>
          </h3>
        </Reveal>

        <Reveal delay={3} className="mt-14">
          <div className="relative rounded-2xl border border-[#1C2028] bg-gradient-to-b from-[#0A0A0A] to-[#0D0D0F] p-6 sm:p-10 overflow-hidden">
            <div className="absolute left-6 right-6 sm:left-10 sm:right-10 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent hidden md:block">
              <div className="absolute inset-0 blur-[6px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="absolute top-1/2 -translate-y-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent beam-x" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 relative">
              {flow.map((f, i) => (
                <div key={f} className="flex flex-col items-center text-center">
                  <div
                    className={`relative w-11 h-11 rounded-xl grid place-items-center border ${
                      i === 1
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                        : "border-[#1C2028] bg-[#0D0D0F] text-[#9298A3]"
                    }`}
                  >
                    {i === 0 && <User size={16} />}
                    {i === 1 && <Brain size={16} />}
                    {i === 2 && <Doc size={16} />}
                    {i === 3 && <Mail size={16} />}
                    {i === 4 && <Mic size={16} />}
                    {i === 5 && <Chart size={16} />}
                    {i === 1 && (
                      <span className="absolute -inset-2 rounded-2xl bg-blue-500/20 blur-lg -z-10" />
                    )}
                  </div>
                  <div className="mt-3 text-[14px] text-white/90 font-medium">{f}</div>
                  <div className="text-[11.5px] font-mono text-[#6B7280] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#1C2028] flex flex-wrap items-center justify-between gap-3 text-[12.5px] font-mono text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                CONNECTED WORKFLOW
              </div>
              <div>PROFILE → CONTEXT → OUTCOMES</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
