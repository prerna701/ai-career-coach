import { Check, Mail, Sparkles } from "./icons";
import Reveal from "./Reveal";

export default function CoverLetterSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C2028] to-transparent" />
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="w-full">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Cover Letter AI</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-[54px] font-semibold text-white tracking-[-0.03em] leading-[1.03] text-balance">
            Stop sending the same cover letter <span className="gradient-text-blue">everywhere.</span>
          </h2>
        </Reveal>

        <Reveal delay={2} className="mt-14">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
            <div className="rounded-2xl border border-[#1C2028] bg-[#08080A] overflow-hidden">
              <div className="flex items-center justify-between px-4 h-11 border-b border-[#1C2028] bg-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-400" />
                  <div className="text-[14.5px] font-medium text-white">cover_letter · Acme Technologies</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="chip !py-0.5 !px-2 !text-[11.5px] font-mono">DRAFT</span>
                  <span className="chip !py-0.5 !px-2 !text-[11.5px] font-mono text-blue-300 border-blue-500/30 bg-blue-500/10">
                    <Sparkles size={10} /> AI
                  </span>
                </div>
              </div>

              <div className="p-6 grid sm:grid-cols-2 gap-4 border-b border-[#1C2028]">
                <MetaField label="ROLE" value="Senior Frontend Engineer" />
                <MetaField label="COMPANY" value="Acme Technologies" />
                <MetaField label="LOCATION" value="Remote — US" />
                <MetaField label="TONE" value="Confident, technical" />
              </div>

              <div className="p-6 space-y-3 text-[15px] leading-[1.75] text-[#E5E9F0]">
                <p>Dear <span className="text-blue-400">Acme Hiring Team</span>,</p>
                <p>
                  I&apos;ve spent the last five years building performant, accessible interfaces at scale
                  — most recently leading a{" "}
                  <span className="bg-blue-500/10 border border-blue-500/25 rounded px-1 text-blue-300">
                    React &amp; TypeScript
                  </span>{" "}
                  redesign that reduced load time by <span className="text-blue-400 font-semibold">41%</span>.
                  Your recent work on Acme&apos;s design system is exactly the type of problem I want to
                  keep solving.
                </p>
                <p>
                  I&apos;d bring hands-on <span className="bg-blue-500/10 border border-blue-500/25 rounded px-1 text-blue-300">performance optimization</span>{" "}
                  experience and a background in leading small, cross-functional teams — helping
                  Acme ship faster without compromising quality<span className="caret" />
                </p>
                <div className="pt-2 flex items-center gap-2 text-[12.5px] font-mono text-[#6B7280]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
                  Generating final paragraph…
                </div>
              </div>

              <div className="border-t border-[#1C2028] px-4 h-11 flex items-center justify-between text-[12.5px] font-mono text-[#6B7280]">
                <div>274 words · matches JD 92%</div>
                <div className="flex items-center gap-3">
                  <span>⌘ K to regenerate</span>
                  <span className="text-blue-400">Ready →</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1C2028] bg-[#0D0D0F] p-5 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 grid place-items-center text-blue-400">
                    <Sparkles size={14} />
                  </div>
                  <div className="text-[14.5px] text-white font-semibold">AI Analysis</div>
                </div>
                <span className="chip !py-0.5 !px-2 !text-[11.5px] font-mono">LIVE</span>
              </div>

              <div className="mt-5">
                <div className="text-[12.5px] font-mono text-[#6B7280] mb-2">MATCHED SKILLS</div>
                <div className="space-y-1.5">
                  {["React", "TypeScript", "Performance optimization", "Team leadership"].map((s) => (
                    <div key={s} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1C2028] bg-[#08080A]">
                      <span className="w-5 h-5 rounded-md bg-blue-500/15 border border-blue-500/30 grid place-items-center text-blue-400">
                        <Check size={12} />
                      </span>
                      <span className="text-[14.5px] text-white">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-[#1C2028]">
                <div className="text-[12.5px] font-mono text-[#6B7280] mb-2">JD ALIGNMENT</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-white">92<span className="text-[#9298A3] text-sm">%</span></span>
                  <span className="text-[12.5px] font-mono text-emerald-400">strong</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[#17191F] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-[#1C2028] text-[12.5px] font-mono text-[#6B7280]">
                <div>· Kept under 300 words</div>
                <div>· Mirrors JD tone</div>
                <div>· Includes measurable results</div>
              </div>

              <div className="mt-auto pt-5">
                <button className="btn-ghost w-full justify-center">Regenerate variant</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MetaField({ label, value }) {
  return (
    <div className="rounded-lg border border-[#1C2028] bg-[#0D0D0F] px-3 py-2.5">
      <div className="text-[11.5px] font-mono text-[#6B7280]">{label}</div>
      <div className="mt-0.5 text-[14.5px] text-white">{value}</div>
    </div>
  );
}
