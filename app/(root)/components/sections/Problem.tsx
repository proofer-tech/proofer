import React from "react";

export default function Problem() {
  return (
    <section className="page snap" id="problem" data-sec="문제">
      <div className="wrap center">
        <div className="eyebrow reveal">PROBLEM</div>
        <h2
          className="reveal d1"
          style={{ fontSize: "clamp(23px,3.2vw,34px)", marginTop: 6 }}
        >
          일하다 보면, 이런 순간 있으시죠?
        </h2>
        <div className="bubbles">
          <div className="bubble left">
            &quot;이 일만 하면 왜 이렇게까지 진이 빠지는지 모르겠어.&quot;
          </div>
          <div className="bubble right">
            &quot;이건 누가 나 대신 좀 해줬으면.&quot;
          </div>
          <div className="bubble left">
            &quot;분명 저번에 했는데, 왜 또 똑같은 일을 하고 있지?&quot;
          </div>
        </div>
        <p
          className="closing reveal d3"
          style={{
            marginTop: 44,
            fontSize: "clamp(16px,2vw,21px)",
            fontWeight: 400,
            color: "var(--gray)",
          }}
        >
          <span id="closeText">
            익숙하시다면, 바로 그 지점부터{" "}
            <span className="hl">프루퍼가 함께합니다.</span>
          </span>
          <span className="caret" />
        </p>
      </div>
    </section>
  );
}
