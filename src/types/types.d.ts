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

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface FoodCategoryType {
  id: string;
  name: string;
}