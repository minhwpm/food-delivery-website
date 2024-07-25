"use client";
import { useEffect, useState } from "react";
import { searchByName, useAppDispatch } from "@open-foody/redux-store";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBox.module.scss"

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
    dispatch(searchByName(debouncedValue))
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