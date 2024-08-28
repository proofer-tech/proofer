import React from "react";

export default function GoogleFormsIframe({ key }: { key: string }) {
  return (
    <iframe
      src={`https://docs.google.com/forms/d/e/${key}/viewform?embedded=true`}
      style={{
        width: "100%",
        height: "3000px",
        border: 0,
      }}
    >
      로드 중…
    </iframe>
  );
}
