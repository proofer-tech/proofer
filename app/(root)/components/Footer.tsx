import React from "react";
import Image from "next/image";
import { IconArticle } from "@tabler/icons-react";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <Image
            className="logo"
            src="/assets/images/logo.svg"
            alt="proofer"
            width={100}
            height={22}
          />
          <div>
            <b>프루퍼 주식회사</b> · 대표 임한솔, 임덕만
          </div>
          <div>사업자등록번호 337-81-03650</div>
          <div>벤처기업확인 제20260722010048호</div>
          <div>서울 강남구 강남대로112길 47, 2층 421A</div>
          <Image
            className="venture-mark"
            src="/assets/images/venturein/벤처기업확인마크_가로조합.png"
            alt="벤처확인기업"
            width={380}
            height={111}
          />
        </div>
        <div>
          <div>
            <b>연락처</b>
          </div>
          <div>info@proofer.tech</div>
          <div>
            <a
              href={generateUrl("/", SUB_DOMAIN.ax)}
              target="_blank"
              rel="noreferrer"
            >
              프루퍼 AX
            </a>
          </div>
          <div className="soc">
            <a
              href="https://www.linkedin.com/showcase/proofer-tech"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18H5.67V9.67h2.67V18zM7 8.5A1.55 1.55 0 115.45 7 1.55 1.55 0 017 8.5zM18.34 18h-2.67v-4.05c0-.97-.02-2.21-1.35-2.21s-1.56 1.05-1.56 2.14V18H10.1V9.67h2.56v1.14h.04a2.81 2.81 0 012.53-1.39c2.71 0 3.21 1.78 3.21 4.1V18z" />
              </svg>
            </a>
            <a
              href="https://blog.proofer.tech"
              target="_blank"
              rel="noreferrer"
              aria-label="프루퍼 블로그"
            >
              <IconArticle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
