export enum PromotionType {
  plusOne = "1+1",
  gift = "gift",
  discount = "discount",
}
export interface FoodItemType {
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

export interface CartItemType extends FoodItemType {
  quantity: number;
}

export interface FoodCategoryType {
  id: string;
  name: string;
}