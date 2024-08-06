"use client";
import { useEffect } from "react";
import { initFoodData, useAppSelector, useAppDispatch, fetchFoodData } from "@open-foody/redux-store";
import { FoodItemType } from "@open-foody/types";
import { FoodCard, SearchResultNotification } from "@open-foody/react-components";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import classNames from "classnames";
import styles from "./FoodList.module.scss"

export const FoodList: React.FC<{
  foodItemsList: FoodItemType[];
}> = ({ foodItemsList }) => {
  const dispatch = useAppDispatch();
  const { foodList, search, pagination, notification } = useAppSelector((s) => s.food);
  useEffect(() => {
    dispatch(initFoodData(foodItemsList))
  }, [dispatch, foodItemsList])

  return (
    <div className={classNames("container", styles["food-list"])}>
      {search.keyword && (
        <SearchResultNotification numberOfResults={search.resultNo} searchKey={search.keyword}/>
      )}
      <InfiniteScroll className={styles.grid} loadMore={() => dispatch(fetchFoodData())} hasMore={pagination.hasMore}>
        {foodList.showed.map((item: FoodItemType) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </InfiniteScroll>
      {notification && <div>{notification}</div>}
    </div>
  );
};