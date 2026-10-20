import React from "react";

/** 헤드라인을 줄 단위 배열로 받아 <br /> 로 잇는다 */
export default function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </>
  );
}
