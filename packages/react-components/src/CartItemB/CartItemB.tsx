import { CartItemType } from '@open-foody/types';
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback";
import styles from "./CartItemB.module.scss";

export const CartItemB: React.FC<{
  item: CartItemType
  handleRemoveFromCart: (id: string) => void
}> = ({ item, handleRemoveFromCart }) => {
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
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};