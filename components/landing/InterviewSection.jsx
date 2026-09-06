import { Arrow, Mic, Play, Sparkles } from "./icons";
import Reveal from "./Reveal";

export default function InterviewSection() {
  return (
    <section id="interview" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full radial-glow" />
      </div>

      <div className="relative mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="text-center w-full mx-auto">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Mock Interviews</div>
          <h2 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-white leading-[1.02] text-balance">
            Walk into interviews <span className="gradient-text-blue">prepared.</span>
          </h2>
          <p className="mt-5 text-[16.5px] text-[#9298A3] max-w-xl mx-auto leading-relaxed">
            Adaptive AI-generated questions, instant feedback, and knowledge-gap detection — the
            feedback loop that actually makes you better.
          </p>
        </Reveal>

        <Reveal delay={2} className="mt-14">
          <div className="rounded-2xl border border-[#1C2028] bg-gradient-to-b from-[#0A0A0A] to-[#0D0D0F] overflow-hidden shadow-[0_60px_140px_-30px_rgba(0,0,0,0.9),0_0_80px_-20px_rgba(59,130,246,0.35)]">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 h-14 border-b border-[#1C2028]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 grid place-items-center text-blue-400">
                  <Mic size={14} />
                </div>
                <div>
                  <div className="text-[14.5px] font-semibold text-white">Frontend Engineering — Mock Interview</div>
                  <div className="text-[12.5px] font-mono text-[#6B7280]">Adaptive session · JS · React</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-[13.5px] font-mono text-[#9298A3]">Question <span className="text-white">2</span> / 3</div>
                <div className="flex gap-1">
                  <span className="w-6 h-1 rounded bg-blue-500" />
                  <span className="w-6 h-1 rounded bg-blue-500" />
                  <span className="w-6 h-1 rounded bg-[#17191F]" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-0">
              <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#1C2028]">
                <div className="text-[12.5px] font-mono text-[#6B7280]">QUESTION</div>
                <h3 className="mt-2 text-xl sm:text-2xl text-white font-semibold tracking-tight leading-snug">
                  Explain how JavaScript handles asynchronous operations. What happens when you use setTimeout inside a loop?
                </h3>

                <div className="mt-6 rounded-xl border border-[#1C2028] bg-[#08080A] p-4">
                  <div className="text-[12.5px] font-mono text-[#6B7280] mb-2">YOUR ANSWER</div>
                  <p className="text-[15px] text-[#C9D0DB] leading-relaxed">
                    JavaScript uses the main thread to handle async operations. setTimeout puts
                    tasks in a queue and runs them one by one — the loop finishes and then each
                    timer executes with the current value of the loop variable.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[12.5px] font-mono text-[#6B7280]">
                    <span>28 seconds · voice-to-text</span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Recorded
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="btn-primary !py-2.5">
                    <Play size={12} /> Next question
                  </button>
                  <button className="btn-ghost !py-2.5">Retry answer</button>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-[#08080A]/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 grid place-items-center text-blue-400">
                    <Sparkles size={14} />
                  </div>
                  <div className="text-[14.5px] text-white font-semibold">AI Feedback</div>
                  <span className="ml-auto chip !py-0.5 !px-2 !text-[11.5px] font-mono">LIVE</span>
                </div>

                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
                  <div className="flex items-center gap-2 text-[12.5px] font-mono text-red-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    KNOWLEDGE GAP DETECTED
                  </div>
                  <p className="mt-2 text-[14.5px] text-[#E5E9F0] leading-relaxed">
                    Review event loop behavior and asynchronous execution — JavaScript is
                    single-threaded but uses a task queue &amp; microtask queue, not &quot;the main thread&quot;
                    for I/O.
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-[#1C2028] bg-[#0D0D0F] p-4">
                  <div className="text-[12.5px] font-mono text-[#6B7280] mb-2">SCORE BREAKDOWN</div>
                  {[
                    { l: "Correctness", v: 55 },
                    { l: "Depth", v: 40 },
                    { l: "Clarity", v: 78 },
                  ].map((r) => (
                    <div key={r.l} className="mt-2">
                      <div className="flex items-center justify-between text-[13px] text-[#C9D0DB]">
                        <span>{r.l}</span>
                        <span className="font-mono text-[#9298A3]">{r.v}%</span>
                      </div>
                      <div className="mt-1 h-1 rounded-full bg-[#17191F] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${r.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#cta" className="mt-5 flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/[0.06] px-4 py-3 hover:bg-blue-500/[0.1] transition">
                  <div>
                    <div className="text-[12.5px] font-mono text-blue-300">RECOMMENDED STUDY</div>
                    <div className="text-[14.5px] text-white font-medium">Node.js Event Loop &amp; Microtasks</div>
                  </div>
                  <Arrow size={16} className="text-blue-400" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
