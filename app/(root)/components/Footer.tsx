import React from "react";
import Image from "next/image";

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
            <b>프루퍼주식회사</b> · 대표 임한솔
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
              href="https://medium.com/proofer-blog"
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.51-6.42 3.38-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75S21.62 15.17 21.62 12s.53-5.75 1.19-5.75S24 8.83 24 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
