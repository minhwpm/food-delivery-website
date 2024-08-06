import { CartItemType } from "@open-foody/types";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  items: CartItemType[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.unshift({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementItemQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity >= 1) {
        item.quantity += 1;
      }
    },
    decrementItemQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} = cartSlice.actions;
export default cartSlice;
