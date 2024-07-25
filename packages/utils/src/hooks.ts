"use client";
import { addToCart, decrementItemQuantity, incrementItemQuantity, removeFromCart, useAppDispatch, useAppSelector } from "@open-foody/redux-store"
import { FoodItemType } from "@open-foody/types"
import { useCallback, useEffect, useRef, useState } from "react"

export const useToggleDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [ dropdownOpen, setDropdownOpen ] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownOpen])

  return { dropdownRef, dropdownOpen, toggleDropdown }
}

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