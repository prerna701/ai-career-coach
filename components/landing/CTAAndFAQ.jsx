"use client";

import { useState } from "react";
import { Arrow, Minus, Plus, Sparkles } from "./icons";
import Reveal from "./Reveal";

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(59,130,246,0.08) 40%, transparent 70%)" }}
        />
        <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />
      </div>

      <div className="relative mx-auto max-w-none px-16 sm:px-32 lg:px-48 text-center">
        <Reveal>
          <div className="chip mx-auto">
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-white/90">Your career, upgraded</span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-[-0.035em] leading-[1.02] text-balance">
            Your next opportunity <span className="gradient-text-blue">starts here.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-6 text-[17.5px] sm:text-[19.5px] text-[#9298A3] max-w-2xl mx-auto leading-relaxed">
            Build smarter. Apply better. Interview with confidence.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/register" className="btn-primary w-full sm:w-auto justify-center !py-3 !px-5">
              Start Your Career Journey <Arrow />
            </a>
            <a href="#features" className="btn-ghost w-full sm:w-auto justify-center !py-3 !px-5">
              Explore the Platform
            </a>
          </div>
        </Reveal>
        <Reveal delay={4}>
          <div className="mt-8 text-[13.5px] font-mono text-[#6B7280] uppercase tracking-wider">
            No credit card required · Setup in under 3 minutes
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const faqs = [
  { q: "What is AI Career Coach?", a: "AI Career Coach is an AI-powered workspace that helps you manage your entire job search — resume building & improvement, tailored cover letters, mock interviews with feedback, industry insights, and personalized career development, all from one profile." },
  { q: "How does the AI personalize my experience?", a: "You provide your industry, experience, skills, and career goals during setup. Every module — resume, cover letters, interviews, and insights — uses this shared context so outputs are tuned to your actual career, not generic." },
  { q: "Can I use it for different industries?", a: "Yes. The platform supports a wide range of industries. Insights, question banks, and resume suggestions adapt automatically based on the industry you select." },
  { q: "Can AI improve my existing resume?", a: "Absolutely. Upload or paste your resume and AI will rewrite sections with stronger action verbs, measurable impact, and industry-specific keywords — while giving you an ATS score with per-section feedback." },
  { q: "Can I generate cover letters for specific jobs?", a: "Yes. Paste a job description and AI generates a cover letter aligned with the role, company, and your relevant skills — with a JD match score and matched-skills breakdown." },
  { q: "How does mock interview practice work?", a: "Choose your industry and skills, and AI generates a set of adaptive questions. After each answer you receive scoring on correctness, depth, and clarity, plus a knowledge-gap analysis with recommended study." },
  { q: "Does the platform track my progress?", a: "Yes. Your dashboard tracks career readiness, ATS score, interview performance, assessments, and skill growth over time so you can see exactly how you're improving." },
];

export function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="text-center">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">FAQ</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.02] text-balance">
            Answers, before you <span className="gradient-text-blue">ask.</span>
          </h2>
        </Reveal>

        <div className="mt-12 rounded-2xl border border-[#1C2028] bg-[#0A0A0A]/50 backdrop-blur-sm divide-y divide-[#1C2028] overflow-hidden">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="group">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-4 px-5 sm:px-6 py-5 hover:bg-white/[0.02] transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[12.5px] font-mono text-[#6B7280] w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[16.5px] sm:text-[17.5px] text-white font-medium">{f.q}</span>
                  </div>
                  <span className={`w-8 h-8 rounded-full grid place-items-center border transition ${
                    isOpen ? "bg-blue-500/10 border-blue-500/40 text-blue-300 rotate-180" : "border-[#1C2028] text-[#9298A3] group-hover:text-white"
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pl-[62px] text-[16px] leading-[1.7] text-[#9298A3]">
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <div className="animated-border rounded-3xl">
          <div className="relative rounded-[23px] bg-gradient-to-b from-[#0A0A0A] to-[#0D0D0F] overflow-hidden">
            <div className="absolute inset-0 dot-bg opacity-30" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] radial-glow" />

            <div className="relative px-6 sm:px-14 py-16 sm:py-24 text-center">
              <Reveal>
                <div className="chip mx-auto">
                  <Sparkles size={12} className="text-blue-400" />
                  <span>Your career, upgraded</span>
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] leading-[1.03] text-balance">
                  Stop preparing alone.
                  <br />
                  <span className="gradient-text-blue">Start preparing intelligently.</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/register" className="btn-primary w-full sm:w-auto justify-center">
                    Get Started <Arrow />
                  </a>
                  <a href="#features" className="btn-ghost w-full sm:w-auto justify-center">
                    See how it works
                  </a>
                </div>
              </Reveal>
              <Reveal delay={3}>
                <p className="mt-6 text-[14.5px] text-[#9298A3]">
                  AI-powered career development for your next opportunity.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
