"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Task } from "../_components/Task";

export default function Home() {
  const { data: json_tasks, isLoading } = api.post.hello.useQuery();

  if (json_tasks == undefined) {
    return <></>;
  }
  
  return (
    <main className="text-medium">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {Object.entries(json_tasks.data).map(
          ([category, rest]) =>
            Object.entries(rest).map(
              ([task, value]) => (
                <Task category={category} task={task} value={value} />
              ),
            ),
        )}
      </div>
    </main>
  );
}
