import { Dispatch, createSlice } from "@reduxjs/toolkit";
import type { FoodType } from "../components/FoodCard/FoodCard";

const pageSize = 9;

interface FoodState {
  searchQuery: string
  pagination: {
    currentNo: number
    hasMore: boolean
  }
  selectedCategory: {
    id: string
    name: string
  }
  foodList: {
    all: Array<FoodType>
    showed: Array<FoodType>
  }
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
}

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.selectedCategory.id = action.payload.id;
      state.selectedCategory.name = action.payload.name;
      state.pagination.currentNo = 1;
      state.pagination.hasMore = true;

      if (action.payload.id === "all") {
        state.foodList.showed = state.foodList.all.slice(0, pageSize);
        return;
      }
      state.foodList.showed = state.foodList.all
        .filter((item: FoodType) => item.categoryId === action.payload.id)
        .slice(0, pageSize);
    },
    initFoodData(state, action) {
      state.foodList.all = action.payload;
      if (state.selectedCategory.id === "all") {
        state.foodList.showed = state.foodList.all.slice(0, pageSize);
        return;
      }
      state.foodList.showed = state.foodList.all
        .filter((item: FoodType) => item.categoryId === state.selectedCategory.id)
        .slice(0, pageSize);
    },
    nextPage(state) {
      if (state.selectedCategory.id === "all") {
        state.foodList.showed = state.foodList.showed.concat(
          //@TODO refactor
          state.foodList.all.slice(
            pageSize * state.pagination.currentNo,
            pageSize * ++state.pagination.currentNo
          )
        );
        return;
      }

      let limit = 1;
      state.foodList.all
        .slice(
          state.foodList.showed[state.foodList.showed.length - 1].index + 1
        )
        .every((item: FoodType) => {
          if (limit > pageSize) return false;

          if (item.categoryId === state.selectedCategory.id) {
            state.foodList.showed.push(item);
            limit++;
          }
          return true;
        });
      if (limit < pageSize) state.pagination.hasMore = false;
    },
    searchByName(state, action) {
      state.searchQuery = action.payload
      state.foodList.showed = state.foodList.all.filter((item: FoodType) => { //@TODO refactor
        if (state.selectedCategory.id === "all") {
          return item.name.toLowerCase().includes(action.payload.toLowerCase().trim())
        }
        return (
          item.name
            .toLowerCase()
            .includes(action.payload.toLowerCase().trim()) &&
          item.categoryId === state.selectedCategory.id
        );
      })
      console.log("SEARCH", action.payload, state.foodList.showed.length)
    }
  },
});

export const fetchFoodData = () => (dispatch: Dispatch) => {
  fetch("https://run.mocky.io/v3/a24cfec5-f76c-410b-a5ac-9f63fab28abb")
    .then((response) => response.json())
    .then((data) => dispatch(foodActions.initFoodData(data)))
    .catch((e) => console.error(e));
};

export const foodActions = foodSlice.actions