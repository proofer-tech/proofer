import { TablerIconsProps } from "@tabler/icons-react";
import React from "react";

export interface Path {
  title: string;
  isImplemented?: boolean;
  tablerIcon?: (props: TablerIconsProps) => React.JSX.Element;
  subTree?: PathTree;
  component?: React.ReactNode;
}

export type PathTree = { [key: string]: Path };

export const digTree = (tree: PathTree, pathBlocks: string[]) => {
  let searchTree = tree;
  for (const pathBlock of pathBlocks) {
    const path = searchTree[pathBlock];
    if (path) {
      if (path.subTree) searchTree = path.subTree;
      else return path;
    }
  }
  return undefined;
};
