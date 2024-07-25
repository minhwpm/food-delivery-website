"use client";

import { useEffect } from "react";
import { initFoodData, nextPage, useAppSelector, useAppDispatch } from "@open-foody/redux-store";
import { FoodItemType } from "@open-foody/types";
import { Button, FoodCard, SearchResultNotification } from "@open-foody/react-components";
import classNames from "classnames";
import styles from "./FoodList.module.scss"

export const FoodList: React.FC<{
  foodItems: FoodItemType[];
}> = ({ foodItems }) => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(
    (s) => s.food
  );
  const { foodList, pagination, notification } = useAppSelector((s) => s.food);

  useEffect(() => {
    dispatch(initFoodData(foodItems))
  }, [dispatch, foodItems])

  return (
    <div className={classNames("container", styles["food-list"])}>
      {search.keyword && (
        <SearchResultNotification numberOfResults={search.resultNo} />
      )}
      {notification && <span>{notification}</span>}
      <div className={styles.grid}>
        {foodList.showed.map((item: FoodItemType) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
      {pagination.hasMore ? (
        <div className="text-center">
          <Button onClick={() => dispatch(nextPage())}>Show more</Button>
        </div>
      ) : (
        <div className="text-center">No more results</div>
      )}
    </div>
  );
};