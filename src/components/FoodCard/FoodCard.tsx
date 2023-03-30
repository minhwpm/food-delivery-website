import Badge from "../Badge/Badge"

export type PromotionType = '1+1' | 'gift' | 'discount'
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
  const { rating, promotion, isNew, categoryId, minCookTime, maxCookTime, restaurant, name, imageUrl } = props
  return (
    <div className="food-card">
      {promotion && <Badge type={promotion} />}
      <img className="thumbnail" src={imageUrl} alt={name} />
      <div className="info">
        <h3 className="title">{name} - {restaurant}</h3>
        <div className="tag-box">
          <span className="tag">{rating}</span>
          <span className="tag">{minCookTime}-{maxCookTime} min</span>
          {isNew && <span className="tag new">New</span>}
        </div>
      </div>
    </div>
  )
}