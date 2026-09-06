import { Chart, Doc, Mail, Mic, Sparkles, Trend } from "./icons";
import Reveal from "./Reveal";

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="w-full">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Platform</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02] text-balance">
            One AI career platform.<br />
            <span className="text-[#9298A3]">Every step of the journey.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] text-[#9298A3] leading-relaxed">
            Six deeply-integrated modules working from the same profile so every output is personal, accurate, and useful.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-6 gap-4 sm:gap-5">
          <Reveal delay={1} className="col-span-6 lg:col-span-4 card p-6 sm:p-8 relative overflow-hidden shine">
            <FeatureHeader idx="01" icon={<Chart size={16} />} label="Industry Intelligence" />
            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-white tracking-tight text-balance">
              Know where the market <span className="gradient-text-blue">is going.</span>
            </h3>
            <p className="mt-3 max-w-lg text-[16px] text-[#9298A3] leading-relaxed">
              AI-generated insights about your industry: salary ranges, demand, growth, market outlook, top skills, and emerging trends.
            </p>
            <div className="mt-6"><InsightMini /></div>
          </Reveal>

          <Reveal delay={2} className="col-span-6 lg:col-span-2 card p-6 sm:p-8 shine">
            <FeatureHeader idx="02" icon={<Doc size={16} />} label="Resume Builder" />
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Build a resume that <span className="gradient-text-blue">gets noticed.</span>
            </h3>
            <p className="mt-3 text-[15.5px] text-[#9298A3] leading-relaxed">
              Create and improve your resume with AI suggestions tuned to your industry and experience.
            </p>
            <div className="mt-6"><ResumeMini /></div>
          </Reveal>

          <Reveal delay={1} className="col-span-6 lg:col-span-2 card p-6 sm:p-8 shine">
            <FeatureHeader idx="03" icon={<Mail size={16} />} label="Smart Cover Letters" />
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Every application. <span className="gradient-text-blue">Personally tailored.</span>
            </h3>
            <p className="mt-3 text-[15.5px] text-[#9298A3] leading-relaxed">
              Role-specific letters generated from the JD, company, your experience and skills.
            </p>
            <div className="mt-6"><LetterMini /></div>
          </Reveal>

          <Reveal delay={2} className="col-span-6 lg:col-span-4 card p-6 sm:p-8 shine">
            <FeatureHeader idx="04" icon={<Mic size={16} />} label="Mock Interviews" />
            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-white tracking-tight text-balance">
              Practice before the <span className="gradient-text-blue">real interview.</span>
            </h3>
            <p className="mt-3 max-w-lg text-[16px] text-[#9298A3] leading-relaxed">
              AI-generated technical quizzes based on your industry and skills, with real feedback.
            </p>
            <div className="mt-6"><QuizMini /></div>
          </Reveal>

          <Reveal delay={1} className="col-span-6 lg:col-span-3 card p-6 sm:p-8 shine">
            <FeatureHeader idx="05" icon={<Sparkles size={16} />} label="Personalized Feedback" />
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight text-balance">
              Don&apos;t just know what you got wrong. <span className="gradient-text-blue">Know why.</span>
            </h3>
            <p className="mt-3 text-[15.5px] text-[#9298A3] leading-relaxed">
              AI identifies knowledge gaps and recommends the right next step.
            </p>
            <div className="mt-6"><FeedbackMini /></div>
          </Reveal>

          <Reveal delay={2} className="col-span-6 lg:col-span-3 card p-6 sm:p-8 shine">
            <FeatureHeader idx="06" icon={<Trend size={16} />} label="Progress Tracking" />
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              See yourself <span className="gradient-text-blue">getting better.</span>
            </h3>
            <p className="mt-3 text-[15.5px] text-[#9298A3] leading-relaxed">
              Track assessments, interviews, resume health, and career readiness over time.
            </p>
            <div className="mt-6"><ProgressMini /></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureHeader({ idx, icon, label }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 grid place-items-center text-blue-400">
          {icon}
        </span>
        <span className="text-[12.5px] font-mono uppercase tracking-[0.18em] text-[#9298A3]">{label}</span>
      </div>
      <span className="text-[12.5px] font-mono text-[#363B47]">{idx}</span>
    </div>
  );
}

function InsightMini() {
  return (
    <div className="rounded-xl border border-[#1C2028] bg-[#08080A] p-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat k="SALARY" v="$95K–$145K" />
        <Stat k="DEMAND" v="HIGH" accent />
        <Stat k="GROWTH" v="+14.2%" />
      </div>
      <div className="mt-4 h-24 rounded-lg bg-[#0A0A0A] border border-[#1C2028] p-2">
        <svg viewBox="0 0 320 80" className="w-full h-full">
          <defs>
            <linearGradient id="ig1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[10, 30, 50, 70].map((y) => (
            <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#1C2028" strokeDasharray="2 4" />
          ))}
          <path d="M0 60 L30 55 L60 58 L90 45 L120 47 L150 40 L180 34 L210 36 L240 26 L270 22 L300 14 L320 10" fill="none" stroke="#60A5FA" strokeWidth="1.6" />
          <path d="M0 60 L30 55 L60 58 L90 45 L120 47 L150 40 L180 34 L210 36 L240 26 L270 22 L300 14 L320 10 L320 80 L0 80 Z" fill="url(#ig1)" />
        </svg>
      </div>
    </div>
  );
}

function Stat({ k, v, accent }) {
  return (
    <div>
      <div className="text-[11.5px] font-mono text-[#6B7280]">{k}</div>
      <div className={`mt-0.5 text-sm font-semibold ${accent ? "text-blue-400" : "text-white"}`}>{v}</div>
    </div>
  );
}

