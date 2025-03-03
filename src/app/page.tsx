import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(options);

  // If no session exists, redirect to the sign-in page
  if (!session) {
    redirect("/auth/signin"); // Redirect to your actual sign-in page
    return null;
  }

  // If the session exists, redirect to the profile overview
  redirect("/profile/overview");
  return null;
}
