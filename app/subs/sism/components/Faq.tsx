import s from "./Faq.module.scss";

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "다른 업체가 만든 시스템에 기능을 붙일 수 있나요?",
    a: "소스와 서버에 접근할 수 있으면 됩니다. 구조와 보안 상태를 먼저 보고, 기존 화면에 붙일지 따로 만들어 연결할지 정합니다.",
  },
  {
    q: "견적서에 금액 대신 범위가 적혀 오는 이유가 있나요?",
    a: "기능 개발은 연동할 대상과 예외 상황에 따라 공수가 크게 달라집니다. 처음에는 범위로 드리고, 계약 전에 기능 목록을 확정하면서 금액도 하나로 정합니다.",
  },
  {
    q: "소스 코드와 서버 계정은 누가 갖나요?",
    a: "소스 코드와 서버 계정, 데이터를 어디까지 넘길지 계약서에 적고 오픈할 때 넘깁니다. 유지관리를 저희에게 맡기지 않더라도 다른 업체가 이어받을 수 있게 문서를 남깁니다.",
  },
  {
    q: "유지관리만 맡길 수도 있나요?",
    a: "됩니다. 넘겨받기 전에 소스와 서버 버전, 보안 상태를 살펴보고, 당장 고칠 것과 매달 나눠 고칠 것을 정리해 드립니다.",
  },
  {
    q: "AI 기능도 넣을 수 있나요?",
    a: (
      <>
        문의 분류나 문서 요약, 자료 검색처럼 업무 중에 쓰는 기능은 개발 범위에
        넣을 수 있습니다. 회사 전체의 AI 전환은{" "}
        <a href="https://ax.proofer.tech">프루퍼 AX</a> 에서 따로 안내합니다.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">FAQ</div>
          <h2 className="sism-title">자주 묻는 질문</h2>
        </div>
        <div className={s.list}>
          {QA.map((x) => (
            <details key={x.q} className={s.item} data-reveal="card">
              <summary>
                {x.q}
                <span className={s.plus} aria-hidden="true">
                  +
                </span>
              </summary>
              <div className={s.body}>
                <p>{x.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
