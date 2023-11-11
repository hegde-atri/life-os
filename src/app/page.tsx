"use client";

import { Button } from "@nextui-org/react";
import ThemeSwitcher from "./_components/ThemeSwitcher";

export default function Home() {
  return (
    <main className="text-6xl">
      <ThemeSwitcher />
      Life OS
      <Button color="danger">Testing</Button>
    </main>
  );
}
