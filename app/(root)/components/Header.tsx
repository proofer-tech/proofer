import React from "react";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import InquireButton from "./InquireButton";

const MENU = [
  { href: "#proof", label: "케이스" },
  { href: "#why", label: "차별점" },
  { href: "#engagement", label: "참여방식" },
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
          <a
            href={generateUrl("/", SUB_DOMAIN.ax)}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            AX 교육
            <IconArrowUpRight size={14} style={{ marginLeft: 2 }} />
          </a>
        </nav>
        <InquireButton className="btn btn-primary">무료상담 신청</InquireButton>
      </div>
    </header>
  );
}
