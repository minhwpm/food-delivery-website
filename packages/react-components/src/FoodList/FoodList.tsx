"use client";
import { useCallback, useEffect } from "react";
import { initFoodData, updateFoodList, useAppSelector, useAppDispatch } from "@open-foody/redux-store";
import { FoodItemType } from "@open-foody/types";
import { Button, FoodCard, SearchResultNotification } from "@open-foody/react-components";
import classNames from "classnames";
import styles from "./FoodList.module.scss"
import { fetchFoods } from "@open-foody/utils/src/firebase/firestore";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";


export const FoodList: React.FC<{
  foodItemsList: FoodItemType[];
}> = ({ foodItemsList }) => {
  const dispatch = useAppDispatch();
  const { foodList, search, selectedCategory, pagination, notification } = useAppSelector((s) => s.food);
  useEffect(() => {
    dispatch(initFoodData(foodItemsList))
  }, [dispatch, foodItemsList])

  const loadMoreFoods = async () => {
    const lastVisible = foodList.showed[foodList.showed.length - 1]; // Get the last item in the current list
    const newFoodItems = await fetchFoods(lastVisible, selectedCategory.id ?? undefined);
    console.log("LOAD MORE FOOD", selectedCategory, newFoodItems);
    dispatch(updateFoodList(newFoodItems)); // Append new items to the existing list
  }

  console.log("FOODLIST", selectedCategory, foodList.showed);

  return (
    <div className={classNames("container", styles["food-list"])}>
      {search.keyword && (
        <SearchResultNotification numberOfResults={search.resultNo} searchKey={search.keyword}/>
      )}
      {notification && <span>{notification}</span>}
      <div className={styles.grid}>
        {foodList.showed.map((item: FoodItemType) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>

      <div className="text-center">
        {foodList.showed.length > 0 && pagination.hasMore && (
          <Button onClick={() => loadMoreFoods()}>
            Show more
          </Button>
        )}
        {foodList.showed.length > 0 && !pagination.hasMore && (
          "No more results"
        )}
      </div>
    </div>
  );
};