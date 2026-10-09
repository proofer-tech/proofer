import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NotReadyYetLetterProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
  from?: boolean;
}
export default function NotReadyYetLetter({
  title,
  children,
  from,
  ...props
}: NotReadyYetLetterProps) {
  return (
    <div {...props}>
      {title && <p className="text-[1.3em] font-bold">{title}</p>}
      <div className="flex flex-col gap-[1em] py-[1em]">
        <p>
          프루퍼팀은 사용자 여러분께 더 나은 경험을 제공하기 위해 최선을 다하고
          있어요.
        </p>
        <p>
          조금만 기다려주시면, 곧 여러분의 기대를 충족시킬 수 있는 새롭고
          흥미로운 기능을 선보일 예정입니다.
        </p>
        {children}
        <p>곧 멋진 소식으로 다시 찾아뵙겠습니다!</p>
        {from ? (
          <div className="flex items-center justify-end gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo.svg"
              className="h-[1.5em]"
              alt="프루퍼 로고"
            />
            <p>드림</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <Separator />
      <div className="flex flex-col items-end gap-3 pt-[1em]">
        <p className="text-right text-xs">
          새로운 소식과 유용한 기술 아티클을 제일 먼저 받아보세요.
        </p>
        <a
          href="https://medium.com/proofer-blog/newsletters/measurable-developer"
          target="_blank"
          rel="noreferrer"
        >
          <Button>뉴스레터 구독하기</Button>
        </a>
      </div>
    </div>
  );
}
