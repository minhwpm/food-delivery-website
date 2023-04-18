import Badge from "../Badge/Badge"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export enum PromotionType {
  plusOne = '1+1',
  gift = 'gift',
  discount = 'discount',
}
export type FoodType = {
  id: string
  index: number
  rating: number
  promotion: PromotionType
  isNew: boolean
  categoryId: string
  minCookTime: number 
  maxCookTime: number
  restaurant: string
  name: string
  imageUrl: string
}

export default function FoodCard(props: FoodType) {
  const { index, rating, promotion, isNew, minCookTime, maxCookTime, name, imageUrl } = props
  return (
    <div className="food-card">
      {promotion && <Badge type={promotion} />}
      <img className="thumbnail" src={imageUrl} alt={name} />
      <div className="info">
        <h3 className="title">
          {index} - {name}
        </h3>
        <div className="tag-box">
          <span className="tag">
            <FontAwesomeIcon icon={faStar} color="#6A6466" />
            {rating.toString().substring(0, 3)}
          </span>
          <span className="tag">{minCookTime}-{maxCookTime} min</span>
          {isNew && <span className="tag new">New</span>}
        </div>
      </div>
    </div>
  )
}