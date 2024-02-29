import {
  Anchor,
  Avatar,
  Box,
  Flex,
  Group,
  Image,
  List,
  Stack,
  Text,
} from "@mantine/core";
import React, { useContext } from "react";
import { IconPhoneCall } from "@tabler/icons-react";
import { PageContext } from "@/app/hooks";

function FooterMenuItem({ children }: any) {
  return <List.Item py={"0.3em"}>{children}</List.Item>;
}

interface FooterProps {
  linkGroups?: { [key: string]: React.ReactNode[] };
}

export default function Footer({ linkGroups }: FooterProps) {
  const pageCtx = useContext(PageContext);
  return (
    <Box py={"3em"} px={"2em"}>
      <Flex
        direction={pageCtx.userAgent.isDesktop ? "row" : "column-reverse"}
        align={"start"}
        justify={pageCtx.userAgent.isDesktop ? "space-between" : "revert"}
        gap={"5em"}
      >
        <Stack gap={"3em"}>
          <Image src="/images/logo.svg" w={"8em"} alt={"프루퍼 로고"} />
          <Stack gap={1}>
            <Text c={"var(--color-darkgray-2)"}>
              경기도 광명시 오리로 362, 4층
            </Text>
            <Text c={"var(--color-darkgray-2)"}>
              사업자등록번호: 327-87-02020
            </Text>
            <Text c={"var(--color-darkgray-2)"}>
              개인정보관리책임자: 홍제형(
              <Anchor
                href="mailto:info@campersground.kr"
                target="_blank"
                underline="never"
                c={"var(--color-darkgray-2)"}
              >
                info@campersground.kr
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
          w={pageCtx.userAgent.isDesktop ? "auto" : "100%"}
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
                href="https://medium.com/@proofer.tech"
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
                    src="/images/bi-medium.png"
                    alt="@proofer.tech in Medium"
                  />
                </Avatar>
              </Anchor>
              <Anchor
                href={"https://www.linkedin.com/company/campers-ground-inc"}
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
                    src="/images/bi-linkedin.png"
                    alt="@proofer.tech in linkedin"
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
