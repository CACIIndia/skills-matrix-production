import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/line-manager/my-team");

  return null;
}
