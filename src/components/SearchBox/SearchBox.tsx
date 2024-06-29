"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { searchByName } from "../../store/foodSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBox.module.scss"

const SearchBox = () => {
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
        <FontAwesomeIcon icon={faMagnifyingGlass} color="#8C949B" />
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
export default SearchBox;
