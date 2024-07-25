"use client";
import * as Toast from '@radix-ui/react-toast';
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FoodItemType } from "@open-foody/types";
import { CartItemC } from "../CartItemC/CartItemC";
import styles from "./AddToCart.module.scss";

export const AddToCart: React.FC<{
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
}> = ({ item, handleAddToCart }) => {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider duration={3000} swipeDirection="right">
      <button
        className={styles["add-to-cart"]}
        onClick={() => {
          handleAddToCart(item);
          setOpen(true);
        }}
      >
        <FaPlus />
      </button>
      <Toast.Root
        className={styles.ToastRoot}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className={styles.ToastTitle}>
          Added to cart!
        </Toast.Title>
        <Toast.Description className={styles.ToastDescription}>
          <CartItemC item={{...item, quantity: 1}} />
        </Toast.Description>
        <Toast.Close asChild className={styles.ToastAction}>
          <Link href="/cart">View Cart</Link>
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
};