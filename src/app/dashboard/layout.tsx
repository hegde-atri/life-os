import { Header } from "../_components/Header";

export default function DashboardLayout({
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
