"use client";

import { motion } from "framer-motion";
import { Button, Chip, Input, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import { LoadingSpinner } from "../_components/loading";
import { redirect } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

const Setup = () => {
  const { data: session } = useSession();
  console.log(session);

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

  useEffect(() => {
    if (!initDataLoading && initData) {
      setCategories(initData);
    }
  }, [initData, initDataLoading]);

  return (
    <div className="mx-4 flex h-screen flex-col items-center sm:mx-16 md:mx-auto md:max-w-2xl">
      <div className="my-auto w-full flex-row">
        <motion.div
          className="flex w-full items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            radius="sm"
            size="md"
            className=""
            disabled={isCreating}
            label="Category"
            type="text"
            value={category}
            placeholder="Enter a category..."
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (category !== "") {
                  createCategory({ name: category });
                  setCategory("");
                }
              }
            }}
          />
          <Button
            isLoading={isCreating}
            disabled={isCreating}
            onClick={() => {
              createCategory({ name: category });
              setCategory("");
            }}
            className="w-6 bg-transparent"
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
          {categories.map((category, index) => (
            <CategoryChip category={category} key={index} index={index} />
          ))}
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
      className="my-2"
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
