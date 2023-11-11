"use client";

import { TbAdjustmentsFilled, TbCoins } from "react-icons/tb";

export const Header = () => {
  return (
    <div className="flex m-2 justify-between">
      <div className="p-1 bg-purple-500 rounded">
        <h1>LifeOS</h1>
      </div>
      <h2 className="text-transparent">Nick wuz ere</h2>
      <div className="flex items-center space-x-2">
        <div className="flex items-center p-1 bg-yellow-400 rounded">
          200<TbCoins />
        </div>
        <div className="p-2 bg-gray-500 rounded">
          <TbAdjustmentsFilled />
        </div>
      </div>
    </div>
  );
};
