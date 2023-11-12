"use client";

import { TbAdjustmentsFilled, TbCoins } from "react-icons/tb";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem, Button} from "@nextui-org/react";

export const Header = () => {
  return (
    <div className="flex m-2 justify-between">
      <div className="p-1 bg-secondary text-primary rounded">
        <h1>LifeOS</h1>
      </div>
      <h2 className="text-transparent">Nick wuz ere</h2>
      <div className="flex items-center space-x-2">
        <div className="flex items-center p-1 bg-success text-black rounded">
          200<TbCoins />
        </div>
        <div >
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" isIconOnly className="p-2 bg-secondary text-primary rounded">
                <TbAdjustmentsFilled size={16}/>
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-labale="Dropdown menu with description">
              <DropdownItem key="settings">
                Settings
              </DropdownItem>
              <DropdownItem>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
