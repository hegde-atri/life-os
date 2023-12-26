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
  // setTask: (newTask: string) => void; // Add a new prop function to update task
  // setPoints: (newPoints: number) => void; // Add a new prop function to update points
}) => {
  var task = props.task
  var points = props.points

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputTask, setInputTask] = React.useState(task); // State to keep track of the input value
  const [inputPoints, setInputPoints] = React.useState(points.toString()); // State to keep track of the input value

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        className="opacity-85 absolute -right-4 -top-4 z-50 rounded-full"
      >
        <TbPencil />
      </Button>
      <Task category={props.category} task={task} points={points} />
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
                    // defaultValue={props.points.toString()}
                    value={inputPoints} // Set the value of the input to the state
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputPoints(e.target.value)
                    } // Update the state as the input value changes
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
                  // defaultValue={props.task}
                  value={inputTask} // Set the value of the input to the state
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputTask(e.target.value)
                  } // Update the state as the input value changes
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    task = inputTask
                    points = parseInt(inputPoints)
                    // props.setTask(inputTask); // Call the function to update the task
                    // props.setPoints(parseInt(inputPoints)); // Call the function to update the points
                    onClose(); // Close the modal
                  }}
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
