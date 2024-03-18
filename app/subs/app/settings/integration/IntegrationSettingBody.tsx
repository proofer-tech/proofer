import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import { Divider, ScrollArea, Stack } from "@mantine/core";
import { IntegrationHorizontalCard } from "@/app/subs/app/components/integrations";

export default function IntegrationSettingsBody() {
  const { workspace } = useContext(ProoferInsightContext);
  if (workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />;
  }

  return (
    <ScrollArea>
      <Stack gap={"3em"}>
        <Stack align={"start"} w={"100%"}>
          <Divider label="Opt-In" labelPosition="left" w={"100%"} />
          <IntegrationHorizontalCard
            branding={
              "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/uploads/integrations/1/25231-TnjPtwgBVvRquVRJpKfY61iPU9oHoi.png"
            }
          />
        </Stack>
        <Stack align={"start"} w={"100%"}>
          <Divider label="Others" labelPosition="left" w={"100%"} />
          <IntegrationHorizontalCard
            branding={
              "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/uploads/integrations/1/25231-TnjPtwgBVvRquVRJpKfY61iPU9oHoi.png"
            }
            disabled
          />
          <IntegrationHorizontalCard
            branding={
              "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/uploads/integrations/1/25231-TnjPtwgBVvRquVRJpKfY61iPU9oHoi.png"
            }
            disabled
          />
        </Stack>
      </Stack>
    </ScrollArea>
  );
}
