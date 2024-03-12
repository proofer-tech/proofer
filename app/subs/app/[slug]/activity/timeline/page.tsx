"use client";
import React from "react";

export default function Page() {
  return (
    <>
      <p>목적: 이 사람이 어떻게 일해왔는지 전체적으로 보자</p>
      <ul>
        <li>
          summary(가로형 막대그래프)
          <ul>
            <li>commit</li>
            <li>push</li>
            <li>PR</li>
            <li>code-review</li>
            <li>release</li>
          </ul>
        </li>
        <li>
          필터
          <ul>
            <li>레포지토리 기준</li>
            <li>프로젝트 기준(미구현)</li>
          </ul>
        </li>
        <li>정한 기간동안 어떻게 일해오고 있는지</li>
        <li>x 라인 time(일단위)</li>
        <li>데이터 시리즈 사람의 활동</li>
      </ul>
    </>
  );
}
