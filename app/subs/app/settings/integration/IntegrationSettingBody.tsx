"use client";
import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import {
  Anchor,
  Divider,
  LoadingOverlay,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { IntegrationHorizontalCard } from "@/app/subs/app/components/integrations";
import useSWR from "swr";
import { generateAppPath } from "@/src/path";
import { apiFetcher } from "@/src/swr";
import { IntegrationDto } from "@/src/data/integration";

export default function IntegrationSettingsBody() {
  const { workspace } = useContext(ProoferInsightContext);

  const { data, error, isLoading } = useSWR<{
    optIn: IntegrationDto[];
    others: IntegrationDto[];
  }>(
    generateAppPath("/api/workspace/integrations", workspace?.instance.slug),
    apiFetcher,
    { isPaused: () => workspace === undefined },
  );

  if (workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"Workspace"} />;
  }

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <ScrollArea>
        <Stack gap={"3em"}>
          {data && (
            <>
              {data.optIn.length > 0 ? (
                <Stack align={"start"} w={"100%"}>
                  <Divider label="Opt-In" labelPosition="left" w={"100%"} />
                  {data.optIn.map((integration) => (
                    <Anchor
                      key={integration.id}
                      href={generateAppPath(
                        `/integrations/${integration.slug}`,
                        workspace.instance.slug,
                      )}
                      underline={"never"}
                      w={"100%"}
                    >
                      <IntegrationHorizontalCard integration={integration} />
                    </Anchor>
                  ))}
                </Stack>
              ) : (
                ""
              )}
              {data.others.length > 0 ? (
                <Stack align={"start"} w={"100%"}>
                  <Divider label="Others" labelPosition="left" w={"100%"} />
                  {data.others.map((integration) => (
                    <Anchor
                      key={integration.id}
                      href={generateAppPath(
                        `/integrations/${integration.slug}`,
                        workspace.instance.slug,
                      )}
                      underline={"never"}
                      w={"100%"}
                    >
                      <IntegrationHorizontalCard integration={integration} />
                    </Anchor>
                  ))}
                </Stack>
              ) : (
                ""
              )}
            </>
          )}
        </Stack>
      </ScrollArea>
    </>
  );
}
