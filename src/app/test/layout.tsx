import { Header } from "../_components/Header";

export default async function  DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
        {children}
    </>
  );
}

