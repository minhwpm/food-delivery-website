import { CartItemType } from "@/types/types";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import styles from "./CartItemC.module.scss";

const CartItemC: React.FC<{
  item: CartItemType;
}> = ({ item }) => {
  return (
    <div key={item.id} className={styles["cart-item"]}>
      <div className={styles["thumbnail-wrapper"]}>
        <ImageWithFallback
          className={styles["thumbnail"]}
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div>
        <h4 className={styles.name}>{item.name}</h4>
        <div className={styles.quantity}>Qty {item.quantity}</div>
      </div>
      <div className={styles["subtotal"]}>
        <p>${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItemC;
