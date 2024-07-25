import { configureStore } from "@reduxjs/toolkit";
import foodSlice, { fetchFoodData } from "./foodSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
    cart: cartSlice.reducer,
  }
});

// store.dispatch(fetchFoodData())

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export * from "./hooks"
export * from "./foodSlice"
export * from "./cartSlice"