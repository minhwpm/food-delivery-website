"use client";

import { useEffect } from "react";
import { initFoodData, nextPage } from "../../store/foodSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { FoodItemType } from "@/types/types";
import FoodCard from "@/components/FoodCard/FoodCard";
import Button from "@/components/Button/Button";
import SearchResultNotification from "@/components/SearchResultNotification/SearchResultNotification";
import styles from "./FoodList.module.scss"

const FoodList: React.FC<{
  foodItems: FoodItemType[];
}> = ({ foodItems }) => {
  const dispatch = useAppDispatch();
  const { foodList, pagination, notification } = useAppSelector((s) => s.food);

  useEffect(() => {
    dispatch(initFoodData(foodItems))
  }, [dispatch, foodItems])

  return (
    <div className={styles["food-list"]}>
      <SearchResultNotification />
      {notification && <span>{notification}</span>}
      <div className={styles.grid}>
        {foodList.showed.map((item: FoodItemType) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
      {pagination.hasMore ? (
        <div className="text-center">
          <Button onClick={() => dispatch(nextPage())}>
            Show more
          </Button>
        </div>
      ) : (
        <div className="text-center">No more results</div>
      )}
    </div>
  );
};

export default FoodList;
