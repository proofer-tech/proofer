import { PageProps } from "@/src/types/general";

export interface WorkspacePageProps extends PageProps {
  params: {
    workspaceSlug: string;
  };
}
