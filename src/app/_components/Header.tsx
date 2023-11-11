"use client";

import { TbAdjustmentsFilled, TbCoins } from "react-icons/tb";

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
        <div className="p-2 bg-secondary text-primary rounded">
          <TbAdjustmentsFilled />
        </div>
      </div>
    </div>
  );
};
