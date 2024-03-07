import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Image,
  Space,
  Stack,
} from "@mantine/core";
import React from "react";

export interface HeaderPortal {
  title: string;
  href: string;
}

export interface HeaderProps {
  isNavbarOpened: boolean;
  portals?: HeaderPortal[];
  onBurgerClick?: () => void;
  onLoginClick?: () => void;
  onInquireClick?: () => void;
}

export default function Header({
  isNavbarOpened,
  onBurgerClick,
  portals = [],
  onLoginClick,
  onInquireClick,
}: HeaderProps) {
  return (
    <>
      <AppShell.Header>
        <Container display={"flex"} h={"100%"}>
          <Group h="100%" px="md" style={{ flex: 1 }}>
            <Group justify="space-between" style={{ flex: 1 }}>
              <Anchor href={"/"} underline="never">
                <Button
                  variant={"transparent"}
                  style={{ width: "2em", height: "2em" }}
                  p={0}
                >
                  <Image
                    src="/images/branding.svg"
                    alt="프루퍼 로고"
                    width={"100%"}
                  />
                </Button>
              </Anchor>
              <Group justify="space-between" style={{ flex: 1 }}>
                <Group ml="xl" gap={"2em"} visibleFrom="sm">
                  {portals.map((menu, idx) => (
                    <Anchor
                      key={`${menu.title}-${idx}`}
                      c="var(--color-foreground)"
                      href={menu.href}
                      underline={"never"}
                    >
                      {menu.title}
                    </Anchor>
                  ))}
                </Group>
                {onLoginClick && (
                  <Button
                    variant="subtle"
                    visibleFrom="sm"
                    onClick={onLoginClick}
                  >
                    로그인
                  </Button>
                )}
              </Group>
            </Group>
            <Group>
              {onInquireClick && (
                <Button onClick={onInquireClick}>무료상담 신청</Button>
              )}
              {onBurgerClick && (
                <Burger
                  opened={isNavbarOpened}
                  onClick={() => onBurgerClick()}
                  hiddenFrom="sm"
                  size="sm"
                />
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        <Stack gap={"xs"}>
          {portals.map((menu, idx) => (
            <Anchor
              key={`${menu.title}-${idx}`}
              c="var(--color-foreground)"
              href={menu.href}
            >
              {menu.title}
            </Anchor>
          ))}
        </Stack>
        <Space h="xl" />
        {onLoginClick && (
          <Button variant="subtle" onClick={onLoginClick}>
            로그인
          </Button>
        )}
      </AppShell.Navbar>
    </>
  );
}
