export const metadata = {
  title: "Resume Builder",
  description: "Build a professional, ATS-friendly resume with multiple templates.",
};

export default function ResumeLayout({ children }) {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">{children}</div>
    </section>
  );
}
