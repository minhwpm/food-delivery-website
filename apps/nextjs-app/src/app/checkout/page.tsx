"use client"

import classNames from "classnames"
import styles from "./checkout.module.scss"
import { useCart } from "@open-foody/utils"
import { Button, CartItemA } from "@open-foody/react-components"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, handleRemoveFromCart, handleIncrementItemQuantity, handleDecrementItemQuantity } = useCart()

  return (
    <main>
      <div className={classNames("container", styles["grid-container"])}>
        <div className={styles["grid-column"]}>
          <h2>Checkout</h2>
          <form className={styles["checkout-form"]}>
            <div className={styles["field-group"]}>
              <div className={styles.field}>
                <input type="text" name="full-name" placeholder="Full name" />
              </div>
              
            </div>
            <div className={styles["field-group"]}>
              <div className={styles.field}>
                <input type="phone" name="phone" placeholder="Phone" />
              </div>
              <div className={styles.field}>
                <input type="email" name="email" placeholder="Email" />
              </div>
            </div>
            <div className={styles.field}>
              <input
                type="text"
                name="address"
                placeholder="Your full address"
              />
            </div>
            <div className={styles.field}>
              <input type="text" name="city" placeholder="City" />
            </div>
          </form>
        </div>
        <div className={styles["order-summary"]}>
          {items.length === 0 && (
            <div className={styles["cart-empty"]}>Your cart is empty</div>
          )}
          {items.length > 0 && (
            <>
              <h2>Order Summary</h2>
              {items.map((item) => (
                <CartItemA
                  key={item.id}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleIncrementItemQuantity={handleIncrementItemQuantity}
                  handleDecrementItemQuantity={handleDecrementItemQuantity}
                />
              ))}
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
              </div>
              <Button variant="black">
                <Link href="/cart">Confirm Order</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}