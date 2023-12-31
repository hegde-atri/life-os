"use client";

import {
  Card,
  Checkbox,
  CheckboxGroup,
  CheckboxProps,
  Chip,
  tv,
  useCheckbox,
  VisuallyHidden,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { api } from "~/trpc/react";

interface Category {
  id: string;
  name: string;
}

const Categories = () => {
  const { data: initData, isLoading: initDataLoading} = api.category.getUsersCategories.useQuery();
  // const categories = [
  //   "Swimming",
  //   "Jumping",
  //   "Cooking",
  //   "Eating",
  //   "Alcohol :P",
  // ];
  const [categories, setCategories] = React.useState<Category[]> ([]);
  const [categoriesSelected, setCategoriesSelected] = React.useState([]);

  useEffect(() => {
    if (!initDataLoading && initData) {
      setCategories(initData);
    }
  }, [initData, initDataLoading]);

  return (
      <CheckboxGroup
        value={categoriesSelected}
        // onChange={setCategoriesSelected}
      >
        <div className="grid grid-cols-3 gap-7 mx-20">
        {categories.map((category, key) => (
          <CustomCheckbox className="mx-auto" key={key} value={category.id} >
            {category.name}
          </CustomCheckbox>
        ))}
        </div>
      </CheckboxGroup>
  );
};

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary hover:border-primary",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

interface CustomCheckboxProps extends CheckboxProps {
  // Add any additional props specific to your CustomCheckbox
  children?: React.ReactNode;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

export default Categories;
