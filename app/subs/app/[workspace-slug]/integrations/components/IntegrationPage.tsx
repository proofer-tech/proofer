import { InferSelectModel } from "drizzle-orm";
import { Integration, IntegrationTag } from "@/database/schemas/integration";
import React from "react";
import { Card, Group } from "@mantine/core";
import IntegrationNavbar from "@/app/subs/app/[workspace-slug]/integrations/components/IntegrationNavbar";

interface IntegrationPageProps {
  integration: InferSelectModel<typeof Integration>;
  integrationTags: InferSelectModel<typeof IntegrationTag>[];
  integrateButton?: React.ReactNode;
  children?: React.ReactNode;
}
export default function IntegrationPage({
  integration,
  integrationTags,
  integrateButton,
  children,
}: IntegrationPageProps) {
  return (
    <Group wrap={"nowrap"} align={"top"}>
      <IntegrationNavbar
        integration={integration}
        integrationTags={integrationTags}
        button={integrateButton}
      />
      <Card withBorder radius="md" w={"100%"}>
        {children}
      </Card>
    </Group>
  );
}
