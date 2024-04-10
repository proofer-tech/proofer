"use client";
import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  LoadingOverlay,
  NavLink,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { generateAppPath } from "@/src/path";
import { apiFetcher } from "@/src/swr";
import useSWRImmutable from "swr/immutable";
import { IconChevronRight } from "@tabler/icons-react";
import { Installation } from "@/app/subs/app/[workspaceSlug]/api/github/installations/[installationId]/route";
import { useRouter } from "next/navigation";
import { GlobalAlertContext } from "@/app/components/GlobalAlert";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import useSWR from "swr";
import { InferSelectModel } from "drizzle-orm";
import { GitHubInstallation } from "@/database/schemas/github/raw";
import GitHubInstallationCard from "@/app/subs/app/[workspaceSlug]/integrations/components/GitHub/GitHubInstallationCard";

export function GitHubInstallationDetailCardSection({
  installationId,
}: {
  installationId: number;
}) {
  const { workspace } = useContext(ProoferInsightContext);
  const router = useRouter();
  const alertContext = useContext(GlobalAlertContext);
  const installationAPIPath = generateAppPath(
    `/api/github/installations/${installationId}`,
    workspace?.instance.slug,
  );

  const { data, error, isLoading } = useSWRImmutable<Installation>(
    installationAPIPath,
    apiFetcher,
  );
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  const uninstall = () => {
    alertContext.open({
      children: (
        <Stack w={"100%"} px={"1em"}>
          <Title order={5}>Are you sure you want to disconnect?</Title>
          <Text>
            If you cancel the linkage, the records up to now will also be
            removed and can not turning back.
          </Text>
          <Group justify={"end"} w={"100%"}>
            <Button
              variant={"light"}
              color={"red"}
              onClick={() => doUninstall()}
            >
              Disconnect
            </Button>
            <Button onClick={() => alertContext.close()}>Do nothing</Button>
          </Group>
        </Stack>
      ),
    });
  };

  const doUninstall = async () => {
    alertContext.close();
    setIsPageLoading(true);
    await fetch(installationAPIPath, { method: "DELETE" });
    alertContext.open({
      children:
        "Integration is disconnected. After a while, you will be taken to the introduction page.",
      variant: "filled",
      closeOnSeconds: 3,
      onClose: () => {
        setIsPageLoading(false);
        router.push(
          generateAppPath("/integrations/github", workspace?.instance.slug),
        );
      },
    });
  };

  useEffect(() => {
    if (!error) return;
    if (error.status === 404) {
      router.push(
        generateAppPath("/integrations/github", workspace?.instance.slug),
      );
    }
  }, [error]);

  return (
    <>
      <LoadingOverlay
        visible={isLoading || isPageLoading}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      {data && (
        <>
          <Card.Section withBorder p={"lg"} h={"100%"}>
            <Stack h={"100%"}>
              <Group>
                <Avatar
                  src={data.avatar_url}
                  size={"xl"}
                  radius={"8px"}
                  style={{ border: "1px solid var(--mantine-color-gray-2)" }}
                />
                <Stack gap={"0.5ex"}>
                  <Stack gap={0}>
                    <Text fw={700}>{data.name}</Text>
                    <Text size={"sm"} c={"var(--mantine-color-gray-6)"}>
                      {data.bio}
                    </Text>
                  </Stack>
                  <Group>
                    <Text size={"xs"}>{data.target_type}</Text>
                    <Anchor href={data.blog} target={"_blank"} size={"xs"}>
                      {data.blog}
                    </Anchor>
                  </Group>
                </Stack>
              </Group>
              <Divider />
              <Stack gap={0} h={"100%"}>
                {data.repositories.map((repo) => (
                  <NavLink
                    key={repo.html_url}
                    href={repo.html_url}
                    target={"_blank"}
                    label={repo.name}
                    description={repo.description}
                    rightSection={
                      <Group>
                        {repo.language && (
                          <Badge size={"xs"} color={"gray"} variant={"light"}>
                            {repo.language}
                          </Badge>
                        )}
                        <IconChevronRight size="1em" />
                      </Group>
                    }
                  />
                ))}
              </Stack>
            </Stack>
          </Card.Section>
          <Card.Section p={"xs"}>
            <Group justify={"end"}>
              <Button
                w={"100%"}
                color={"red"}
                variant="light"
                onClick={() => uninstall()}
              >
                Disconnect
              </Button>
            </Group>
          </Card.Section>
        </>
      )}
    </>
  );
}

export function GitHubInstallationListCardSection({}) {
  const { workspace } = useContext(ProoferInsightContext);
  const installationListAPIPath = generateAppPath(
    "/api/github/installations",
    workspace?.instance.slug,
  );

  const { data, isLoading } = useSWR<
    InferSelectModel<typeof GitHubInstallation>[]
  >(installationListAPIPath, apiFetcher);

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
      <Card.Section inheritPadding py={"lg"} h={"100%"}>
        <Stack gap={"3em"} h={"100%"}>
          {data && data.length !== 0 ? (
            <Stack>
              <Divider label="Opt-In" labelPosition="left" w={"100%"} />
              <Stack gap={"1ex"}>
                {data.map((installation) => (
                  <Anchor
                    key={installation.installation_id}
                    href={`github/${installation.installation_id}`}
                    underline={"never"}
                  >
                    <GitHubInstallationCard installation={installation} />
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          ) : (
            <Center c={"var(--mantine-color-gray-6)"} h={"100%"}>
              Press Connect button to connect integration to Proofer Insight
            </Center>
          )}
        </Stack>
      </Card.Section>
    </>
  );
}
