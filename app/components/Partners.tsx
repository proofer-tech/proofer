"use client";
import { Grid, Group, Image } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useIsDesktop, useIsMobile, useIsTablet } from "@/hooks/mediaQuery";

function Logo({ src }: { src: string }) {
  return (
    <Group justify={"center"} w={"100%"}>
      <Image src={src} alt={src.split("/")[-1]} />
    </Group>
  );
}

export default function Partners() {
  const isDesktop = useIsDesktop(true);
  const isTablet = useIsTablet(false);
  const isMobile = useIsMobile(false);

  const [span, setSpan] = useState<number>(4);
  useEffect(() => {
    if (isDesktop) setSpan(3);
    if (isTablet) setSpan(4);
    if (isMobile) setSpan(6);
  }, [isDesktop, isTablet, isMobile]);

  return (
    <Grid>
      <Grid.Col span={span}>
        <Logo src="/images/partners/careerday.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/images/partners/planonmars.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/images/partners/mysc.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/images/partners/ingen.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/images/partners/realsite.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/images/partners/stephow.png" />
      </Grid.Col>
    </Grid>
  );
}
