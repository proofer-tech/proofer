import Hero from "@/app/subs/sism/components/Hero";
import Problem from "@/app/subs/sism/components/Problem";
import Scope from "@/app/subs/sism/components/Scope";
import Price from "@/app/subs/sism/components/Price";
import Specialty from "@/app/subs/sism/components/Specialty";
import Industry from "@/app/subs/sism/components/Industry";
import Proof from "@/app/subs/sism/components/Proof";
import Credentials from "@/app/subs/sism/components/Credentials";
import Partner from "@/app/subs/sism/components/Partner";
import Faq from "@/app/subs/sism/components/Faq";
import Contact from "@/app/subs/sism/components/Contact";
import Footer from "@/app/subs/sism/components/Footer";
import Motion from "@/app/subs/sism/Motion";
import { homeMetadata } from "@/app/subs/sism/metadata";

export const metadata = homeMetadata();

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <Scope />
      <Price />
      <Specialty />
      <Industry />
      <Proof />
      <Credentials />
      <Partner />
      <Faq />
      <Contact />
      <Footer />
      <Motion />
    </>
  );
}
