"use client";
import { redirect } from "next/navigation";

export default function NotFound() {
  // FIXME: 404 일 경우 medium 이 있는지를 판별하여 이동하도록 변경
  if (window !== undefined)
    return redirect(
      `https://medium.com/@proofer.tech${window.location.pathname}`,
    );
  else return redirect("/");
}
