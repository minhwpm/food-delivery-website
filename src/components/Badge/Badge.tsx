import React from "react";
import type { PromotionType } from "../FoodCard/FoodCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faPercent } from "@fortawesome/free-solid-svg-icons";

const Badge: React.FC<{ type: PromotionType }> = ({ type }) => {
  return (
    <span className={`badge ${type === "1+1" ? "plus-one" : type}`}>
      {type === "gift" && <FontAwesomeIcon data-testid="gift" icon={faGift} />}
      {type === "discount" && (
        <FontAwesomeIcon data-testid="discount" icon={faPercent} />
      )}
      {type === "1+1" && type}
    </span>
  );
};

export default Badge;
