import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { changeCategory } from "../../store/foodSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./CategoryFilter.module.scss";
import classNames from "classnames";

interface CategoryType {
  id: string;
  name: string;
}

const CategoryFilter: React.FC<{ categories: Array<CategoryType> }> = ({
  categories,
}) => {
  const { selectedCategory } = useAppSelector((s) => s.food);
  const [isShowed, setShowed] = useState(false); //For Category filter mobile version
  const dispatch = useAppDispatch();

  return (
    <div>
      <div
        className={styles["category-switcher"]}
        onClick={() => setShowed(true)}
      >
        <div className={styles["left"]}>
          <FontAwesomeIcon icon={faFilter} color="#6A6466" />
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
        <FontAwesomeIcon icon={faXmark} />
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
        {categories.map((item: CategoryType) => (
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
      <ul className={styles["category-list"]}>
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
        {categories.map((item: CategoryType) => (
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
  );
};

export default CategoryFilter;
