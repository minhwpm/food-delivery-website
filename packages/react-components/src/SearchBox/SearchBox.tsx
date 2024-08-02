"use client";
import { useEffect, useState } from "react";
import { searchByName, useAppDispatch } from "@open-foody/redux-store";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBox.module.scss"
import { fetchFoods } from "@open-foody/utils/src/firebase/firestore";
import { FoodItemType } from "@open-foody/types";

export const SearchBox = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("")
  const [debouncedValue, setDebounceValue] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 500);
    return () => clearTimeout(handler)
  }, [inputValue])

  useEffect(() => {
    const search = async() => {
      const foodItems = await fetchFoods(undefined, undefined, false) as FoodItemType[]
      console.log("SEARCH", debouncedValue, foodItems)
      // Perform case-insensitive filtering
      const searchKeyLower = debouncedValue.toLowerCase();
      const filteredFoods = foodItems.filter((food) =>
        food.name.toLowerCase().includes(searchKeyLower)
      );

      dispatch(searchByName({
        searchKey: debouncedValue,
        result: filteredFoods
      }))
    }
    if (debouncedValue) {
      search()
    }
  }, [debouncedValue, dispatch])

  return (
    <form>
      <span className={styles["search-icon"]}>
        <CiSearch color="#8C949B" />
      </span>
      <input
        className={styles["search-field"]}
        type="text"
        placeholder="What are you craving today?"
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
    </form>
  );
};