import React from "react";

export default function Page() {
  return (
    <>
      <ul>
        <li>코드리뷰 얼마나 하는지</li>
        <li>한 코멘트에 보통 몇글자 쓰는지</li>
        <li>BERT 감정분석(미구현)</li>
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
          Comments(소스 데이터)
          <ul>
            <li>pull request id</li>
            <li>pullrequestreview id</li>
            <li>답 comment</li>
            <li>emoji</li>
            <li>언제 만들어졌는지</li>
          </ul>
        </li>
      </ul>
    </>
  );
}
