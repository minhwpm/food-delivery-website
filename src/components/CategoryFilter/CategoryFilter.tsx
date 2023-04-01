import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { foodActions } from "../../store/foodSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'

type CategoryType = {
  id: string;
  name: string;
};

const CategoryFilter: React.FC<{ categories: Array<CategoryType> }> = ({
  categories,
}) => {
  const { selectedCategory } = useAppSelector((s) => s.food);
  const [ isShowed, setShowed ] = useState(false) //For Category filter mobile version
  const dispatch = useAppDispatch();

  return (
    <div className="category-wrapper">
      <div className="category-switcher" onClick={() => setShowed(true)}>
        <span className="left">
          <FontAwesomeIcon icon={faFilter} color="#6A6466" />
        </span>
        <span className="right">{selectedCategory.name}</span>
      </div>
      <span
        className={`close-btn ${!isShowed && "hidden"}`}
        onClick={() => setShowed(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </span>
      <ul className={`category-filter-mobile ${!isShowed && "hidden"}`}>
        <li
          onClick={() => {
            dispatch(foodActions.changeCategory({ id: "all", name: "All" }));
          }}
          key="all"
          className={selectedCategory.id === "all" ? "active" : ""}
        >
          All
        </li>
        {categories.map((item: CategoryType) => (
          <li
            onClick={() => {
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
      <ul className="category-filter">
        <li
          onClick={() => {
            dispatch(foodActions.changeCategory({ id: "all", name: "All" }));
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
    </div>
  );
};

export default CategoryFilter;
