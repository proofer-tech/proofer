import React from "react";

/** 펼침 안에는 설명만 둔다. 판단에 쓰는 사실은 밖에 있어야 한다 */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faqs">
      {items.map((item) => (
        <details key={item.q} className="faq">
          <summary>
            {item.q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
