import React from "react";
import classNames from "classnames";
import { PromotionType } from "../FoodCard/FoodCard";
import { FaGift } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";

import styles from "./Badge.module.scss"

const Badge: React.FC<{ type: PromotionType }> = ({ type }) => {
  return (
    <span
      className={classNames(
        styles["badge"],
        { [styles["plus-one"]]: type === PromotionType.plusOne },
        { [styles.gift]: type === PromotionType.gift },
        { [styles.discount]: type === PromotionType.discount }
      )}
    >
      {type === "gift" && <FaGift data-testid={"gift"} />}
      {type === PromotionType.discount && (
        <FaPercent data-testid={PromotionType.discount} />
      )}
      {type === PromotionType.plusOne && type}
    </span>
  );
};

export default Badge;