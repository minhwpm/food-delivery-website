"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart } from "@/store/cartSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useToggleDropdown } from "@/lib/hooks";
import Button from '@/components/Button/Button';
import styles from "./CardDropdown.module.scss"
import { useCallback } from "react";
import CartItemB from "../CartItemB/CartItemB";

const CartDropdown = () => {
  const { dropdownRef, dropdownOpen, toggleDropdown } = useToggleDropdown()
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch()

  const handleRemoveFromCart = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch])

  return (
    <div ref={dropdownRef} className={styles["cart-container"]}>
      <FontAwesomeIcon
        className={styles["cart-icon"]}
        icon={faCartShopping}
        onClick={toggleDropdown}
      />
      {dropdownOpen && (
        <div className={styles["cart-dropdown"]}>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Cart</h3>
            {items.length === 0 ? (
              <div className={styles["cart-empty"]}>Your cart is empty</div>
            ) : (
              <>
                <div className={styles["cart-item-list"]}>
                  {items.map((item) => (
                    <CartItemB key={item.id} item={item} handleRemoveFromCart={handleRemoveFromCart} />
                  ))}
                </div>
                <div className={styles["cart-total"]}>
                  <h3 className={styles["amount"]}>
                    Total: $
                    {items
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </h3>
                  <p>Shipping and taxes calculated at checkout.</p>
                  <div className={styles["button-group-container"]}>
                    <Button url="/cart">
                      View Cart
                    </Button>
                    <Button url="/checkout">
                      Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartDropdown;