import Reveal from "./Reveal";

const items = [
  {
    q: "I stopped jumping between five different tools. AI Career Coach gave me one place to prepare for every part of the job search.",
    name: "Alex Morgan",
    role: "Software Engineer",
    initials: "AM",
  },
  {
    q: "The interview feedback was much more useful than simply seeing whether I got the answer right.",
    name: "Priya Shah",
    role: "Data Analyst",
    initials: "PS",
  },
  {
    q: "The resume suggestions actually understood the kind of roles I was applying for.",
    name: "Jordan Lee",
    role: "Product Designer",
    initials: "JL",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <Reveal className="w-full">
          <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-blue-400">Testimonials</div>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-[54px] font-semibold text-white tracking-[-0.03em] leading-[1.03] text-balance">
            Trusted by people who <span className="gradient-text-blue">actually got the job.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i + 1} className="card p-6 sm:p-7 flex flex-col shine">
              <div className="text-blue-400/50 font-serif text-4xl leading-none">&quot;</div>
              <p className="mt-2 text-[16px] text-[#E5E9F0] leading-[1.7]">{it.q}</p>

              <div className="mt-6 pt-5 border-t border-[#1C2028] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/30 grid place-items-center text-[13.5px] font-semibold text-white">
                  {it.initials}
                </div>
                <div>
                  <div className="text-[14.5px] text-white font-medium">{it.name}</div>
                  <div className="text-[13px] text-[#9298A3]">{it.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 text-blue-400 text-xs">
                  {"★★★★★".split("").map((s, x) => (<span key={x}>{s}</span>))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="mt-6 text-center text-[12.5px] font-mono text-[#6B7280]">
          Placeholder testimonials shown for demo purposes.
        </Reveal>
      </div>
    </section>
  );
}
