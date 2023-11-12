"use client";

import { TbAdjustmentsFilled, TbCoins } from "react-icons/tb";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem, Button} from "@nextui-org/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { api } from "~/trpc/react";

export const Header = () => {
  const {data, isLoading} = api.profile.getProfile.useQuery();
  return (
    <div className="flex m-2 justify-between">
      <div className="p-1 bg-secondary text-primary rounded">
        <h1>LifeOS</h1>
      </div>
      <h2 className="text-transparent">Nick wuz ere</h2>
      <div className="flex items-center space-x-2">
        <div className="flex items-center p-1 bg-success text-black rounded">{data?.points}
          <TbCoins />
        </div>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" isIconOnly className="p-2 bg-secondary text-primary rounded">
                <TbAdjustmentsFilled size={16}/>
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
              <DropdownItem key="settings" href="/dashboard/settings">
                Settings
              </DropdownItem>
              <DropdownItem key="signout" color="danger" onClick={()=>signOut()}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </div>
    </div>
  );
};
