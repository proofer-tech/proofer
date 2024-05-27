import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Image,
  Loader,
  NavLink,
} from "@mantine/core";
import React from "react";
import { IconChevronRight, IconLogin2, IconLogout } from "@tabler/icons-react";
import { useUser } from "@auth0/nextjs-auth0/client";

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
  const userContext = useUser();

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
                  <Image src={logoSrc} alt="프루퍼 로고" width={"100%"} />
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
                <Group visibleFrom={"sm"} px={"0.5em"} align={"center"}>
                  {userContext.isLoading ? (
                    <Box px={"1em"}>
                      <Loader color="blue" type="dots" size={"1em"} />
                    </Box>
                  ) : userContext.user ? (
                    <Anchor
                      href={"/api/auth/logout"}
                      underline={"never"}
                      size={"sm"}
                    >
                      로그아웃
                    </Anchor>
                  ) : (
                    <Anchor
                      href={"/auth/login"}
                      underline={"never"}
                      size={"sm"}
                    >
                      로그인
                    </Anchor>
                  )}
                </Group>
              </Group>
            </Group>
            <Group>
              {onInquireClick && (
                <Button onClick={onInquireClick} radius="md">
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
        <Box py={"1em"}>
          <Divider />
        </Box>
        {userContext.isLoading ? (
          <NavLink
            href={"/api/auth/logout"}
            label={<Loader color="blue" type="dots" size={"1.5em"} />}
          />
        ) : userContext.user ? (
          <NavLink
            rightSection={<IconLogout size={"1em"} />}
            href={"/api/auth/logout"}
            label={"로그아웃"}
            color={"red"}
            c={"red"}
          />
        ) : (
          <NavLink
            rightSection={<IconLogin2 size={"1em"} />}
            href={"/auth/login"}
            label={"로그인"}
          />
        )}
      </AppShell.Navbar>
    </>
  );
}
