import Image from "next/image";
import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.brand}>
          <div className="sism-label">PROOF OF VALUE</div>
          <Image
            src="/assets/images/sism/proofer-logo.svg"
            alt="proofer"
            width={65}
            height={28}
            className={s.logo}
          />
        </div>
        <div className={s.info}>
          <span>프루퍼 주식회사 | 대표 임한솔, 임덕만</span>
          <span>사업자등록번호 337-81-03650</span>
          <span>06121 서울 강남구 강남대로112길 47, 2층 421A호</span>
          <span>
            <a href="mailto:info@proofer.tech">info@proofer.tech</a> |{" "}
            <a href="https://proofer.tech">proofer.tech</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
