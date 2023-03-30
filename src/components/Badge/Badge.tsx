import React from "react"
import type { PromotionType } from "../FoodCard/FoodCard"
import GiftIcon from "../icons/GiftIcon"
import PercentIcon from "../icons/PercentIcon"

const Badge: React.FC<{type: PromotionType}> = ({type}) => {
  
  return (
    <span className={`badge ${type === "1+1" ? "plus-one" : type}`}>
      {type === "gift" && <GiftIcon />}
      {type === "discount" && <PercentIcon />}
      {type === "1+1" && type}
    </span>
  )
}

export default Badge