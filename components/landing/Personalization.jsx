import { Brain, Chart, Doc, Mail, Mic, Target, User } from "./icons";
import Reveal from "./Reveal";

export default function Personalization() {
  const inputs = [
    { i: <Target size={14} />, l: "Industry" },
    { i: <User size={14} />, l: "Experience" },
    { i: <Chart size={14} />, l: "Skills" },
    { i: <Brain size={14} />, l: "Career Goals" },
  ];
  const outputs = [
    { i: <Doc size={14} />, l: "Resume" },
    { i: <Mail size={14} />, l: "Cover Letter" },
    { i: <Mic size={14} />, l: "Interview" },
    { i: <Chart size={14} />, l: "Career Insights" },
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.10), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="text-center w-full mx-auto">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Personalization Engine</div>
          <h2 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-white leading-[1.02] text-balance">
            One profile.<br />
            <span className="gradient-text-blue">Infinite personalization.</span>
          </h2>
          <p className="mt-5 text-[16.5px] sm:text-[18.5px] text-[#9298A3] leading-relaxed max-w-2xl mx-auto">
            Your context flows into every module — so what comes out isn&apos;t generic. It&apos;s yours.
          </p>
        </Reveal>

        <Reveal delay={2} className="mt-16">
          <div className="relative rounded-3xl border border-[#1C2028] bg-[#0A0A0A]/50 backdrop-blur-sm p-6 sm:p-10 overflow-hidden noise">
            <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center">
              <div className="space-y-3">
                <div className="text-[12.5px] font-mono text-[#6B7280] uppercase tracking-wider mb-2">Your Context</div>
                {inputs.map((n) => (
                  <Node key={n.l} icon={n.i} label={n.l} side="left" />
                ))}
              </div>

              <div className="relative flex flex-col items-center">
                <svg className="hidden md:block absolute -left-24 top-1/2 -translate-y-1/2 w-24 h-[360px]" viewBox="0 0 100 360" preserveAspectRatio="none">
                  {[40, 130, 230, 320].map((y, i) => (
                    <g key={i}>
                      <path d={`M0 ${y} C 50 ${y}, 60 180, 100 180`} stroke="url(#lp1)" strokeWidth="1" fill="none" />
                    </g>
                  ))}
                  <defs>
                    <linearGradient id="lp1" x1="0" x2="100" y1="0" y2="0">
                      <stop stopColor="#1C2028" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="hidden md:block absolute -right-24 top-1/2 -translate-y-1/2 w-24 h-[360px]" viewBox="0 0 100 360" preserveAspectRatio="none">
                  {[40, 130, 230, 320].map((y, i) => (
                    <g key={i}>
                      <path d={`M0 180 C 40 180, 50 ${y}, 100 ${y}`} stroke="url(#lp2)" strokeWidth="1" fill="none" />
                    </g>
                  ))}
                  <defs>
                    <linearGradient id="lp2" x1="0" x2="100" y1="0" y2="0">
                      <stop stopColor="#3B82F6" />
                      <stop offset="1" stopColor="#1C2028" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="animated-border p-[1px] rounded-full">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-[#0D0D0F] to-[#0A0A0A] grid place-items-center border border-blue-500/30">
                    <div className="absolute inset-3 rounded-full border border-blue-500/15" />
                    <div className="absolute inset-6 rounded-full border border-blue-500/10" />
                    <div className="text-center">
                      <div className="relative w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/40 grid place-items-center text-blue-300 mx-auto">
                        <Brain size={18} />
                      </div>
                      <div className="mt-3 text-[12.5px] font-mono uppercase tracking-wider text-blue-300">AI Coach</div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/10 blur-2xl" />
                  </div>
                </div>
                <div className="mt-4 chip !text-[12.5px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
                  Reasoning
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[12.5px] font-mono text-[#6B7280] uppercase tracking-wider mb-2 md:text-right">Personalized Outputs</div>
                {outputs.map((n) => (
                  <Node key={n.l} icon={n.i} label={n.l} side="right" />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Node({ icon, label, side }) {
  return (
    <div className={`flex items-center gap-3 ${side === "right" ? "md:flex-row-reverse md:text-right" : ""}`}>
      <div className="w-9 h-9 rounded-lg border border-[#1C2028] bg-[#0D0D0F] grid place-items-center text-[#9298A3]">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-white font-medium">{label}</div>
        <div className="text-[12.5px] font-mono text-[#6B7280]">
          {side === "left" ? "input" : "output"}
        </div>
      </div>
    </div>
  );
}
