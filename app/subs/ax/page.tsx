import React from "react";
import Hero from "@/app/subs/ax/components/sections/Hero";
import Problem from "@/app/subs/ax/components/sections/Problem";
import Approach from "@/app/subs/ax/components/sections/Approach";
import System from "@/app/subs/ax/components/sections/System";
import Lecture from "@/app/subs/ax/components/sections/Lecture";
import Hackathon from "@/app/subs/ax/components/sections/Hackathon";
import Consulting from "@/app/subs/ax/components/sections/Consulting";
import Package from "@/app/subs/ax/components/sections/Package";
import Outcome from "@/app/subs/ax/components/sections/Outcome";
import Faq from "@/app/subs/ax/components/sections/Faq";
import Contact from "@/app/subs/ax/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <Approach />
      <System />
      <Lecture />
      <Hackathon />
      <Consulting />
      <Package />
      <Outcome />
      <Faq />
      <Contact />
    </>
  );
}
