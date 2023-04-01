import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { foodActions } from "../../store/foodSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <form className="search-box">
      <span className="search-icon">
        <FontAwesomeIcon icon={faMagnifyingGlass} color="#8C949B" />
      </span>
      <input
        placeholder="Enter food name..."
        type="text"
        className="search-field"
        onChange={(e) => {
          dispatch(foodActions.searchByName(e.target.value));
        }}
      />
    </form>
  );
};
export default SearchBox;
