import React from "react";
import styles from "./SearchResultNotification.module.scss"

export const SearchResultNotification: React.FC<{
  numberOfResults: number;
  searchKey: string;
}> = ({ numberOfResults, searchKey }) => {
  return (
    <div className={styles["search-result-notification"]}>
      <>
        {numberOfResults <= 1
          ? `There is ${numberOfResults} result for ${searchKey}.`
          : `There are ${numberOfResults} results for ${searchKey}.`}
      </>
    </div>
  );
};