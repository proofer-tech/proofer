import { get } from "@vercel/edge-config";
import { HeaderPortal } from "@/app/components/Header";
import NotFoundPage from "@/app/components/NotFoundPage";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";

export default async function NotFound() {
  const portals: readonly HeaderPortal[] = (await get("portals")) || [];
  return (
    <LandingPageShellLayout portals={portals}>
      <NotFoundPage />
    </LandingPageShellLayout>
  );
}
