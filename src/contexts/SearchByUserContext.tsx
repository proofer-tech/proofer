import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { User } from "@/database/schemas/auth";

export interface SearchByUserContextProps {
  target?: InferSelectModel<typeof User>;
  relations?: InferSelectModel<typeof User>[];
}

const SearchByUserContext = createContext<SearchByUserContextProps>({});

export default SearchByUserContext;
