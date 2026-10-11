import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// 대표 이미지가 없는 글의 OG 이미지. 값은 docs/blog/design.md 6절의 HEX 를 그대로 쓴다.
// next/og 는 woff2 를 못 읽어서 public 의 LINESeedKR-Bd.woff2 를 ttf 로 바꿔 이 폴더에 둔다.
// 천장: 폰트 파일이 3.3MB 다. 부담이 되면 KS X 1001 로 서브셋하되 제목에 드문 글자가 깨질 수 있다.
const font = readFile(
  path.join(process.cwd(), "app/subs/blog/og/LINESeedKR-Bd.ttf"),
);

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const title = (q.get("title") ?? "프루퍼 블로그").slice(0, 120);
  const author = (q.get("author") ?? "").slice(0, 40);
  const origin = new URL(req.url).origin;
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
        color: "#0B1020",
        fontFamily: "LINESeedKR",
        fontWeight: 700,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 12,
          background: "linear-gradient(90deg, #344FE0, #45AF66)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${origin}/assets/images/logo.svg`}
          height={44}
          width={103}
          alt=""
        />
        <div
          style={{
            width: 2,
            height: 28,
            background: "#E9EBF2",
            margin: "0 16px",
          }}
        />
        <div style={{ fontSize: 32, color: "#2B3146" }}>블로그</div>
      </div>
      <div
        style={{
          display: "block",
          lineClamp: 3,
          fontSize: 64,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: author ? "space-between" : "flex-end",
          alignItems: "center",
        }}
      >
        {author && (
          <div style={{ fontSize: 30, color: "#344FE0" }}>{author}</div>
        )}
        <div style={{ fontSize: 24, color: "#5B6172" }}>blog.proofer.tech</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "LINESeedKR", data: await font, weight: 700, style: "normal" },
      ],
    },
  );
}
