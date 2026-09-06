import { Sparkles } from "./icons";
import Reveal from "./Reveal";

export default function Insights() {
  return (
    <section id="insights" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-end">
          <Reveal>
            <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">AI Industry Insights</div>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02]">
              Know your market <br />
              <span className="gradient-text-blue">before you enter it.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-[16.5px] sm:text-[18.5px] text-[#9298A3] leading-relaxed md:pb-2">
              AI Career Coach analyzes your industry and transforms noisy market signals into
              clear, actionable career decisions — updated on a scheduled cycle.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} className="mt-14">
          <div className="rounded-2xl border border-[#1C2028] bg-gradient-to-b from-[#0A0A0A] to-[#0D0D0F] p-4 sm:p-6 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1C2028]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 grid place-items-center text-blue-400">
                  <Sparkles size={14} />
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold text-white">Software Engineering — Industry Report</div>
                  <div className="text-[12.5px] font-mono text-[#6B7280]">GENERATED 2H AGO · NEXT REFRESH IN 22H</div>
                </div>
              </div>
              <div className="chip !text-[12.5px]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
                AI-generated industry intelligence
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5">
              <Metric label="MARKET DEMAND" value="HIGH" tone="accent" />
              <Metric label="AVG SALARY" value="$118K" />
              <Metric label="MARKET GROWTH" value="+14.2%" tone="up" />
              <Metric label="TOP SKILL" value="Cloud Arch." />
              <Metric label="EMERGING" value="Generative AI" tone="accent" />
              <Metric label="OUTLOOK" value="Very Strong" tone="up" />
            </div>

            <div className="mt-5 rounded-xl border border-[#1C2028] bg-[#08080A] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[13.5px] text-white font-semibold">Market growth — last 12 months</div>
                  <div className="text-[11.5px] font-mono text-[#6B7280]">INDEX (BASELINE 100)</div>
                </div>
                <div className="flex items-center gap-2 text-[12.5px] font-mono text-[#9298A3]">
                  <span className="w-2 h-2 rounded-sm bg-blue-500" /> Demand
                  <span className="w-2 h-2 rounded-sm bg-cyan-400 ml-3" /> Salary
                </div>
              </div>
              <BigChart />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }) {
  const cls =
    tone === "accent" ? "text-blue-400" : tone === "up" ? "text-emerald-400" : "text-white";
  return (
    <div className="rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-3.5">
      <div className="text-[11.5px] font-mono text-[#6B7280]">{label}</div>
      <div className={`mt-1.5 text-[18.5px] font-semibold ${cls}`}>{value}</div>
    </div>
  );
}

function BigChart() {
  return (
    <div className="h-56 relative">
      <svg viewBox="0 0 800 220" className="w-full h-full">
        <defs>
          <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 90, 140, 190].map((y) => (
          <line key={y} x1="0" x2="800" y1={y} y2={y} stroke="#17191F" strokeDasharray="2 4" />
        ))}
        {[0, 133, 266, 400, 533, 666, 800].map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="220" stroke="#0D0D0F" />
        ))}

        <path d="M0 170 L67 160 L133 150 L200 165 L266 130 L333 128 L400 105 L466 95 L533 82 L600 70 L666 55 L733 40 L800 30" fill="none" stroke="#60A5FA" strokeWidth="2" />
        <path d="M0 170 L67 160 L133 150 L200 165 L266 130 L333 128 L400 105 L466 95 L533 82 L600 70 L666 55 L733 40 L800 30 L800 220 L0 220 Z" fill="url(#bg1)" />

        <path d="M0 180 L67 175 L133 170 L200 168 L266 155 L333 150 L400 142 L466 130 L533 120 L600 108 L666 100 L733 92 L800 80" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="4 3" />

        <g>
          <circle cx="800" cy="30" r="4" fill="#0A0A0A" stroke="#60A5FA" strokeWidth="2" />
          <line x1="800" x2="800" y1="30" y2="220" stroke="#1C2028" strokeDasharray="2 3" />
        </g>

        {["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Now"].map((m, i) => (
          <text key={m} x={i * 133} y="215" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#6B7280" textAnchor="middle">{m}</text>
        ))}
      </svg>

      <div className="absolute right-4 top-2 text-right">
        <div className="text-[11.5px] font-mono text-[#6B7280]">DEMAND INDEX</div>
        <div className="text-white font-semibold text-lg">142.6</div>
        <div className="text-[11.5px] text-emerald-400 font-mono">↑ +14.2% YoY</div>
      </div>
    </div>
  );
}
