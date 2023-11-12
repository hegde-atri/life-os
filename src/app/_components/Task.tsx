"use client";

import { TbCoins, TbPencil } from "react-icons/tb";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";

export const Task = (props: {
  category: string;
  task: string;
  value: string;
}) => {
  return (
    <Card
      isPressable
      className="min-w-1/4 m-2 grow p-0"
      onClick={() => {
        // add coins - maybe use onPress
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
