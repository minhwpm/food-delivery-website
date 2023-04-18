import React from "react";
import { PromotionType } from "../FoodCard/FoodCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faPercent } from "@fortawesome/free-solid-svg-icons";

const Badge: React.FC<{ type: PromotionType }> = ({ type }) => {
  return (
    <span className={`badge ${type === PromotionType.plusOne ? "plus-one" : type}`}>
      {type === PromotionType.gift && <FontAwesomeIcon data-testid={PromotionType.gift} icon={faGift} />}
      {type === PromotionType.discount && (
        <FontAwesomeIcon data-testid={PromotionType.discount} icon={faPercent} />
      )}
      {type === PromotionType.plusOne && type}
    </span>
  );
};

export default Badge;