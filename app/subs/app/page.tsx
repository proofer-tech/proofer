import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function Page() {
  const headersList = headers();
  const url = headersList.get("x-url");

  return redirect(`${url}/proofer`);
}
