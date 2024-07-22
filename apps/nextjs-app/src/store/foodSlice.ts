import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { fetchFoods } from "@/lib/firestore";
import { FoodItemType } from "@/types/types";

const pageSize = 12;

interface FoodState {
  search: {
    keyword: string;
    resultNo: number;
  }
  pagination: {
    currentNo: number;
    hasMore: boolean;
  };
  selectedCategory: {
    id: string;
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
    id: "all",
    name: "All",
  },
  foodList: {
    all: [],
    showed: [],
  },
  notification: ""
};

function filterData(data: Array<FoodItemType>, state: FoodState): [Array<FoodItemType>, number] {
  const filtered = data
    .filter((item) => {
      return (
        (state.selectedCategory.id === "all" ||
          item.categoryId === state.selectedCategory.id) &&
        (state.search.keyword === "" ||
          item.name.toLowerCase().includes(state.search.keyword))
      );
    })
    return [filtered.slice(0, pageSize), filtered.length];
}

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    initFoodData(state, action) {
      state.foodList.all = action.payload;
      [ state.foodList.showed, state.search.resultNo ] = filterData(state.foodList.all, state);
    },
    changeCategory(state, action) {
      state.selectedCategory.id = action.payload.id;
      state.selectedCategory.name = action.payload.name;
      //reset state for pagination
      state.pagination.currentNo = 1;
      state.pagination.hasMore = true;

      [ state.foodList.showed, state.search.resultNo ] = filterData(state.foodList.all, state);
      if (state.foodList.showed.length < pageSize)
        state.pagination.hasMore = false;
    },
    searchByName(state, action) {
      state.search.keyword = action.payload.toLowerCase().trim();
      //reset state for pagination
      state.pagination.currentNo = 1;
      state.pagination.hasMore = true;

      [ state.foodList.showed, state.search.resultNo ] = filterData(state.foodList.all, state);
      if (state.foodList.showed.length < pageSize)
        state.pagination.hasMore = false;
    },
    nextPage(state) {
      const [ nextList ] = filterData(
        state.foodList.all.slice(
          state.foodList.showed[state.foodList.showed.length - 1].index + 1
        ),
        state
      );
      if (nextList.length < pageSize) state.pagination.hasMore = false;
      state.foodList.showed = state.foodList.showed.concat(nextList);
    },
    updateNotification(state, action) {
      state.notification = action.payload
    }
  },
});

export const fetchFoodData = () => async (dispatch: Dispatch) => {
  try {
    const foodItems = await fetchFoods()
    dispatch(initFoodData(foodItems))
  } catch(e) {
    console.error(e)
    dispatch(updateNotification("Can't fetch food data. Please try again later."))
  }
};

export const {initFoodData, changeCategory, searchByName, nextPage, updateNotification} = foodSlice.actions;
export default foodSlice;
