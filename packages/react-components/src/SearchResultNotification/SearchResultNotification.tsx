import React from "react";
import styles from "./SearchResultNotification.module.scss"

export const SearchResultNotification: React.FC<{
  numberOfResults: number;
}> = ({ numberOfResults }) => {
  return (
    <div className={styles["search-result-notification"]}>
      <>
        {numberOfResults <= 1
          ? `There is ${numberOfResults} result.`
          : `There are ${numberOfResults} results.`}
      </>
    </div>
  );
};