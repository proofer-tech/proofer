"use client";
import { useContext, useEffect } from "react";
import { WorkspaceAppShellContext } from "@/app/subs/app/components/WorkspaceAppShell";

export default function WithoutNavbar() {
  const appShellContext = useContext(WorkspaceAppShellContext);
  useEffect(() => {
    appShellContext.close();
  }, []);
  return <></>;
}
