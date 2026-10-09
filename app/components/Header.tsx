import React from "react";
import Link from "next/link";
import { IconChevronRight, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export interface HeaderPortal {
  title: string;
  href: string;
}

export interface HeaderProps {
  isNavbarOpened: boolean;
  portals?: readonly HeaderPortal[];
  onBurgerClick?: () => void;
  onInquireClick?: () => void;
  logoSrc?: string;
}

export default function Header({
  isNavbarOpened,
  onBurgerClick,
  portals = [],
  onInquireClick,
  logoSrc,
}: HeaderProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] h-[60px] bg-white">
        <div className="mx-auto flex h-full max-w-[1200px] items-center gap-4 px-4">
          <Link href="/" className="flex size-[2em] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="프루퍼 로고"
              className="h-full w-full object-contain"
            />
          </Link>
          <nav className="ml-8 hidden flex-1 items-center gap-8 md:flex">
            {portals.map((menu, idx) => (
              <a
                key={`${menu.title}-${idx}`}
                href={menu.href}
                className="text-base text-[var(--color-foreground)] no-underline"
              >
                {menu.title}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {onInquireClick && (
              <Button
                onClick={onInquireClick}
                variant="outline"
                className="rounded-full"
              >
                무료상담 신청
              </Button>
            )}
            {onBurgerClick && (
              <button
                type="button"
                aria-label="메뉴"
                aria-expanded={isNavbarOpened}
                onClick={() => onBurgerClick()}
                className="p-1 md:hidden"
              >
                {isNavbarOpened ? <IconX size={20} /> : <IconMenu2 size={20} />}
              </button>
            )}
          </div>
        </div>
      </header>
      <aside
        className={`fixed bottom-0 left-0 top-[60px] z-[100] w-[300px] max-w-full overflow-y-auto border-r bg-white px-1 py-4 md:hidden ${
          isNavbarOpened ? "" : "hidden"
        }`}
      >
        {portals.map((menu, idx) => (
          <a
            key={`${menu.title}-${idx}`}
            href={menu.href}
            onClick={onBurgerClick}
            className="flex items-center justify-between rounded px-3 py-2 text-sm text-black no-underline hover:bg-gray-100"
          >
            {menu.title}
            <IconChevronRight size="0.8em" stroke={1.5} />
          </a>
        ))}
      </aside>
    </>
  );
}
