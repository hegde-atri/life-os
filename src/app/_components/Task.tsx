"use client";

import { TbCoins } from "react-icons/tb";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { api } from "~/trpc/react";

export const Task = (props: {
  category: string;
  task: string;
  points: number;
}) => {

  const { mutate } = api.profile.addCoins.useMutation({
  });

  return (
    <Card
      isPressable
      className="w-full"
      onClick={() => {
        mutate({coinIncrease: props.points})
      }}
    >
      <CardHeader className="flex justify-between">
        <Chip color="primary">{props.category}</Chip>
        <div className="flex items-center">
          {props.points}
          <TbCoins />
          <Spacer/>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.task}</p>
      </CardBody>
    </Card>
  );
};
