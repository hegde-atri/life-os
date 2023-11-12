"use client";

import { motion } from "framer-motion";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Input,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import { LoadingPage, LoadingSpinner } from "../_components/loading";

interface Category {
  id: string;
  name: string;
}

const Setup = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [category, setCategory] = React.useState("");

  const utils = api.useUtils();

  const { data: initData, isLoading: initDataLoading } =
    api.category.getUsersCategories.useQuery();

  const { mutate: createCategory, isLoading: isCreating } =
    api.category.create.useMutation({
      onSuccess: () => {
        void utils.category.getUsersCategories.invalidate();
      },
    });

  const { data: allCategories, isLoading: categoriesLoading } =
    api.category.getAll.useQuery();

  useEffect(() => {
    if (!initDataLoading && initData) {
      setCategories(initData);
    }
  }, [initData, initDataLoading]);

  const onSelectionChange = (id: string) => {
    setCategory(id);
  };

  const onInputChange = (value: string) => {
    setCategory(value);
  };

  if (allCategories === undefined) {
    return <LoadingPage />;
  }

  return (
    <div className="mx-4 flex h-screen flex-col items-center sm:mx-16 md:mx-auto md:max-w-2xl">
      <div className="my-auto w-full flex-row">
        <motion.div
          className="flex w-full items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Autocomplete
            radius="sm"
            className=""
            disabled={isCreating}
            isLoading={categoriesLoading}
            label="Category"
            type="text"
            value={category}
            allowsCustomValue={true}
            allowsEmptyCollection
            placeholder="Enter a category..."
            onSelectionChange={() => onSelectionChange}
            onInputChange={onInputChange}
          >
            {allCategories.map((category) => {
              return (
                <AutocompleteItem color="primary" key={category.name}>
                  {category.name}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
          <Button
            isLoading={isCreating}
            disabled={isCreating}
            onClick={() => {
              createCategory({ name: category });
              setCategory("");
            }}
            className="w-6 bg-transparent text-4xl"
          >
            {isCreating ? null : "+"}
          </Button>
        </motion.div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2">
          {initDataLoading ? (
            <motion.div
              className="mx-auto mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.3 }}
            >
              <Spinner color="primary" />
            </motion.div>
          ) : null}
          <div className="my-1 flex flex-col flex-wrap sm:flex-row">
            {categories.map((category, index) => (
              <CategoryChip category={category} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryChip = (props: { category: Category; index: number }) => {
  const utils = api.useUtils();

  const { mutate: deleteCategory, isLoading: isDeleting } =
    api.category.delete.useMutation({
      onSuccess: () => {
        void utils.category.getUsersCategories.invalidate();
      },
    });
  return (
    <motion.div
      className="my-2 mr-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.1 + props.index * 0.1 }}
    >
      <Chip
        className="py-2"
        endContent={isDeleting ? <LoadingSpinner /> : null}
        onClose={() => {
          if (!isDeleting) {
            deleteCategory({ categoryId: props.category.id });
          }
        }}
        color="primary"
        variant="flat"
        radius="md"
      >
        {props.category.name}
      </Chip>
    </motion.div>
  );
};

export default Setup;
