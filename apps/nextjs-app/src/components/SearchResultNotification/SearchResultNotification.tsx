"use client";

import { useAppSelector } from "../../store/hooks";
import styles from "./SearchResultNotification.module.scss"

const SearchResultNotification = () => {
  const { search } = useAppSelector(
    (s) => s.food
  );

  return (
    <div className={styles["search-result-notification"]}>
      {search.keyword && (
        <>
          {search.resultNo <= 1
            ? `There is ${search.resultNo} result.`
            : `There are ${search.resultNo} results.`}
        </>
      )}
    </div>
  )
}

export default SearchResultNotification