"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changeCategory } from "@/store/foodSlice";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FoodCategoryType } from "@/types/types";
import classNames from "classnames";
import styles from "./CategoryFilter.module.scss";

const CategoryFilter: React.FC<{ categories: Array<FoodCategoryType> }> = ({
  categories,
}) => {
  const { selectedCategory } = useAppSelector((s) => s.food);
  const [isShowed, setShowed] = useState(false); //For Category filter mobile version
  const dispatch = useAppDispatch();

  return (
    <div>
      <div
        className={classNames(styles["category-switcher"])}
        onClick={() => setShowed(true)}
      >
        <div className={styles["left"]}>
          <FaFilter color="#6A6466" />
        </div>
        <div className={styles["right"]}>{selectedCategory.name}</div>
      </div>
      <span
        className={classNames(
          styles["close-btn"], 
          { "hidden": !isShowed }
        )}
        onClick={() => setShowed(false)}
      >
        <IoClose />
      </span>
      <ul
        className={classNames(
          styles["category-list-mobile"],
          { "hidden": !isShowed }
        )}
      >
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
