import React from 'react';
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { foodActions } from '../../store/foodSlice';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <input className="search-box" onChange={(e) => {
        dispatch(foodActions.searchByName(e.target.value))
      }} />
    </>
  )
}
export default SearchBox