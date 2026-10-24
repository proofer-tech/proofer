"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { isOpenPath, segmentFromPath } from "@/app/subs/ax/segments";

/**
 * 헤더, 페이지, 푸터를 감싸는 루트. 탭을 옮겨도 이 요소는 유지되어 포인트 색(--acc)이 0.4초 보간된다.
 * 스크롤 장면은 라우트가 바뀔 때마다 revert 하고 새 페이지에서 다시 만든다(docs/ax-landing-spec.md 4장).
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const open = isOpenPath(pathname);
  const seg = open ? "open" : segmentFromPath(pathname);

  useGSAP(
    () => {
      // ScrollTrigger 와 장면 코드는 하이드레이션 뒤에 따로 받는다(첫 로드 번들에 싣지 않는다)
      let off: (() => void) | undefined;
      let dead = false;
      import("@/app/subs/ax/components/scenes").then((m) => {
        if (!dead && ref.current) off = m.playScenes(ref.current, seg);
      });
      return () => {
        dead = true;
        off?.();
      };
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={`axw${open ? " light" : ""}`} data-seg={seg}>
      {children}
    </div>
  );
}
