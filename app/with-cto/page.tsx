import { redirect } from "next/navigation";

// 지난 행사 페이지는 지웠다. 실제 이동은 next.config.mjs 의 redirects 가 먼저 처리하고, 여기는 보험이다.
export default function Page() {
  redirect("https://event-us.kr/withcto/event");
}
