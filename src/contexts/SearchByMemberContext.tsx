import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { WorkspaceMember } from "@/database/schemas/workspace";
interface SearchByMemberContextToolsProps {
  targetId?: number;
  relationIds?: number[];
  setTarget?: (targetId: number) => void;
  setRelations?: (relationIds: number[]) => void;
}

export const searchByMemberContextTools: SearchByMemberContextToolsProps = {
  get targetId() {
    const targetId = window.localStorage.getItem(
      "SearchByMemberContext.target",
    );
    return targetId ? parseInt(targetId) : undefined;
  },
  get relationIds() {
    const relationIds = window.localStorage.getItem(
      "SearchByMemberContext.relations",
    );
    return relationIds ? JSON.parse(relationIds) : undefined;
  },

  setTarget: (targetId: number) =>
    window.localStorage.setItem(
      "SearchByMemberContext.target",
      targetId.toString(),
    ),
  setRelations: (relationIds: number[]) =>
    window.localStorage.setItem(
      "SearchByMemberContext.relations",
      JSON.stringify(relationIds),
    ),
};
export interface SearchByMemberContextProps
  extends SearchByMemberContextToolsProps {
  target?: InferSelectModel<typeof WorkspaceMember>;
  relations?: InferSelectModel<typeof WorkspaceMember>[];
}

const SearchByMemberContext = createContext<SearchByMemberContextProps>(
  searchByMemberContextTools,
);

export default SearchByMemberContext;
