import Badge from "../Badge/Badge"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons'
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback"
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice"

export enum PromotionType {
  plusOne = "1+1",
  gift = "gift",
  discount = "discount",
}
export type FoodItem = {
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
    <div className="food-card">
      <div className="info">
        {promotion && <Badge type={promotion} />}
        <h3 className="title">
          {name}
        </h3>

        <div className="tag-box">
          <span className="tag">
            <FontAwesomeIcon icon={faStar} color="#6A6466" />
            {rating.toString().substring(0, 3)}
          </span>
          <span className="tag">
            {minCookTime}-{maxCookTime} min
          </span>
          {isNew && <span className="tag new">New</span>}
        </div>
        <div className="price">${price}</div>
      </div>
      <div className="thumbnail-wrapper">
        <ImageWithFallback
          className="thumbnail"
          src={imageUrl}
          alt={name}
        />
        <div className="add-to-cart-btn-wrapper">
          <button
            className="add-to-cart-btn"
            onClick={() => dispatch(addToCart(item))}
          >
            <FontAwesomeIcon icon={faPlus} color="" />
          </button>
        </div>
      </div>
    </div>
  );
}