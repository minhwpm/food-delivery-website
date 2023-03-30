import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { foodActions } from "../../store/foodSlice";

type CategoryType = {
  id: string;
  name: string;
};

const CategoryFilter: React.FC<{ categories: Array<CategoryType> }> = ({
  categories,
}) => {
  const [activeKey, setActiveKey] = useState("all");
  const dispatch = useAppDispatch()

  return (
    <ul className="category-filter">
      <li
        onClick={() => {
          setActiveKey("all")
          dispatch(foodActions.changeCategory({ id: "all", name: "all" }))
        }}
        key="all"
        className={activeKey === "all" ? "active" : ""}
      >
        All
      </li>
      {categories.map((item: CategoryType) => (
        <li
          onClick={() => {
            setActiveKey(item.id)
            dispatch(foodActions.changeCategory({ id: item.id, name: item.name }))
          }}
          key={item.id}
          className={activeKey === item.id ? "active" : ""}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
