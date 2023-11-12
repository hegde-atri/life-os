"use client";

import { TbCoins } from "react-icons/tb";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";

export const Task = (props: { category: string; task: string; value: number }) => {
  return (
    <Card
      isPressable
      className="max-w-xs m-2 p-0"
      onClick={() => console.log("h")}
    >
      <CardHeader className="flex justify-between">
        <Chip color="primary">{props.category}</Chip>
        <div className="flex items-center">
          {props.value}<TbCoins />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.task}</p>
      </CardBody>
    </Card>
  );
};
