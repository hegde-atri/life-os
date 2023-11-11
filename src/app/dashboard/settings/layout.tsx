"use client"

import { Tab, Tabs } from "@nextui-org/react";
import { pages } from "next/dist/build/templates/app-page";
import { redirect } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div>
<div className="flex flex-wrap gap-4">
        <Tabs radius="md" aria-label="Tabs radius" className="mx-auto my-10">
          <Tab key="categories" title="Categories"/>
          <Tab key="preferences" title="Preferences"/>
          <Tab key="account" title="Account"/>
        </Tabs>
    </div>
    {children}
  </div>
  );
}