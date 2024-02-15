"use client";
import React from "react";
import {useDisclosure} from "@mantine/hooks";
import {AppShell} from "@mantine/core";
import Header from "@/app/components/Header";

export default function HomePage() {
    const [opened, {toggle}] = useDisclosure();

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
            padding="md"
        >
            <Header isNavbarOpened={opened} onBurgerClick={toggle}/>
            <AppShell.Main>
                Navbar is only visible on mobile, links that are rendered in the header on desktop are
                hidden on mobile in header and rendered in navbar instead.
            </AppShell.Main>
        </AppShell>
    );
}
