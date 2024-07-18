"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changeCategory } from "@/store/foodSlice";
import { FoodCategoryType } from "@/types/types";
import classNames from "classnames";
import styles from "./CategoryFilter.module.scss";

const CategoryFilter: React.FC<{ categories: Array<FoodCategoryType> }> = ({
  categories,
}) => {
  const { selectedCategory } = useAppSelector((s) => s.food);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles["category-list"]}>
        <ul className={classNames("container")}>
          <li
            onClick={() => {
              dispatch(changeCategory({ id: "all", name: "All" }));
            }}
            key="all"
            className={classNames(
              { [styles.active]: selectedCategory.id === "all" }
            )}
          >
            All
          </li>
          {categories.map((item: FoodCategoryType) => (
            <li
              onClick={() => {
                dispatch(changeCategory({ id: item.id, name: item.name }));
              }}
              key={item.id}
              className={classNames(
                { [styles.active]: selectedCategory.id === item.id }
              )}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
