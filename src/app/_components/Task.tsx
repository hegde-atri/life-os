"use client";

import { TbCoins } from "react-icons/tb";
import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";

export const Task = (props: {
  category: string;
  task: string;
  value: string;
}) => {
  return (
    <Card
      isPressable
      className="min-w-1/4 -0 m-2 grow"
      onClick={() => {
        // delete task
      }}
    >
      <CardHeader className="flex justify-between">
        <Chip color="primary">{props.category}</Chip>
        <div className="flex items-center">
          {props.value}
          <TbCoins />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.task}</p>
      </CardBody>
    </Card>
  );
};
