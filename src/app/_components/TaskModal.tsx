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

export const TaskModal = (props: {
  category: string;
  task: string;
  points: number;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly onPress={onOpen} className="absolute -top-4 -right-4 z-50 opacity-85 rounded-full">
        <TbPencil />
      </Button>
      <Task category={props.category} task={props.task} points={props.points}/>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 items-center">
                Edit Task <TbPencil />
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between items-center gap-2">
                  <Chip color="primary">{props.category}</Chip>
                  <Input
                    className="w-unit-24"
                    type="number"
                    defaultValue={props.points.toString()}
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
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
                <Button color="primary" onPress={onClose}>
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
