import { Dispatch, createSlice } from "@reduxjs/toolkit";
import type { FoodType } from "../components/FoodCard/FoodCard";

const pageSize = 9;

interface FoodState {
  searchQuery: string;
  pagination: {
    currentNo: number;
    hasMore: boolean;
  };
  selectedCategory: {
    id: string;
    name: string;
  };
  foodList: {
    all: Array<FoodType>;
    showed: Array<FoodType>;
  };
}

const initialState: FoodState = {
  searchQuery: "",
  pagination: {
    currentNo: 1,
    hasMore: true,
  },
  selectedCategory: {
    id: "all",
    name: "All",
  },
  foodList: {
    all: [],
    showed: [],
  },
};

function filter2Data(data: Array<FoodType>, state: FoodState): Array<FoodType> {
  //Time complex O(n) with n=200
  return data
    .filter((item) => {
      return (
        (state.selectedCategory.id === "all" ||
          item.categoryId === state.selectedCategory.id) &&
        (state.searchQuery === "" ||
          item.name.toLowerCase().includes(state.searchQuery))
      );
    })
    .slice(0, pageSize);
}

function filterData(data: Array<FoodType>, state: FoodState): Array<FoodType> {
  //Time complex O(n) with  9 =< n <= 200
  let quantity = 1;
  const result: Array<FoodType> = [];
  data.every((item) => {
    if (quantity > pageSize) return false;
    if (
      (state.selectedCategory.id === "all" ||
        item.categoryId === state.selectedCategory.id) &&
      (state.searchQuery === "" ||
        item.name.toLowerCase().includes(state.searchQuery))
    ) {
      result.push(item);
      quantity++;
    }
    return true;
  });
  console.log("filterData", state.selectedCategory.id, state.searchQuery, result);
  return result;
}

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    initFoodData(state, action) {
      state.foodList.all = action.payload;
      state.foodList.showed = filterData(state.foodList.all, state);
    },
    changeCategory(state, action) {
      state.selectedCategory.id = action.payload.id;
      state.selectedCategory.name = action.payload.name;
      //reset state for pagination
      state.pagination.currentNo = 1;
      state.pagination.hasMore = true;

      state.foodList.showed = filterData(state.foodList.all, state);
      if (state.foodList.showed.length < pageSize)
        state.pagination.hasMore = false;
    },
    searchByName(state, action) {
      state.searchQuery = action.payload.toLowerCase().trim();
      //reset state for pagination
      state.pagination.currentNo = 1;
      state.pagination.hasMore = true;

      state.foodList.showed = filterData(state.foodList.all, state);
      if (state.foodList.showed.length < pageSize)
        state.pagination.hasMore = false;
    },
    nextPage(state) {
      const nextList = filterData(
        state.foodList.all.slice(
          state.foodList.showed[state.foodList.showed.length - 1].index + 1
        ),
        state
      );
      if (nextList.length < pageSize) state.pagination.hasMore = false;
      state.foodList.showed = state.foodList.showed.concat(nextList);
    },
  },
});

export const fetchFoodData = () => (dispatch: Dispatch) => {
  fetch("https://run.mocky.io/v3/a24cfec5-f76c-410b-a5ac-9f63fab28abb")
    .then((response) => response.json())
    .then((data) => dispatch(foodActions.initFoodData(data)))
    .catch((e) => console.error(e));
};

export const foodActions = foodSlice.actions;

// SUSHI: 46
// PIZZA: 38
// HOT MEALS: 39
// DESSERTS: 38
// DRINKS: 39
