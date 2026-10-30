import React from "react";
import Shell from "@/app/subs/ax/components/Shell";
import Dock from "@/app/subs/ax/components/Dock";
import Header from "@/app/subs/ax/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Shell>
      <Header />
      {children}
      <Dock />
      <footer className="foot">
        <div className="in">
          <span>프루퍼 주식회사, 대표 임한솔, 임덕만</span>
          <span>사업자등록번호 337-81-03650</span>
          <span>서울 강남구 강남대로112길 47, 2층 421A</span>
          <span>info@proofer.tech</span>
        </div>
      </footer>
    </Shell>
  );
}
