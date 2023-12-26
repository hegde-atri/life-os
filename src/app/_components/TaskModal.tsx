import React from "react";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { TbCoins, TbPencil } from "react-icons/tb";
import { Task } from "./Task";
import { api } from "~/trpc/react";

export const TaskModal = (props: {
  taskId: string;
  category: string;
  task: string;
  points: number;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate, isLoading } = api.tasks.editTask.useMutation();

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        className="opacity-85 absolute -right-4 -top-4 z-50 rounded-full"
      >
        <TbPencil />
      </Button>
      <Task category={props.category} task={props.task} points={props.points} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                Edit Task <TbPencil />
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-between gap-2">
                  <Chip color="primary">{props.category}</Chip>
                  <Input
                    className="w-unit-24"
                    type="number"
                    defaultValue={props.points.toString()}
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">
                          <TbCoins />
                        </span>
                      </div>
                    }
                  />
                </div>
                <Input
                  autoFocus
                  variant="bordered"
                  label="Task"
                  defaultValue={props.task}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => mutate({ taskId: "", name: "", points: 0 })}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
