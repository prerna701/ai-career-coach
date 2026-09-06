import { Chart, Doc, Grid, Mail, Mic, Sparkles, Target, User } from "./icons";
import Reveal from "./Reveal";

export default function DashboardPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="text-center w-full mx-auto">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">The Workspace</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] leading-[1.03] text-balance">
            Your entire career toolkit. <br />
            <span className="gradient-text-blue">One dashboard.</span>
          </h2>
        </Reveal>

        <Reveal delay={2} className="mt-14">
          <div className="rounded-2xl border border-[#1C2028] bg-[#0A0A0A] overflow-hidden shadow-[0_80px_180px_-40px_rgba(0,0,0,0.95),0_0_120px_-40px_rgba(59,130,246,0.4)]">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-[#1C2028] bg-[#0D0D0F]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3a3f4a]" />
              </div>
              <div className="mx-auto max-w-md w-full h-6 rounded-md bg-[#111318] border border-[#1C2028] flex items-center gap-2 px-3 text-[12.5px] font-mono text-[#9298A3]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                app.aicareercoach.io / workspace
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="hidden md:flex col-span-2 flex-col p-3 gap-1 border-r border-[#1C2028] bg-[#080809]">
                <div className="text-[11.5px] font-mono text-[#6B7280] px-2 py-1.5 uppercase">Workspace</div>
                {[
                  { i: <Grid size={14} />, l: "Dashboard", a: true },
                  { i: <Doc size={14} />, l: "Resume" },
                  { i: <Mail size={14} />, l: "Cover Letters" },
                  { i: <Mic size={14} />, l: "Interview" },
                  { i: <Target size={14} />, l: "Assessments" },
                  { i: <Chart size={14} />, l: "Insights" },
                  { i: <User size={14} />, l: "Profile" },
                ].map((it) => (
                  <div key={it.l} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] ${
                    it.a ? "bg-blue-500/10 border border-blue-500/25 text-white" : "text-[#9298A3]"
                  }`}>
                    <span className={it.a ? "text-blue-400" : "text-[#6B7280]"}>{it.i}</span>
                    {it.l}
                  </div>
                ))}
              </div>

              <div className="col-span-12 md:col-span-10 p-5 sm:p-7 grid-bg-fine">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-white text-xl sm:text-2xl font-semibold tracking-tight">Career Command Center</div>
                    <div className="text-[14.5px] text-[#9298A3]">Everything working from one profile.</div>
                  </div>
                  <div className="chip !text-[12.5px] hidden sm:inline-flex">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
                    All systems synced
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 sm:gap-4">
                  <div className="col-span-6 md:col-span-2 rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                    <div className="text-[11.5px] font-mono text-[#6B7280]">CAREER READINESS</div>
                    <div className="mt-1 text-3xl font-semibold text-white">82%</div>
                    <div className="mt-3 h-14">
                      <svg viewBox="0 0 200 60" className="w-full h-full">
                        <path d="M0 42 L40 38 L80 32 L120 22 L160 14 L200 8" stroke="#60A5FA" strokeWidth="1.6" fill="none" />
                      </svg>
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2 rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                    <div className="text-[11.5px] font-mono text-[#6B7280]">ATS SCORE</div>
                    <div className="mt-1 text-3xl font-semibold text-white">87</div>
                    <div className="mt-2 h-1.5 rounded-full bg-[#17191F] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: "87%" }} />
                    </div>
                    <div className="mt-2 text-[12.5px] text-emerald-400 font-mono">↑ +9 this week</div>
                  </div>

                  <div className="col-span-3 md:col-span-2 rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                    <div className="text-[11.5px] font-mono text-[#6B7280]">INTERVIEW PERF.</div>
                    <div className="mt-1 text-3xl font-semibold text-white">76%</div>
                    <div className="mt-2 flex gap-1 items-end h-10">
                      {[30, 45, 40, 55, 60, 58, 72, 76].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-600/40 to-blue-400" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3 rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11.5px] font-mono text-[#6B7280]">INDUSTRY INSIGHTS</div>
                      <span className="text-[11.5px] font-mono text-blue-400">SOFTWARE ENG.</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { l: "DEMAND", v: "HIGH", t: "text-blue-400" },
                        { l: "SALARY", v: "$118K", t: "text-white" },
                        { l: "GROWTH", v: "+14.2%", t: "text-emerald-400" },
                      ].map((m) => (
                        <div key={m.l} className="rounded-lg border border-[#1C2028] bg-[#08080A] p-2.5">
                          <div className="text-[10.5px] font-mono text-[#6B7280]">{m.l}</div>
                          <div className={`mt-0.5 text-sm font-semibold ${m.t}`}>{m.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3 rounded-xl border border-blue-500/25 bg-gradient-to-br from-blue-500/[0.06] to-transparent p-4">
                    <div className="flex items-center gap-2 text-[12.5px] font-mono text-blue-300">
                      <Sparkles size={12} /> AI RECOMMENDATIONS
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        "Deepen system design fundamentals",
                        "Practice behavioral STAR responses",
                        "Add cloud architecture keywords to résumé",
                      ].map((r, i) => (
                        <div key={r} className="flex items-start gap-2 text-[14px]">
                          <span className="mt-1 w-4 h-4 rounded-md bg-blue-500/10 border border-blue-500/30 grid place-items-center text-blue-300 font-mono text-[11.5px]">{i + 1}</span>
                          <span className="text-[#E5E9F0]">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-6 rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[12.5px] font-mono text-[#6B7280]">RECENT ASSESSMENTS</div>
                      <div className="text-[12.5px] font-mono text-blue-400">View all →</div>
                    </div>
                    <div className="divide-y divide-[#1C2028]">
                      {[
                        { t: "System Design — Distributed Systems", s: 72, k: "2h ago" },
                        { t: "React Hooks & Patterns", s: 84, k: "Yesterday" },
                        { t: "SQL Query Optimization", s: 68, k: "3d ago" },
                      ].map((a) => (
                        <div key={a.t} className="flex items-center gap-3 py-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#08080A] border border-[#1C2028] grid place-items-center text-blue-400">
                            <Target size={12} />
                          </div>
                          <div className="flex-1">
                            <div className="text-[14.5px] text-white">{a.t}</div>
                            <div className="text-[11.5px] font-mono text-[#6B7280]">{a.k}</div>
                          </div>
                          <div className="text-[14.5px] font-semibold text-white">{a.s}%</div>
                          <div className="w-24 h-1 rounded-full bg-[#17191F] overflow-hidden hidden sm:block">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${a.s}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
