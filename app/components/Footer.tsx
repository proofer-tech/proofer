"use client";
import React from "react";
import { IconPhoneCall } from "@tabler/icons-react";
import Image from "next/image";

interface FooterProps {
  linkGroups?: { [key: string]: React.ReactNode[] };
}

const muted = "text-[var(--color-darkgray-2)] no-underline";
const avatarClass =
  "flex size-[38px] items-center justify-center rounded-full border border-[var(--color-lightgray-2)] bg-[var(--color-white)] p-[0.1em]";

export default function Footer({ linkGroups }: FooterProps) {
  return (
    <div className="px-8 py-12">
      <div className="relative flex flex-col-reverse items-start gap-20 min-[1200px]:flex-row min-[1200px]:justify-between">
        <div className="flex flex-col gap-12">
          <Image
            src="/assets/images/logo.svg"
            width={320}
            height={137.2}
            style={{ width: "8em", height: "auto" }}
            alt={"프루퍼 로고"}
          />
          <div className="flex flex-col gap-px">
            <p className={muted}>
              서울특별시 강남구 강남대로112길 47, 2층 421A호
            </p>
            <p className={muted}>
              개인정보관리책임자: 임한솔(
              <a
                href="mailto:hsol@proofer.tech"
                target="_blank"
                className={muted}
                rel="noreferrer"
              >
                hsol@proofer.tech
              </a>
              )
            </p>
          </div>
          <div className="flex items-center gap-4">
            <IconPhoneCall color="var(--color-darkgray-2)" size={"1em"} />
            <a
              href="tel:010-5182-0520"
              target="_blank"
              className={muted}
              rel="noreferrer"
            >
              010-5182-0520
            </a>
          </div>
        </div>
        <div className="absolute top-0 flex w-full flex-1 flex-nowrap items-start justify-end gap-20 min-[768px]:static min-[1200px]:w-auto">
          {linkGroups &&
            Object.keys(linkGroups).map((k) => (
              <div
                className="hidden flex-col gap-4 md:flex"
                key={`footer-${k}`}
              >
                <p className="font-bold">{k}</p>
                <ul className="m-0 cursor-pointer list-none p-0">
                  {linkGroups[k].map((n, idx) => (
                    <li className="py-[0.3em]" key={idx}>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          <div className="flex flex-col gap-4">
            <p className="hidden font-bold md:block">Follow Us On</p>
            <div className="flex flex-nowrap gap-2">
              <a
                href="https://medium.com/proofer-blog"
                target="_blank"
                className={avatarClass}
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/bi-medium.png"
                  width={21}
                  height={21}
                  alt="proofer in Medium"
                />
              </a>
              <a
                href={"https://www.linkedin.com/showcase/proofer-tech"}
                target={"_blank"}
                className={avatarClass}
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/bi-linkedin.png"
                  width={16}
                  height={16}
                  alt="proofer in linkedin"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
