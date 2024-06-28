"use client";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeFromCart } from "../../store/cartSlice"
import Button from '../Button/Button';
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import styles from "./CardDropdown.module.scss"

const CartDropdown = () => {
  const {items} = useAppSelector(s => s.cart)
  const dispatch = useAppDispatch()

  return (
    <div className={styles["cart-dropdown"]}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Cart</h3>
        {items.length === 0 ? (
          <div className={styles["cart-empty"]}>
            Your cart is empty
          </div>
        ) : (
          <>
            <div className={styles["cart-item-list"]}>
              {items.map((item) => (
                <div key={item.id} className={styles["cart-item"]}>
                  <div className={styles["quantity"]}>{item.quantity}x</div>

                  <div className={styles["thumbnail-wrapper"]}>
                    <ImageWithFallback
                      className={styles["thumbnail"]}
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </div>
                  <h4 className={styles["name"]}>{item.name}</h4>
                  <div className={styles["subtotal"]}>
                    <p>${item.price.toFixed(2)}</p>
                    <button
                      className={styles["remove-btn"]}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
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
                <Button onClick={() => console.log("View Cart")}>
                  View Cart
                </Button>
                <Button onClick={() => console.log("Checkout")}>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDropdown;