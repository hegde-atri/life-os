"use client";

import React from "react";
import { TaskModal } from "../_components/TaskModal";
export default function Home() {
  // const { data: json_tasks, isLoading } = api.post.hello.useQuery();

  // if (json_tasks == undefined) {
  // return <></>;
  // }

  return (
    <main className="text-medium">
      <div className="mx-auto mt-16 w-11/12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="relative">
            <TaskModal category="Swimming" task="Get good" points={10} />
          </div>
          <div className="relative">
            <TaskModal category="Swimming" task="Get good" points={10} />
          </div>
          <div className="relative">
            <TaskModal category="Swimming" task="Get good" points={10} />
          </div>
          <div className="relative">
            <TaskModal category="Swimming" task="Get good" points={10} />
          </div>
          </div>
        </div>
    </main>
  );
}
