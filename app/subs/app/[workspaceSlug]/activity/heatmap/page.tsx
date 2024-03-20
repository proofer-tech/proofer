import React from "react";

export default function Page() {
  return (
    <>
      <p>목적: 이 사람이 어떤 시간분포로 일하는지 보자</p>
      <ul>
        <li>
          필터(액션별)
          <ul>
            <li>전체</li>
            <li>commit</li>
            <li>push</li>
            <li>PR</li>
            <li>code-review</li>
            <li>release</li>
          </ul>
        </li>
        <li>일주일 중에 언제 일했는지</li>
        <li>평일중에는 주로 몇시에 일하는지</li>
        <li>주말에 언제 일을 하고있는지</li>
      </ul>
    </>
  );
}
