import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { WorkspaceMember } from "@/database/schemas/workspace";
interface SearchByMemberContextToolsProps {
  targetId?: number;
  relationIds?: number[];
  setTargetId?: (targetId: number) => void;
  setRelationIds?: (relationIds: number[]) => void;
}

export const searchByMemberContextTools: SearchByMemberContextToolsProps = {
  get targetId() {
    const targetId =
      typeof window === "undefined"
        ? ""
        : window.localStorage.getItem("SearchByMemberContext.target");
    return targetId ? parseInt(targetId) : undefined;
  },
  get relationIds() {
    const relationIds =
      typeof window === "undefined"
        ? ""
        : window.localStorage.getItem("SearchByMemberContext.relations");
    return relationIds ? JSON.parse(relationIds) : undefined;
  },

  setTargetId: (targetId: number) =>
    typeof window === "undefined"
      ? ""
      : window.localStorage.setItem(
          "SearchByMemberContext.target",
          targetId.toString(),
        ),
  setRelationIds: (relationIds: number[]) =>
    typeof window === "undefined"
      ? ""
      : window.localStorage.setItem(
          "SearchByMemberContext.relations",
          JSON.stringify(relationIds),
        ),
};
export interface SearchByMemberContextProps {
  target?: InferSelectModel<typeof WorkspaceMember>;
  relations?: InferSelectModel<typeof WorkspaceMember>[];
  setTarget?: (target: InferSelectModel<typeof WorkspaceMember>) => void;
  setRelations?: (
    relations: InferSelectModel<typeof WorkspaceMember>[],
  ) => void;
  isLoading: boolean;
}

const SearchByMemberContext = createContext<SearchByMemberContextProps>({
  isLoading: true,
});

export default SearchByMemberContext;
