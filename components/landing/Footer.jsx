import Image from "next/image";

const cols = [
  {
    t: "Product",
    l: ["Features", "Resume", "Cover Letters", "Mock Interviews", "Industry Insights"],
  },
  { t: "Company", l: ["About", "Contact", "FAQ"] },
  { t: "Legal", l: ["Privacy", "Terms"] },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-[#1C2028]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="mx-auto max-w-none px-16 sm:px-32 lg:px-48">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Logo" width={120} height={38} className="h-8 w-auto object-contain" />
            </div>
            <p className="mt-4 text-[15.5px] text-[#9298A3] leading-relaxed max-w-md">
              An AI-powered workspace for your entire job search — resume, cover letters, interviews, and insights, personalized.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[12.5px] font-mono text-[#6B7280]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.t}>
              <div className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[#6B7280]">{c.t}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[15px] text-[#C9D0DB] hover:text-white transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-[#1C2028] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-[13.5px] font-mono text-[#6B7280]">
            © 2026 AI Career Coach. Made by Prerna Arora.
          </div>
          <div className="flex items-center gap-4 text-[13.5px] text-[#9298A3]">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
        </div>

        <div
          className="mt-14 select-none text-center overflow-hidden mask-fade-b"
          aria-hidden
        >
          <div className="text-[16vw] leading-[0.85] font-semibold tracking-[-0.05em] bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent">
            AI Career Coach
          </div>
        </div>
      </div>
    </footer>
  );
}
