import React from "react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { useChannelIOApi } from "react-channel-plugin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BaseModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
  title: React.ReactNode;
  // 닫기 버튼, Esc, 바깥 클릭으로 닫을 수 없는 모달이다.
  locked?: boolean;
  children: React.ReactNode;
}

function BaseModal({
  isOpened,
  onCloseClick,
  title,
  locked = false,
  children,
}: BaseModalProps) {
  const prevent = locked ? (e: Event) => e.preventDefault() : undefined;
  return (
    <Dialog open={isOpened} onOpenChange={(open) => !open && onCloseClick()}>
      <DialogContent
        aria-describedby={undefined}
        className={locked ? "[&>button:last-child]:hidden" : undefined}
        onEscapeKeyDown={prevent}
        onPointerDownOutside={prevent}
        onInteractOutside={prevent}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[1.3em] font-bold leading-normal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/branding.svg"
              alt="프루퍼 로고"
              className="h-[1em] w-[1em]"
            />
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

interface InquireCompletedModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
}

export function InquireCompletedModal({
  isOpened,
  onCloseClick,
}: InquireCompletedModalProps) {
  return (
    <BaseModal
      isOpened={isOpened}
      onCloseClick={onCloseClick}
      title="상담신청이 완료되었습니다."
    >
      <p>
        입력해주신 연락처로 업무일 기준 2일내에 최대한 빠르게 연락드리겠습니다!
      </p>
    </BaseModal>
  );
}

interface NotReadyYetModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
}

export function NotReadyYetModal({
  isOpened,
  onCloseClick,
}: NotReadyYetModalProps) {
  return (
    <BaseModal
      isOpened={isOpened}
      onCloseClick={onCloseClick}
      title="아직 준비중인 기능이에요."
    >
      <NotReadyYetLetter
        from={false}
        style={{ color: "var(--color-darkgray)" }}
      />
    </BaseModal>
  );
}

interface ServiceEndedModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
}

export function ServiceEndedModal({
  isOpened,
  onCloseClick,
}: ServiceEndedModalProps) {
  const { showMessenger } = useChannelIOApi();
  return (
    <BaseModal
      isOpened={isOpened}
      onCloseClick={onCloseClick}
      title="서비스가 종료되었습니다."
      locked
    >
      <div className="flex flex-col gap-3">
        <p>
          관심 보내주셔서 감사합니다. 서비스의 히스토리를 포함한 문의는 아래
          문의하기를 통해 부탁드리겠습니다.
        </p>
        <Button onClick={() => showMessenger()}>문의하기</Button>
      </div>
    </BaseModal>
  );
}

interface AnnouncementModalProps {
  title: React.ReactNode;
  content: React.ReactNode;
  isOpened: boolean;
  onCloseClick: () => void;
}

export function AnnouncementModal({
  title,
  content,
  isOpened,
  onCloseClick,
}: AnnouncementModalProps) {
  const { showMessenger } = useChannelIOApi();
  return (
    <BaseModal
      isOpened={isOpened}
      onCloseClick={onCloseClick}
      title={title}
      locked
    >
      <div className="flex flex-col gap-3">
        <p>{content}</p>
        <p>문의는 아래 문의하기를 통해 부탁드리겠습니다.</p>
        <Button onClick={() => showMessenger()}>문의하기</Button>
      </div>
    </BaseModal>
  );
}
