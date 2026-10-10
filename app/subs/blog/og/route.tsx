import { ImageResponse } from "next/og";

// 대표 이미지가 없는 글의 OG 이미지. 제목과 저자만 그린다.
export function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const title = (q.get("title") ?? "프루퍼 블로그").slice(0, 120);
  const author = (q.get("author") ?? "").slice(0, 40);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#fff",
        color: "#111",
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 700 }}>프루퍼 블로그</div>
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.3 }}>
        {title}
      </div>
      <div style={{ fontSize: 32, color: "#666" }}>{author}</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
