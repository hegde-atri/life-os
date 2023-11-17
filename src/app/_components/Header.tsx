"use client";

import { TbAdjustmentsFilled, TbCoins } from "react-icons/tb";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { api } from "~/trpc/react";

export const Header = () => {
  const { data, isLoading } = api.profile.getProfile.useQuery();
  return (
    <div className="m-2 flex justify-between">
      <a href="/" className="rounded bg-secondary p-1 text-primary">
        <h1>LifeOS</h1>
      </a>
      <h2 className="text-transparent">Nick wuz ere</h2>
      <div className="flex items-center space-x-2">
        <div className="flex items-center rounded bg-success p-1 text-black">
          {data?.points}
          <TbCoins />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              isIconOnly
              className="rounded bg-secondary p-2 text-primary"
            >
              <TbAdjustmentsFilled size={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownItem key="settings" href="/dashboard/settings">
              Settings
            </DropdownItem>
            <DropdownItem
              key="signout"
              color="danger"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
