import { Brain, Chart, Grid, Refresh } from "./icons";
import Reveal from "./Reveal";

export default function AutomationSection() {
  const steps = [
    { i: <Chart size={16} />, l: "Market Data", d: "Signals across salary, demand, and skills" },
    { i: <Brain size={16} />, l: "AI Analysis", d: "Contextualized for your industry" },
    { i: <Refresh size={16} />, l: "Updated Insights", d: "Refreshed on a scheduled cycle" },
    { i: <Grid size={16} />, l: "Your Dashboard", d: "Always current, never stale" },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="w-full">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Background Intelligence</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] leading-[1.03] text-balance">
            Your career intelligence <span className="gradient-text-blue">stays fresh.</span>
          </h2>
          <p className="mt-5 text-[16.5px] text-[#9298A3] max-w-2xl leading-relaxed">
            Industry insights automatically refresh on a scheduled cycle so your career dashboard
            never becomes stale — you make decisions on today&apos;s market, not last year&apos;s.
          </p>
        </Reveal>

        <Reveal delay={2} className="mt-14">
          <div className="rounded-2xl border border-[#1C2028] bg-[#08080A] p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="hidden md:block absolute top-[26px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent">
                <div className="absolute inset-0 blur-[6px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <div className="absolute top-1/2 -translate-y-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent beam-x" />
              </div>

              {steps.map((s, i) => (
                <div key={s.l} className="relative flex flex-col items-center text-center">
                  <div className="relative w-[52px] h-[52px] rounded-full bg-[#0A0A0A] border border-blue-500/40 grid place-items-center text-blue-300 z-10">
                    {s.i}
                    <span className="absolute -inset-2 rounded-full bg-blue-500/15 blur-md -z-10 pulse-dot" />
                  </div>
                  <div className="mt-4 text-[12.5px] font-mono text-[#6B7280]">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-1 text-[16px] text-white font-semibold">{s.l}</div>
                  <div className="mt-1 text-[14px] text-[#9298A3] max-w-[200px]">{s.d}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-10 pt-6 border-t border-[#1C2028] flex flex-wrap items-center justify-between gap-3 text-[12.5px] font-mono text-[#6B7280]">
              <div className="flex items-center gap-2 text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
                Automatically refreshed
              </div>
              <div>NEXT CYCLE · 22H 14M · SOFTWARE ENGINEERING</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
