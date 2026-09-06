import HeroSection from "@/components/hero";
import Nav from "@/components/landing/Nav";
import { TrustStrip, ProblemSolution } from "@/components/landing/TrustAndProblem";
import Features from "@/components/landing/Features";
import Personalization from "@/components/landing/Personalization";
import Insights from "@/components/landing/Insights";
import ResumeSection from "@/components/landing/ResumeSection";
import CoverLetterSection from "@/components/landing/CoverLetterSection";
import InterviewSection from "@/components/landing/InterviewSection";
import AutomationSection from "@/components/landing/AutomationSection";
import HowItWorks from "@/components/landing/HowItWorks";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Testimonials from "@/components/landing/Testimonials";
import { CTASection, FAQSection, FinalCTA } from "@/components/landing/CTAAndFAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-900 text-[#F5F7FA] antialiased noise">
      <Nav />
      <main>
        <HeroSection />
        <TrustStrip />
        <ProblemSolution />
        <Features />
        <Personalization />
        <Insights />
        <ResumeSection />
        <CoverLetterSection />
        <InterviewSection />
        <AutomationSection />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />
        <CTASection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
