"use client";

import { api } from "~/trpc/react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { TaskModal } from "../_components/TaskModal";

const Dashboard = () => {
  const { data: categoryData, isLoading: categoriesLoading } = api.category
    .getUsersCategories
    .useQuery(undefined, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  

  const { data: taskData, isLoading: tasksLoading } = api.tasks.generateTasks
    .useQuery({
      categories: cleanCategories(categoryData),
    }, { refetchOnMount: false, refetchOnWindowFocus: false });

  if (categoriesLoading) {
    return (
      <div className="mx-auto mt-16 w-11/12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

  if (categoryData?.length === 0) {
    redirect("/setup");
  }

  if (tasksLoading) {
    return (
      <div className="mx-auto mt-16 w-11/12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

  console.log("**CATEGORY DATA**");
  for (let category of categoryData!) {
    console.log(category.name)
  }

  interface Task {
    category: string;
    task: string;
    points: number;
  }

  const tasks: Task[] = taskData?.tasks!;

  return (
    <div className="mx-auto mt-16 w-11/12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tasks.map((taskObj: Task, index) => (
          <TaskModal
            key={index}
            category={taskObj.category}
            task={taskObj.task}
            points={taskObj.points}
          />
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="mx-auto mt-16 w-11/12">
  //     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  //       {Object.entries(json_tasks?.data).map(([category, rest], index1) =>
  //         Object.entries(rest).map(([task, value], index2) => (
  //           <motion.div
  //             className="flex"
  //             key={task}
  //             initial={{ opacity: 0, x: -10 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             transition={{
  //               duration: 0.3,
  //               delay: 0.1 + (index1 + index2) / 10,
  //             }}
  //           >
  //             <Task category={category} task={task} value={value} />
  //           </motion.div>
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );
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
