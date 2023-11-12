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
import { TbCoins } from "react-icons/tb";
import { Button, Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import { api } from "~/trpc/react";

export const Task = (props: {
  category: string;
  task: string;
  value: string;
}) => {

  const { mutate } = api.profile.addCoins.useMutation({
  });

  return (
    <Card
      isPressable
      className="min-w-1/4 m-2 grow p-0"
      onClick={() => {
        mutate({coinIncrease: parseInt(props.value)})
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