function ResumeMini() {
  return (
    <div className="relative rounded-xl border border-[#1C2028] bg-[#08080A] p-4 space-y-2">
      <div className="text-[12.5px] font-mono text-[#6B7280]">EXPERIENCE</div>
      <div className="text-[14.5px] text-white">Senior Backend Engineer</div>
      <div className="text-[13.5px] text-[#9298A3]">Acme Technologies · 2022–Present</div>
      <div className="mt-2 space-y-1.5 text-[13.5px]">
        <div className="text-[#C9D0DB]">• Built <mark className="bg-blue-500/20 text-blue-300 px-1 rounded">scalable APIs</mark> for 2M+ users</div>
        <div className="text-[#C9D0DB]">• Reduced latency by <mark className="bg-blue-500/20 text-blue-300 px-1 rounded">32%</mark></div>
      </div>
      <div className="absolute -right-2 -top-2 chip !py-1 !px-2 !text-[11.5px] bg-blue-500/10 border-blue-500/30 text-blue-300">
        <Sparkles size={10} /> Add a measurable result
      </div>
    </div>
  );
}

function LetterMini() {
  return (
    <div className="rounded-xl border border-[#1C2028] bg-[#08080A] p-3 grid grid-cols-3 gap-2 text-[12px] font-mono">
      <MiniBlock label="JOB DESC" lines={4} />
      <div className="flex flex-col items-center justify-center gap-2 text-blue-400">
        <div className="w-8 h-8 rounded-lg border border-blue-500/30 bg-blue-500/10 grid place-items-center">
          <Sparkles size={12} />
        </div>
        <div className="text-[11.5px]">AI ANALYSIS</div>
      </div>
      <MiniBlock label="LETTER" lines={4} accent />
    </div>
  );
}
function MiniBlock({ label, lines, accent }) {
  const widths = [82, 71, 90, 76];
  return (
    <div className={`rounded-lg border ${accent ? "border-blue-500/25 bg-blue-500/[0.04]" : "border-[#1C2028] bg-[#0A0A0A]"} p-2`}>
      <div className={`text-[10.5px] ${accent ? "text-blue-400" : "text-[#6B7280]"}`}>{label}</div>
      <div className="mt-1.5 space-y-1">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`h-1 rounded ${accent ? "bg-blue-500/30" : "bg-[#17191F]"}`} style={{ width: `${widths[i % widths.length]}%` }} />
        ))}
      </div>
    </div>
  );
}

function QuizMini() {
  return (
    <div className="rounded-xl border border-[#1C2028] bg-[#08080A] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12.5px] font-mono text-[#6B7280]">QUESTION 2 / 3</div>
        <div className="flex gap-1">
          <span className="w-6 h-1 rounded bg-blue-500" />
          <span className="w-6 h-1 rounded bg-blue-500" />
          <span className="w-6 h-1 rounded bg-[#17191F]" />
        </div>
      </div>
      <div className="text-[14.5px] text-white leading-snug">
        Which approach provides the best time complexity for searching a sorted array?
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { k: "A", v: "Linear scan" },
          { k: "B", v: "Binary search", correct: true },
          { k: "C", v: "Hash lookup" },
          { k: "D", v: "DFS traversal" },
        ].map((o) => (
          <div key={o.k} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[13.5px] ${
            o.correct ? "border-blue-500/40 bg-blue-500/10 text-white" : "border-[#1C2028] bg-[#0A0A0A] text-[#C9D0DB]"
          }`}>
            <span className={`w-5 h-5 rounded-md grid place-items-center text-[11.5px] font-mono ${o.correct ? "bg-blue-500 text-white" : "bg-[#17191F] text-[#9298A3]"}`}>{o.k}</span>
            {o.v}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackMini() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-red-500/20 bg-red-500/[0.04] p-2.5 text-[13.5px] text-red-200/90 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Wrong: &quot;Uses main thread for I/O&quot;
      </div>
      <div className="flex justify-center">
        <div className="w-px h-4 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="rounded-lg border border-[#1C2028] bg-[#08080A] p-2.5 text-[13.5px] text-[#C9D0DB]">
        <span className="font-mono text-[11.5px] text-[#6B7280]">GAP:</span> Event loop &amp; async execution
      </div>
      <div className="flex justify-center">
        <div className="w-px h-4 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="rounded-lg border border-blue-500/30 bg-blue-500/[0.06] p-2.5 text-[13.5px] text-blue-200 flex items-center gap-2">
        <Sparkles size={12} className="text-blue-400" /> Study: &quot;Node.js Event Loop&quot;
      </div>
    </div>
  );
}

function ProgressMini() {
  const points = [60, 68, 72, 82];
  return (
    <div className="rounded-xl border border-[#1C2028] bg-[#08080A] p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-semibold text-white">82<span className="text-[#9298A3] text-sm">%</span></div>
        <div className="text-[12.5px] font-mono text-emerald-400">↑ +22 in 90d</div>
      </div>
      <div className="mt-3 h-20 relative">
        <svg viewBox="0 0 240 80" className="w-full h-full">
          <defs>
            <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 60 L80 48 L160 42 L240 18" stroke="#60A5FA" strokeWidth="1.8" fill="none" />
          <path d="M0 60 L80 48 L160 42 L240 18 L240 80 L0 80 Z" fill="url(#pg1)" />
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={i * 80} cy={60 - (p - 60) * 2.1} r="3" fill="#0A0A0A" stroke="#60A5FA" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-1 grid grid-cols-4 text-[11.5px] font-mono text-[#6B7280]">
        {points.map((p, i) => (
          <div key={i} className={i === points.length - 1 ? "text-blue-400" : ""}>{p}</div>
        ))}
      </div>
    </div>
  );
}
