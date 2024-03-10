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
