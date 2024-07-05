import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import styles from "./CartItem.module.scss";

const CartItem = ({ item, handleRemoveFromCart }) => {
  return (
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
          onClick={handleRemoveFromCart.bind(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;