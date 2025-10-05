"use client";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import Image from "next/image";
import Link from "next/link";
import { features } from "../data/features";
import { faqs } from "../data/faq";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-900 text-gray-100">
      {/* Background grid overlay */}
      <div className="grid-background absolute inset-0 opacity-20 pointer-events-none"></div>

      <HeroSection />

      {/* Features */}
      <section className="w-full py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-16">
            Powerful features for your career growth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border border-neutral-800 bg-neutral-950/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-primary/50 transition duration-500"
              >
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <div className="text-primary transform group-hover:scale-110 transition duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-20 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center max-w-4xl mx-auto">
            {[
              ["50+", "Industries Covered"],
              ["100+", "Interview Questions"],
              ["95%", "Success Rate"],
              ["24/7", "AI Support"],
            ].map(([stat, label], i) => (
              <div
                key={i}
                className="space-y-2 hover:scale-105 transition duration-300"
              >
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow">
                  {stat}
                </h3>
                <p className="text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-gray-200 bg-clip-text text-transparent">
              How it works
            </h2>
            <p className="text-gray-400">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-neutral-950/40 border border-neutral-800 shadow hover:shadow-primary/20 transition duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            What our users say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {testimonial.map((t, index) => (
              <Card
                key={index}
                className="bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      width={48}
                      height={48}
                      src={t.image}
                      alt={t.author}
                      className="rounded-full border border-primary/30"
                    />
                    <div>
                      <p className="font-semibold">{t.author}</p>
                      <p className="text-sm text-gray-400">{t.role}</p>
                      <p className="text-sm text-primary">{t.company}</p>
                    </div>
                  </div>
                  <blockquote className="italic text-gray-300 relative">
                    “{t.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent blur-3xl"></div>
        <div className="relative container mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto p-10 rounded-3xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-gray-200 bg-clip-text text-transparent">
              Ready to accelerate your career?
            </h2>
            <p className="text-lg text-gray-300">
              Join thousands of professionals growing with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-lg rounded-full shadow-md hover:shadow-primary/40 transition animate-bounce"
              >
                Start your journey today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
