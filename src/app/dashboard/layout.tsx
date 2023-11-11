import { Header } from "../_components/Header";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user.id) {
    redirect("/")
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}

