"use client";

import React from "react";
import { TaskModal } from "../_components/TaskModal";
import { Task } from "../_components/Task";
import { Button } from "@nextui-org/react";

export default function Home() {
  // const { data: json_tasks, isLoading } = api.post.hello.useQuery();

  // if (json_tasks == undefined) {
  // return <></>;
  // }

  let { mutate } = api.post.createTask.useMutation();

  return (
    <main className="text-medium">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button
          onClick={() =>
            mutate({
              category: "jumping",
              name: "Jump for 10 hours straight",
              points: 10,
            })
          }
        ></Button>
        <TaskModal
          category="Swimming"
          task="Swim 100m without a break."
          value="10"
        />
        <TaskModal
          category="Swimming"
          task="Swim 100m without a break."
          value="10"
        />
        <TaskModal
          category="Swimming"
          task="Swim 100m without a break."
          value="10"
        />
        <TaskModal
          category="Swimming"
          task="Swim 100m without a break."
          value="10"
        />
      </div>
    </main>
  );
}
