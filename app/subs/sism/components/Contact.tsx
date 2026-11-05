import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import s from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={s.root}>
      <div className="sism-container">
        <div className={s.box} data-m="cta">
          <div className={s.text}>
            <h2 className="sism-title">
              어디서부터 시작해야 할지
              <br />
              막막하신가요?
            </h2>
            <p>
              첫 상담에서 손이 가장 많이 가는 업무를 같이 고르고, 어디까지
              시스템으로 옮길지 정합니다.
            </p>
          </div>
          <AxInquireButton className={s.btn}>무료상담 신청</AxInquireButton>
        </div>
      </div>
    </section>
  );
}
