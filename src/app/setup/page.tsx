"use client";

import { Chip, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "~/trpc/react";

const Setup = () => {
  const { data: session } = useSession();

  /*   const { data } = api.category.getUsersCategories.useQuery(); */
  /*   console.log(data); */

  const [categories, setCategories] = React.useState([
    "Some category",
    "Another",
  ]);

  const handleClose = (categoryToRemove: String) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove),
    );
  };

  const [category, setCategory] = React.useState("");

  return (
    <div className="mx-4 flex h-screen flex-col items-center sm:mx-16 md:mx-auto md:max-w-2xl">
      <div className="my-auto w-full flex-row">
        <div className="flex w-full">
          <Input
            radius="sm"
            size="md"
            className=""
            label="Category"
            type="text"
            value={category}
            placeholder="Enter a category..."
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (category !== "") {
                  setCategories(categories.concat([category]));
                  setCategory("");
                }
              }
            }}
          />
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2">
          {categories.map((category, index) => (
            <div className="my-2" key={index}>
              <Chip
                onClose={() => handleClose(category)}
                color="primary"
                variant="flat"
                radius="md"
              >
                {category}
              </Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Setup;
