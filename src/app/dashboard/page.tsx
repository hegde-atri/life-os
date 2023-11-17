"use client";

import { api } from "~/trpc/react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { TaskModal } from "../_components/TaskModal";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data: taskData, isLoading: tasksLoading } =
    api.tasks.generateTasks.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  if (tasksLoading) {
    return (
      <div className="mx-auto mt-16 w-11/12">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
        </div>
      </div>
    );
  }

  interface Task {
    category: string;
    task: string;
    points: number;
  }

  if (isLoading) {
    return (
      <div className="mx-auto mt-16 w-11/12">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
        </div>
      </div>
    );
  }

  const tasks: Task[] = taskData?.tasks!;

  return (
    <div className="mx-auto mt-16 w-11/12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tasks.map((taskObj: Task, index) => (
          <motion.div
            className="flex"
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 + index / 10,
            }}
          >
            <TaskModal
              key={index}
              category={taskObj.category}
              task={taskObj.task}
              points={taskObj.points}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TaskSkeleton = () => {
  return (
    <Card className="min-w-1/4 m-2 grow animate-pulse p-0">
      <CardHeader className="">
        <div className="mb-2.5 h-2 max-w-[100px] rounded-md bg-primary"></div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="mb-2.5 h-2 max-w-[330px] rounded-md bg-secondary"></div>
        <div className="mb-2.5 h-2 max-w-[330px] rounded-md bg-secondary"></div>
        <div className="mb-2.5 h-2 max-w-[330px] rounded-md bg-secondary"></div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
