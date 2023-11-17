'use client'
import React from 'react'
import { redirect, usePathname } from "next/navigation";
import { Tab, Tabs } from '@nextui-org/react';
import Categories from './categories/page';
import Preferences from './preferences/page';
import Account from './account/page';

const Settings = () => {
  return (
  <div>
<div className="flex flex-col gap-4">
        <Tabs radius="md" aria-label="Tabs radius" className="mx-auto my-10 text">
          <Tab key="categories" title="Categories" className="text-md mx-auto"><Categories></Categories></Tab>
          <Tab key="preferences" title="Preferences" className="text-md mx-auto"><Preferences></Preferences></Tab>
          <Tab key="account" title="Account" className="text-md mx-auto"><Account></Account></Tab>
        </Tabs>
    </div>
    
  </div>
  )
}

export default Settings;
