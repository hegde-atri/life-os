"use client";

import { Button } from "@nextui-org/react";
import ThemeSwitcher from "./_components/ThemeSwitcher";

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      Life OS
      <Button color="danger">Testing</Button>
    </div>
  );
}
