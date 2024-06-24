import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
    cart: cartSlice.reducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch