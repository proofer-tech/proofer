import React from "react";
import Image from "next/image";
import InquireButton from "./InquireButton";

const MENU = [
  { href: "#consulting", label: "컨설팅" },
  { href: "#proof", label: "만든 것들" },
  { href: "#team", label: "팀 소개" },
];

export default function Header() {
  return (
    <header className="site-header" id="site-hd">
      <div className="wrap nav">
        <a href="#top" aria-label="프루퍼 홈">
          <Image
            className="logo"
            src="/assets/images/logo.svg"
            alt="proofer"
            width={140}
            height={31}
            priority
          />
        </a>
        <nav className="menu">
          {MENU.map((m, i) => (
            <a key={`${m.label}-${i}`} href={m.href}>
              {m.label}
            </a>
          ))}
        </nav>
        <InquireButton className="btn btn-primary">무료상담 신청</InquireButton>
      </div>
    </header>
  );
}
