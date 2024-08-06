import { Action, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { fetchFoods } from "@open-foody/utils";
import { FoodItemType } from "@open-foody/types";
import { RootState } from ".";

const PAGE_SIZE = 12;
export interface FoodState {
  search: {
    keyword: string;
    resultNo: number;
  }
  pagination: {
    currentNo: number;
    hasMore: boolean;
  };
  selectedCategory: {
    id: string | null;
    name: string;
  };
  foodList: {
    all: Array<FoodItemType>;
    showed: Array<FoodItemType>;
  };
  notification: string
}

const initialState: FoodState = {
  search: {
    keyword: "",
    resultNo: 0
  },
  pagination: {
    currentNo: 1,
    hasMore: true,
  },
  selectedCategory: {
    id: null,
    name: "None",
  },
  foodList: {
    all: [],
    showed: [],
  },
  notification: ""
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    initFoodData(state, action) {
      state.foodList.showed = action.payload
    },
    changeCategory(state, action) {
      state.selectedCategory.id = action.payload.id;
      state.selectedCategory.name = action.payload.name;
      state.foodList.showed = []
      state.pagination.currentNo = 1; // Reset pagination when changing category
      state.pagination.hasMore = true; // Reset hasMore when changing category
      state.notification = "";
    },
    searchByName(state, action) {
      state.search.keyword = action.payload.searchKey.toLowerCase().trim();
      state.search.resultNo = action.payload.result.length;
      state.foodList.showed = action.payload.result;
      state.pagination.currentNo = 1; // Reset pagination when changing category
      state.pagination.hasMore = true; // Reset hasMore when changing category
    },
    nextPage(state, action) {
      state.pagination.currentNo = action.payload; // Append new items to the existing list
    },
    updateFoodList(state, action) {
      state.foodList.showed = state.foodList.showed.concat(action.payload); // Append new items to the existing list
    },
    updateNotification(state, action) {
      state.notification = action.payload
    },
    updateHasMore(state, action) {
      state.pagination.hasMore = action.payload
    }
  },
});

export const fetchFoodData = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
  const state = getState().food as FoodState; // Access the current state
  try {
    const lastItem = state.foodList.showed[state.foodList.showed.length - 1];
    const newFoodItems = await fetchFoods(
      lastItem ? lastItem : undefined,
      state.selectedCategory.id ?? undefined,
    );
    console.log("FETCH FOOD", newFoodItems)
    if (newFoodItems.length > 0) {
      dispatch(updateFoodList(newFoodItems));
      dispatch(nextPage(state.pagination.currentNo + 1));
      dispatch(updateNotification(""));
    } else {
      dispatch(updateNotification("No more food items available."));
      dispatch(updateHasMore(false))
    }
  } catch(e) {
    console.error(e)
    dispatch(updateNotification("Can't fetch food data. Please try again later."))
  }
};

export const {initFoodData, updateFoodList, changeCategory, updateHasMore, searchByName, nextPage, updateNotification} = foodSlice.actions;
export default foodSlice;
