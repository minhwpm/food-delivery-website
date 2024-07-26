"use client"
import { useCallback } from "react";
import { removeFromCart, useAppSelector, useAppDispatch } from "@open-foody/redux-store"
import { FaBasketShopping } from "react-icons/fa6";
import { useToggleDropdown } from "@open-foody/utils";
import { Button } from '../Button/Button';
import { CartItemB } from "../CartItemB/CartItemB"
import Link from "next/link"
import styles from "./CardDropdown.module.scss"

export const CartDropdown = () => {
  const { dropdownRef, dropdownOpen, toggleDropdown } = useToggleDropdown()
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch()
  const handleRemoveFromCart = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch])

  const quantity = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div ref={dropdownRef} className={styles["cart-container"]}>
      <FaBasketShopping
        className={styles["cart-icon"]}
        onClick={toggleDropdown}
      />
      {quantity > 0 && <div className={styles.quantity}>{quantity}</div>}
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
                    <CartItemB
                      key={item.id}
                      item={item}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
                </div>
                <div className={styles["cart-total"]}>
                  <div className={styles["amount"]}>
                    <span>Subtotal</span>
                    <span>
                      $
                      {items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <p className={styles.note}>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className={styles["button-group-container"]}>
                    <Button asChild><Link href="/cart">View Cart</Link></Button>
                    <Button variant="black" asChild>
                      <Link href="/checkout">Checkout</Link>
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