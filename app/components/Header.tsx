import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Image,
  NavLink,
} from "@mantine/core";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";

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
      <AppShell.Header bg={"white"}>
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
                    src={logoSrc}
                    alt="프루퍼 로고"
                    width={"100%"}
                    height={"100%"}
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
                      size={"md"}
                    >
                      {menu.title}
                    </Anchor>
                  ))}
                </Group>
              </Group>
            </Group>
            <Group>
              {onInquireClick && (
                <Button
                  onClick={onInquireClick}
                  radius="xl"
                  variant={"outline"}
                >
                  무료상담 신청
                </Button>
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
        {portals.map((menu, idx) => (
          <NavLink
            key={`${menu.title}-${idx}`}
            href={menu.href}
            label={menu.title}
            rightSection={<IconChevronRight size="0.8em" stroke={1.5} />}
            onClick={onBurgerClick}
          />
        ))}
      </AppShell.Navbar>
    </>
  );
}
