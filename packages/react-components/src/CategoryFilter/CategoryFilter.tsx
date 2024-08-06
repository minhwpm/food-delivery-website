"use client"
import { changeCategory, useAppSelector, useAppDispatch, updateFoodList } from "@open-foody/redux-store";
import { FoodCategoryType } from "@open-foody/types";
import classNames from "classnames";
import styles from "./CategoryFilter.module.scss";

export const CategoryFilter: React.FC<{ categories: Array<FoodCategoryType> }> = ({
  categories,
}) => {
  const { selectedCategory } = useAppSelector((s) => s.food);
  const dispatch = useAppDispatch();
  const onChangeCategory = async (category: { id: string; name: string; } | null) => {
    dispatch(changeCategory({ id: category?.id ?? null, name: category?.name ?? "all" }));
  }
  
  return (
    <div>
      <div className={styles["category-list"]}>
        <ul className={classNames("container")}>
          <li
            onClick={() => onChangeCategory(null)}
            key="all"
            className={classNames(
              { [styles.active]: selectedCategory.id === null }
            )}
          >
            All
          </li>
          {categories.map((item: FoodCategoryType) => (
            <li
              onClick={() => onChangeCategory(item)}
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