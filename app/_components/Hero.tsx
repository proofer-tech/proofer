import {
  Button,
  Flex,
  Input,
  Popover,
  Space,
  Stack,
  StackProps,
  Text,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { ElementProps } from "@mantine/core/lib/core";
import { PageContext } from "@/app/_src/contexts";

interface HeroProps extends StackProps, ElementProps<"div"> {
  inquireEmail: string;
  onInquireEmailChange: (text: string) => void;
  onInquireClick: () => void;
}

export default function Hero({
  inquireEmail,
  onInquireEmailChange,
  onInquireClick,
  ...props
}: HeroProps) {
  const pageCtx = useContext(PageContext);
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);

  return (
    <Stack
      align={"center"}
      gap={"min(8vw, 1em)"}
      py={"min(5vw, 48px)"}
      px={"min(1vw, 16px)"}
      {...props}
    >
      <Text
        ta="center"
        size={
          pageCtx.userAgent.isDesktop
            ? "1.3em"
            : pageCtx.userAgent.isTablet
              ? "1em"
              : "0.8em"
        }
        c={"var(--color-darkgray-2)"}
        style={{ whiteSpace: "pre" }}
      >
        {["#DORA Metrics", "#SPACE Framework", "#DevEx Framework"].join(" / ")}
      </Text>
      <Text
        size={pageCtx.userAgent.isDesktop ? "4em" : "2.3em"}
        ta="center"
        lh={1.3}
        variant="gradient"
        fw={700}
        gradient={{
          from: "var(--color-primary)",
          to: "var(--color-secondary)",
          deg: 80,
        }}
      >
        정확한 개발자{pageCtx.userAgent.isMobile ? <br /> : ""} 성과측정을 위한
        <br />
        엔지니어링 매니징 파트너
      </Text>
      <Stack
        gap={4}
        c={"var(--color-darkgray)"}
        maw={pageCtx.userAgent.isDesktop ? "none" : "80%"}
      >
        <Text
          ta={"center"}
          size={pageCtx.userAgent.isDesktop ? "1.3em" : "1em"}
          lh={1.3}
        >
          <span>
            실리콘밸리에서 여러차례 검증된 방법으로 개발자들의 성과평가를 위한
            인사이트를 제공합니다.
          </span>
          <br />
          <span>
            무료 상담을 통한 자세한 온보딩과 14일 무료 평가판으로 높은 성과를
            향한 여정을 시작해보세요.
          </span>
        </Text>
      </Stack>
      <Space h={"md"} />
      <Flex
        w={"100%"}
        direction={pageCtx.userAgent.isDesktop ? "row" : "column"}
        justify={"center"}
        align={pageCtx.userAgent.isDesktop ? "start" : "normal"}
        px={pageCtx.userAgent.isDesktop ? 0 : "2em"}
        gap={8}
      >
        <Input.Wrapper
          description="14일간 무료로 제공됩니다"
          inputWrapperOrder={["input", "description"]}
        >
          <Popover
            opened={isPopoverOpened}
            width={200}
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Input
                placeholder="이메일 입력 ..."
                type={"email"}
                size={pageCtx.userAgent.isDesktop ? "xl" : "lg"}
                value={inquireEmail}
                onChange={(e) => onInquireEmailChange(e.target.value)}
                onFocus={() => setPopoverOpened(true)}
                onBlur={() => setPopoverOpened(false)}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="xs">
                이메일을 입력하고, 무료상담 신청 버튼을 눌러주세요.
              </Text>
            </Popover.Dropdown>
          </Popover>
        </Input.Wrapper>
        <Button
          size={pageCtx.userAgent.isDesktop ? "xl" : "lg"}
          onClick={onInquireClick}
        >
          무료상담 신청
        </Button>
      </Flex>
    </Stack>
  );
}
