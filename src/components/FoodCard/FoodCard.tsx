"use client";

import Badge from "../Badge/Badge"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons'
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback"
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice"
import styles from "./FoodCard.module.scss"
import classNames from "classnames";

export enum PromotionType {
  plusOne = "1+1",
  gift = "gift",
  discount = "discount",
}
export interface FoodItem {
  id: string
  index: number
  rating: number
  promotion: PromotionType
  isNew: boolean
  categoryId: string
  minCookTime: number 
  maxCookTime: number
  price: number
  restaurant: string
  name: string
  imageUrl: string
}

export default function FoodCard({ item }: { item: FoodItem }) {
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
  const dispatch = useAppDispatch();

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
        <div className={styles["add-to-cart-btn-wrapper"]}>
          <button
            className={styles["add-to-cart-btn"]}
            onClick={() => dispatch(addToCart(item))}
          >
            <FontAwesomeIcon icon={faPlus} color="" />
          </button>
        </div>
      </div>
    </div>
  );
}