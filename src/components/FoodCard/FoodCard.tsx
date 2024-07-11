"use client";

import classNames from "classnames";
import Badge from "../Badge/Badge"
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback"
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FoodItemType } from "@/types/types";
import { useCart } from "@/lib/hooks";
import styles from "./FoodCard.module.scss"

export enum PromotionType {
  plusOne = "1+1",
  gift = "gift",
  discount = "discount",
}

const FoodCard: React.FC<{ item: FoodItemType }> = ({item}) => {
  const {
    price,
    rating,
    promotion,
    isNew,
    minCookTime,
    maxCookTime,
    name,
    imageUrl,
  } = item;
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
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles["tag-box"]}>
          <div className={styles.tag}>
            <FontAwesomeIcon icon={faStar} color="#6A6466" />
            {rating.toFixed(1)}
          </div>
          <div className={styles.tag}>
            {minCookTime}-{maxCookTime} min
          </div>
          {isNew && (
            <div className={classNames(styles.tag, styles.new)}>New</div>
          )}
        </div>
        <div className={styles.price}>${price.toFixed(2)}</div>
        <div className={styles["btn-wrapper"]}>
          <AddToCartButton item={item} handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}

export default FoodCard