import { Dispatch, createSlice } from '@reduxjs/toolkit'
import type { FoodType } from '../components/FoodCard/FoodCard';

export const foodSlice = createSlice({
  name: 'food',
  initialState: {
    selectedCategory: {
      id: 'all',
      name: 'all'
    },
    foodList: {
      all: [],
      showed: [],
    }
  },
  reducers: {
    changeCategory(state, action) {
      if (action.payload.id === "all") {
        state.foodList.showed = state.foodList.all
        return
      }
      state.selectedCategory.id = action.payload.id;
      state.selectedCategory.name = action.payload.name;
      state.foodList.showed = state.foodList.all.filter((item: FoodType) => item.categoryId === action.payload.id)
    },
    mapFoodData(state, action) {
      state.foodList.all = action.payload
      state.foodList.showed = action.payload
    }
  }
})

export const fetchFoodData = () => (dispatch: Dispatch) => {
  fetch("https://run.mocky.io/v3/a24cfec5-f76c-410b-a5ac-9f63fab28abb")
    .then(response => response.json())
    .then(data => dispatch(foodActions.mapFoodData(data)))
    .catch(e => console.error(e))
}

export const foodActions = foodSlice.actions