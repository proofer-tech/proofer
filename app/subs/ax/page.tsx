import React from "react";
import Hero from "@/app/subs/ax/components/sections/Hero";
import Problem from "@/app/subs/ax/components/sections/Problem";
import Solution from "@/app/subs/ax/components/sections/Solution";
import Curriculum from "@/app/subs/ax/components/sections/Curriculum";
import Proof from "@/app/subs/ax/components/sections/Proof";
import Signals from "@/app/subs/ax/components/sections/Signals";
import Why from "@/app/subs/ax/components/sections/Why";
import Plans from "@/app/subs/ax/components/sections/Plans";
import Faq from "@/app/subs/ax/components/sections/Faq";
import Contact from "@/app/subs/ax/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Curriculum />
      <Proof />
      <Signals />
      <Why />
      <Plans />
      <Faq />
      <Contact />
    </>
  );
}
