"use client";

import { Button, Chip, Input } from "@nextui-org/react";
import React from "react";

const Setup = () => {
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
  const addCategory = () => {
    categories.push(category);
    setCategories(categories);
  };
  return (
    <div className="mx-20 my-10">
      <div className="flex">
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
                setCategories(categories.concat([category]))
                setCategory("");
              }
            }
          }}
        />
      </div>
      <div>
        {categories.map((category, index) => (
          <div className="my-2">
            <Chip
              key={index}
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
  );
};
export default Setup;
