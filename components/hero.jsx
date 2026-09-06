"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sparkles,
  ClipboardList,
  BarChart3,
  FileText,
  PenBox,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Onboard",
    description: "Pick your industry, experience level, and skills — once.",
  },
  {
    icon: BarChart3,
    title: "See analytics",
    description: "Instant salary, demand, and growth charts for your industry.",
  },
  {
    icon: FileText,
    title: "Build resume",
    description: "One-page, ATS-friendly PDF with real clickable links.",
  },
  {
    icon: PenBox,
    title: "Cover letter",
    description: "Tailored to any job description in one click.",
  },
  {
    icon: GraduationCap,
    title: "Take a quiz",
    description: "AI interview questions for your field, with real feedback.",
  },
];

function HowItWorksDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-4xl w-[95vw] max-h-[88vh] overflow-y-auto bg-white text-gray-900 border-gray-200 p-0"
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 sm:p-10">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              How it works
            </div>
            <DialogTitle className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              From profile to placement-ready
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-base mt-1">
              One profile powers every tool below — nothing to fill in twice.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center px-2">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center">
                    <step.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold grid place-items-center">
                    {i + 1}
                  </div>
                </div>
                <div className="mt-3 font-semibold text-gray-900 text-sm">{step.title}</div>
                <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <Link href="/dashboard" className="block pt-8">
            <Button size="lg" className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const HeroSection = () => {
  const imageRef = useRef(null);
  const [showHowItWorks, setShowHowItWorks] = React.useState(false);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="cta-attention px-8 gap-2"
            onClick={() => setShowHowItWorks(true)}
          >
            <Sparkles className="h-4 w-4" />
            See How It Works
          </Button>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/bg.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>

      <HowItWorksDialog open={showHowItWorks} onOpenChange={setShowHowItWorks} />
    </section>
  );
};

export default HeroSection;
