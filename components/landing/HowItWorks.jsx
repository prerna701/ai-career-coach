import Reveal from "./Reveal";

const steps = [
  { n: "01", t: "Create your profile", d: "Tell AI about your industry, experience, skills, and goals." },
  { n: "02", t: "Get personalized insights", d: "Understand your market, salary expectations, skills, and opportunities." },
  { n: "03", t: "Build & apply", d: "Improve your resume and generate tailored cover letters." },
  { n: "04", t: "Practice & improve", d: "Take mock interviews, identify weak areas, and keep improving." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="w-full">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">How It Works</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.03] text-balance">
            From setup to career growth <span className="gradient-text-blue">in minutes.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i + 1} className="card p-6 relative overflow-hidden group">
              <div className="absolute top-3 right-4 text-[64px] font-semibold text-white/[0.04] leading-none select-none">
                {s.n}
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/25 grid place-items-center text-blue-300 font-mono text-[14.5px] font-semibold shadow-[0_0_30px_-6px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_50px_-6px_rgba(59,130,246,0.9)] transition-shadow">
                  {s.n}
                </div>
                <div className="mt-5 text-[17px] text-white font-semibold tracking-tight">{s.t}</div>
                <div className="mt-2 text-[15px] text-[#9298A3] leading-relaxed">{s.d}</div>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-11 -right-3 z-10 text-[#262A34]">→</div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
