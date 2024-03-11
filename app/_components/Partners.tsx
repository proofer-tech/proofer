"use client";
import { Grid, Group, Image } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "@/app/_src/contexts";

function Logo({ src }: { src: string }) {
  return (
    <Group justify={"center"} w={"100%"}>
      <Image src={src} alt={src.split("/")[-1]} />
    </Group>
  );
}

export default function Partners() {
  const pageCtx = useContext(PageContext);

  const [span, setSpan] = useState<number>(4);
  useEffect(() => {
    if (pageCtx.userAgent.isDesktop) setSpan(3);
    if (pageCtx.userAgent.isTablet) setSpan(4);
    if (pageCtx.userAgent.isMobile) setSpan(6);
  }, [pageCtx.userAgent]);

  return (
    <Grid py={"3em"}>
      <Grid.Col span={span}>
        <Logo src="/assets/images/partners/careerday.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/assets/images/partners/planonmars.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/assets/images/partners/mysc.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/assets/images/partners/ingen.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/assets/images/partners/realsite.png" />
      </Grid.Col>
      <Grid.Col span={span}>
        <Logo src="/assets/images/partners/stephow.png" />
      </Grid.Col>
    </Grid>
  );
}
