import {
  Anchor,
  Avatar,
  Box,
  Flex,
  Group,
  List,
  Stack,
  Text,
} from "@mantine/core";
import React, { useContext } from "react";
import { IconPhoneCall } from "@tabler/icons-react";
import AgentContext from "@/src/contexts/AgentContext";
import Image from "next/image";

function FooterMenuItem({ children }: any) {
  return <List.Item py={"0.3em"}>{children}</List.Item>;
}

interface FooterProps {
  linkGroups?: { [key: string]: React.ReactNode[] };
}

export default function Footer({ linkGroups }: FooterProps) {
  const agentContext = useContext(AgentContext);
  return (
    <Box py={"3em"} px={"2em"}>
      <Flex
        direction={agentContext.isDesktop ? "row" : "column-reverse"}
        align={"start"}
        justify={agentContext.isDesktop ? "space-between" : "revert"}
        gap={"5em"}
      >
        <Stack gap={"3em"}>
          <Image
            src="/assets/images/logo.svg"
            width={320}
            height={137.2}
            style={{ width: "8em", height: "auto" }}
            alt={"프루퍼 로고"}
          />
          <Stack gap={1}>
            <Text c={"var(--color-darkgray-2)"}>
              서울특별시 마포구 마포대로 122, 602호
            </Text>
            <Text c={"var(--color-darkgray-2)"}>
              사업자등록번호: 327-87-02020
            </Text>
            <Text c={"var(--color-darkgray-2)"}>
              개인정보관리책임자: 홍제형(
              <Anchor
                href="mailto:jay@proofer.tech"
                target="_blank"
                underline="never"
                c={"var(--color-darkgray-2)"}
              >
                jay@proofer.tech
              </Anchor>
              )
            </Text>
          </Stack>
          <Group>
            <IconPhoneCall color="var(--color-darkgray-2)" size={"1em"} />
            <Anchor
              href="tel:031-623-0193"
              target="_blank"
              underline="never"
              c={"var(--color-darkgray-2)"}
            >
              031-623-0193
            </Anchor>
          </Group>
        </Stack>
        <Group
          w={agentContext.isDesktop ? "auto" : "100%"}
          justify={"end"}
          align={"start"}
          gap={"5em"}
          flex={1}
          wrap={"nowrap"}
        >
          {linkGroups &&
            Object.keys(linkGroups).map((k) => (
              <Stack visibleFrom={"sm"} key={`footer-${k}`}>
                <Text fw={700}>{k}</Text>
                <List listStyleType={"none"} style={{ cursor: "pointer" }}>
                  {linkGroups[k].map((n, idx) => (
                    <FooterMenuItem key={idx}>{n}</FooterMenuItem>
                  ))}
                </List>
              </Stack>
            ))}
          <Stack>
            <Text fw={700}>Follow Us On</Text>
            <Group gap={"0.5em"} wrap={"nowrap"}>
              <Anchor
                href="https://medium.com/proofer-blog"
                target="_blank"
                underline="never"
              >
                <Avatar
                  p={"0.1em"}
                  bg={"var(--color-white)"}
                  color={"var(--color-white)"}
                  style={{ border: "1px solid var(--color-lightgray-2)" }}
                >
                  <Image
                    src="/assets/images/bi-medium.png"
                    width={21}
                    height={21}
                    alt="proofer in Medium"
                  />
                </Avatar>
              </Anchor>
              <Anchor
                href={"https://www.linkedin.com/showcase/proofer-tech"}
                target={"_blank"}
                underline={"never"}
              >
                <Avatar
                  p={"0.1em"}
                  bg={"var(--color-white)"}
                  color={"var(--color-white)"}
                  style={{ border: "1px solid var(--color-lightgray-2)" }}
                >
                  <Image
                    src="/assets/images/bi-linkedin.png"
                    width={16}
                    height={16}
                    alt="proofer in linkedin"
                  />
                </Avatar>
              </Anchor>
            </Group>
          </Stack>
        </Group>
      </Flex>
    </Box>
  );
}
