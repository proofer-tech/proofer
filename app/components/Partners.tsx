"use client";
import { Grid, Group, Image } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import AgentContext from "@/src/contexts/AgentContext";

function Logo({ src }: { src: string }) {
  return (
    <Group justify={"center"} w={"100%"}>
      <Image src={src} alt={src.split("/")[-1]} />
    </Group>
  );
}

export default function Partners() {
  const agentContext = useContext(AgentContext);

  const [span, setSpan] = useState<number>(4);
  useEffect(() => {
    if (agentContext.isDesktop) setSpan(3);
    if (agentContext.isTablet) setSpan(4);
    if (agentContext.isMobile) setSpan(6);
  }, [agentContext]);

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
