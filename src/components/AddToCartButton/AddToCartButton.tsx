"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FoodItemType } from "@/types/types";
import * as Toast from '@radix-ui/react-toast';
import Link from "next/link";
import CartItemC from "../CartItemC/CartItemC";
import styles from "./AddToCartButton.module.scss";

const AddToCartButton: React.FC<{
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
}> = ({ item, handleAddToCart }) => {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className={styles["add-to-cart-btn"]}
        onClick={() => {
          handleAddToCart(item);
          setOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
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

export default AddToCartButton;