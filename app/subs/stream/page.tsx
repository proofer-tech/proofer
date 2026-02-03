import React from "react";
import Hero from "@/app/subs/stream/components/Hero";
import ValueSection from "@/app/subs/stream/components/ValueSection";
import FeaturesSection from "@/app/subs/stream/components/FeaturesSection";
import UseCasesSection from "@/app/subs/stream/components/UseCasesSection";
import CTASection from "@/app/subs/stream/components/CTASection";
import ContactSection from "@/app/subs/stream/components/ContactSection";
import StreamFooter from "@/app/subs/stream/components/StreamFooter";

export default function Page() {
  return (
    <>
      <Hero />
      <ValueSection />
      <FeaturesSection />
      <UseCasesSection />
      <CTASection />
      <ContactSection />
      <StreamFooter />
    </>
  );
}
