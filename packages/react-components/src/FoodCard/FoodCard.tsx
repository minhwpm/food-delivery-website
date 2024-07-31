import classNames from "classnames";
import { Badge } from "../Badge/Badge"
import { ImageWithFallback } from "../ImageWithFallback/ImageWithFallback"
import { AddToCart } from "../AddToCart/AddToCart";
import { FaStar } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { FoodItemType } from "@open-foody/types";
import { useCart } from "@open-foody/utils";
import styles from "./FoodCard.module.scss"

export enum PromotionType {
  plusOne = "1+1",
  gift = "gift",
  discount = "discount",
}

export const FoodCard: React.FC<{ item: FoodItemType }> = ({item}) => {
  const {
    price,
    rating,
    promotion,
    isNew,
    minCookTime,
    maxCookTime,
    ingredient,
    name,
    imageUrl,
  } = item;
  console.log("Food item", item);
  const { handleAddToCart } = useCart()

  return (
    <div className={styles["food-card"]}>
      {promotion && <Badge type={promotion} />}
      <div className={styles["thumbnail-wrapper"]}>
        <ImageWithFallback
          className={styles.thumbnail}
          src={imageUrl}
          alt={name}
        />
        {isNew && (
          <div className={classNames(styles.tag, styles.new)}>New</div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{name}</h3>
        
        <div className={styles["tag-box"]}>
          <div className={styles.tag}>
            <FaStar className={styles.star} />
            {rating.toFixed(1)}
          </div>
          <div className={styles.tag}>
            <CiClock2 className={styles.clock} />{minCookTime}-{maxCookTime} min
          </div>
          
        </div>
        { ingredient && (
          <div className={styles.ingredient}>
            {ingredient}
          </div>
        )}
        <div className={styles.price}>${price.toFixed(2)}</div>
        <div className={styles["btn-wrapper"]}>
          <AddToCart item={item} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}