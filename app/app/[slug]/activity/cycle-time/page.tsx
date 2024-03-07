"use client";
import React from "react";

export default function Page() {
  return (
    <>
      <p>목적: 일하는 공정 시간을 확인하자</p>
      <ul>
        <li>
          Cycle Time Average Breakdown
          <ul>
            <li>coding</li>
            <li>pickup</li>
            <li>review</li>
            <li>deploy</li>
          </ul>
        </li>
        <li>
          Cycle Time History Breakdown
          <ul>
            <li>월별</li>
            <li>breakdown</li>
          </ul>
        </li>
        <li>
          정리
          <ul>
            <li>First Commit</li>
            <li>Total Files</li>
            <li>Pull Request created at</li>
            <li>Pull Request reviewed at</li>
            <li>Pull Request merged at</li>
            <li>Total LOC</li>
            <li>Lead time</li>
          </ul>
        </li>
        <li>
          Pull request(소스 데이터)
          <ul>
            <li>pull request id</li>
            <li>pull request title</li>
            <li>전체시간</li>
            <li>현재상태</li>
            <li>언제 만들어졌는지</li>
          </ul>
        </li>
      </ul>
    </>
  );
}
