import { useAppDispatch } from "../../store/hooks";
import { searchByName } from "../../store/foodSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBox.module.scss"

const SearchBox = () => {
  const dispatch = useAppDispatch();
  return (
    <form>
      <span className={styles["search-icon"]}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color="#8C949B" />
      </span>
      <input
        placeholder="What are you craving today?"
        type="text"
        className={styles["search-field"]}
        onChange={(e) => {
          dispatch(searchByName(e.target.value));
        }}
      />
    </form>
  );
};
export default SearchBox;
