import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user.id) {
    redirect("/");
  }

  return <>{children}</>;
}
