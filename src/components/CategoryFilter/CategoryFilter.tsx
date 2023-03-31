import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { foodActions } from "../../store/foodSlice";

type CategoryType = {
  id: string;
  name: string;
};

const CategoryFilter: React.FC<{ categories: Array<CategoryType> }> = ({
  categories,
}) => {
  const { selectedCategory } = useAppSelector((s) => s.food);
  const dispatch = useAppDispatch();
  // console.log(selectedCategory);

  return (
    <ul className="category-filter">
      <li
        onClick={() => {
          // setActiveKey("all")
          dispatch(foodActions.changeCategory({ id: "all", name: "all" }));
        }}
        key="all"
        className={selectedCategory.id === "all" ? "active" : ""}
      >
        All
      </li>
      {categories.map((item: CategoryType) => (
        <li
          onClick={() => {
            // setActiveKey(item.id)
            dispatch(
              foodActions.changeCategory({ id: item.id, name: item.name })
            );
          }}
          key={item.id}
          className={selectedCategory.id === item.id ? "active" : ""}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
