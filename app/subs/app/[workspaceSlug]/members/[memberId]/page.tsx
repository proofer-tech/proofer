import { PageProps } from "@/src/types/general";

export default function MemberPage({ params }: PageProps) {
  const { memberId } = params;
  return <>{memberId}</>;
}
