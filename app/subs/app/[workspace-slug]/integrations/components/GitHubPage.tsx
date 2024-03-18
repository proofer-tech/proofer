"use client";
import {
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
import { InferSelectModel } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { apiFetcher } from "@/src/swr";
import useSWRImmutable from "swr/immutable";
import { IconChevronRight } from "@tabler/icons-react";
import { Installation } from "@/app/subs/app/[workspace-slug]/api/github/installations/[installation-id]/route";
import { notFound, useRouter } from "next/navigation";
import { GlobalAlertContext } from "@/app/components/GlobalAlert";

interface GitHubPageProps {
  workspace: InferSelectModel<typeof Workspace>;
  pathBlocks: string[];
}

function GitHubInstallationDetailPage({
  workspace,
  pathBlocks,
}: GitHubPageProps) {
  const router = useRouter();
  const alertContext = useContext(GlobalAlertContext);
  const [installationId] = pathBlocks;
  const installationAPIPath = generateAppPath(
    `/${workspace.slug}/api/github/installations/${installationId}`,
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
          <Title order={5}>정말 해제하시겠습니까?</Title>
          <Text>
            연동을 해제할 경우 지금까지의 기록도 함께 제거되며
            <br />
            다시 되돌릴 수 없습니다.
          </Text>
          <Group justify={"end"} w={"100%"}>
            <Button
              variant={"light"}
              color={"red"}
              onClick={() => doUninstall()}
            >
              해제합니다
            </Button>
            <Button onClick={() => alertContext.close()}>
              해제하지 않습니다
            </Button>
          </Group>
        </Stack>
      ),
    });
  };

  const doUninstall = async () => {
    setIsPageLoading(true);
    await fetch(installationAPIPath, { method: "DELETE" });
    alertContext.open({
      children: "연동이 해제되었습니다. 잠시 후 소개 페이지로 이동됩니다.",
      closeOnSeconds: 3,
      onClose: () => {
        setIsPageLoading(false);
        router.push(generateAppPath(`/${workspace.slug}/integrations/github`));
      },
    });
  };

  useEffect(() => {
    if (!error) return;
    if (error.status === 404) notFound();
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
                    <Text size={"xs"}>{data.blog}</Text>
                  </Group>
                </Stack>
              </Group>
              <Divider />
              <Stack gap={0} h={"100%"}>
                {data.repository_selection === "all" ? (
                  <Center c={"var(--mantine-color-gray-6)"} h={"100%"}>
                    {data.name} 의 모든 저장소에 접근할 수 있습니다.
                  </Center>
                ) : (
                  ""
                )}
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
                앱 연동 해제하기
              </Button>
            </Group>
          </Card.Section>
        </>
      )}
    </>
  );
}

function GitHubInstallationListPage({ workspace }: GitHubPageProps) {
  const installationListAPIPath = generateAppPath(
    `/${workspace.slug}/api/github/installations`,
  );

  return (
    <>
      <LoadingOverlay
        visible={false}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
    </>
  );
}
export default function GitHubPage(props: GitHubPageProps) {
  const [installationId] = props.pathBlocks;
  return installationId
    ? GitHubInstallationDetailPage(props)
    : GitHubInstallationListPage(props);
}
