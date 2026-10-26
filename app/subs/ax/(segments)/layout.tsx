import React from "react";
import Image from "next/image";
import Dock from "@/app/subs/ax/components/Dock";
import Header from "@/app/subs/ax/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Dock />
      <footer className="ax-footer">
        <div className="ax-container">
          <div>
            <Image
              src="/assets/images/branding.svg"
              alt="proofer"
              width={23}
              height={24}
            />
            <div className="ax-footer__biz">
              <div>
                <strong>프루퍼주식회사</strong> / 대표 임한솔
              </div>
              <div>사업자등록번호 337-81-03650</div>
              <div>서울 강남구 강남대로112길 47, 2층 421A</div>
            </div>
          </div>
          <div className="ax-footer__contact">
            <div className="ax-footer__contact-label">CONTACT</div>
            <a href="mailto:info@proofer.tech">info@proofer.tech</a>
            <a href="https://proofer.tech">proofer.tech</a>
            <div>ax.proofer.tech</div>
          </div>
        </div>
      </footer>
    </>
  );
}
