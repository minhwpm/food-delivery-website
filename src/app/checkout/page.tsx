"use client"

import classNames from "classnames"
import styles from "./checkout.module.scss"
import { useCart } from "@/lib/hooks"
import CartItem from "@/components/CartItem/CartItem"
import Button from "@/components/Button/Button"

export default function CheckoutPage() {
  const { items, handleRemoveFromCart } = useCart()

  return (
    <main>
      <div className={classNames("container", styles["grid-container"])}>
        <div className={styles["grid-column"]}>
          <h2>Checkout</h2>
          <form className={styles["checkout-form"]}>
            <div className={styles["grid-container"]}>
              <div className={styles.field}>
                <input type="text" name="first-name" placeholder="First name" />
              </div>
              <div className={styles.field}>
                <input type="text" name="last-name" placeholder="Last name" />
              </div>
            </div>
            <div className={styles["grid-container"]}>
              <div className={styles.field}>
                <input type="phone" name="phone" placeholder="Phone" />
              </div>
              <div className={styles.field}>
                <input type="email" name="email" placeholder="Email" />
              </div>
            </div>
            <div className={styles.field}>
              <input type="text" name="address" placeholder="Your full address" />
            </div>
            <div className={styles.field}>
              <input type="text" name="city" placeholder="City" />
            </div>
          </form>
        </div>
        <div className={styles["order-summary"]}>
          {items.length > 0 && (
            <>
              <h2>Order Summary</h2>
              {items.map((item) => (
                <CartItem key={item.id} item={item} handleRemoveFromCart={handleRemoveFromCart} />
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
              <Button url="/cart">
                Confirm Order
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}