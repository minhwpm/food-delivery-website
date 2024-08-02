"use client";
import { addToCart, decrementItemQuantity, incrementItemQuantity, removeFromCart, useAppDispatch, useAppSelector } from "@open-foody/redux-store"
import { FoodItemType } from "@open-foody/types"
import { useCallback } from "react"

export const useCart = () => {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch()

  const handleAddToCart = useCallback((item: FoodItemType) => {
    dispatch(addToCart(item));
  }, [dispatch])

  const handleRemoveFromCart = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch])

  const handleIncrementItemQuantity = useCallback((id: string) => {
    dispatch(incrementItemQuantity(id))
  }, [dispatch])

  const handleDecrementItemQuantity = useCallback((id: string) => {
    dispatch(decrementItemQuantity(id))
  }, [dispatch])

  return {
    items,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrementItemQuantity,
    handleDecrementItemQuantity,
  };
};