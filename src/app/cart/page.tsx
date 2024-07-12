"use client"

import classNames from "classnames"
import styles from "./cart.module.scss"
import { useCart } from "@/lib/hooks"
import Button from "@/components/Button/Button"
import CartItemA from "@/components/CartItemA/CartItemA"
import { useMemo } from "react"

export default function CheckoutPage() {
  const { items, handleRemoveFromCart, handleIncrementItemQuantity, handleDecrementItemQuantity } = useCart()
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items])
  const shipping = subtotal > 0 ? 5 : 0
  const totalAmount = useMemo(() => subtotal + shipping + subtotal*0.1, [subtotal])

  return (
    <main>
      <div className={classNames("container")}>
        <h2>Cart</h2>
        <div className={styles["wrapper"]}>
          <div className={styles["cart-listing"]}>
            {items.length === 0 && (
              <div className={styles["cart-empty"]}>Your cart is empty</div>
            )}
            {items.length > 0 && (
              <>
                {items.map((item) => (
                  <CartItemA
                    key={item.id}
                    item={item}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleIncrementItemQuantity={handleIncrementItemQuantity}
                    handleDecrementItemQuantity={handleDecrementItemQuantity}
                  />
                ))}
                
              </>
            )}
          </div>
          <div className={styles["order-summary"]}>
            <div className={styles.amount}>
              <span>Subtotal</span>
              <span>
                $ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className={styles.amount}>
              <span>Shipping estimate</span>
              <span>
                $ {shipping.toFixed(2)}
              </span>
            </div>
            <div className={styles.amount}>
              <span>Tax estimate</span>
              <span>
                $ {(subtotal*0.1).toFixed(2)}
              </span>
            </div>

            <div className={classNames(styles.amount, styles.total)}>
              <span>Order Total</span>
              <span>
                $ {totalAmount.toFixed(2)}
              </span>
            </div>
            <Button url="/checkout" variant="black">Checkout</Button>
          </div>
      </div>
      </div>
    </main>
  );
}