import { FaPlus, FaMinus } from "react-icons/fa";
import { CartItemType } from '@open-foody/types';
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback";
import styles from "./CartItemA.module.scss";

export const CartItemA: React.FC<{
  item: CartItemType
  handleRemoveFromCart: (id: string) => void
  handleIncrementItemQuantity: (id: string) => void
  handleDecrementItemQuantity: (id: string) => void
}> = ({
  item,
  handleRemoveFromCart,
  handleIncrementItemQuantity,
  handleDecrementItemQuantity,
}) => {
  return (
    <div key={item.id} className={styles["cart-item"]}>
      <div className={styles["thumbnail-wrapper"]}>
        <ImageWithFallback
          className={styles.thumbnail}
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div>
        <h4 className={styles.name}>{item.name}</h4>
        <div className={styles.counter}>
          <button onClick={() => handleDecrementItemQuantity(item.id)}>
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => handleIncrementItemQuantity(item.id)}>
            <FaPlus />
          </button>
        </div>
      </div>
      <div className={styles["subtotal"]}>
        <div>${item.price.toFixed(2)}</div>
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