import React, { useState } from "react";

type CategoryType = {
  id: string;
  name: string;
};

const CategoryFilter: React.FC<{ categories: Array<CategoryType> }> = ({
  categories,
}) => {
  const [activeKey, setActiveKey] = useState("all");

  return (
    <ul className="category-filter">
      <li
        onClick={() => setActiveKey("all")}
        key="all"
        className={activeKey === "all" ? "active" : ""}
      >
        All
      </li>
      {categories.map((item: CategoryType) => (
        <li
          onClick={() => setActiveKey(item.id)}
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
