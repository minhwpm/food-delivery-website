import React from "react";
import classNames from "classnames";
import { PromotionType } from "../FoodCard/FoodCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faPercent } from "@fortawesome/free-solid-svg-icons";
import styles from "./Badge.module.scss"

const Badge: React.FC<{ type: PromotionType }> = ({ type }) => {
  return (
    <span
      className={classNames(
        styles["badge"],
        { [styles["plus-one"]]: type === PromotionType.plusOne},
        { [styles.gift]: type === PromotionType.gift},
        { [styles.discount]: type === PromotionType.discount},
      )}
    >
      {type === "gift" && (
        <FontAwesomeIcon data-testid={"gift"} icon={faGift} />
      )}
      {type === PromotionType.discount && (
        <FontAwesomeIcon
          data-testid={PromotionType.discount}
          icon={faPercent}
        />
      )}
      {type === PromotionType.plusOne && type}
    </span>
  );
};

export default Badge;