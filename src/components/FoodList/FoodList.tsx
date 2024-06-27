import { nextPage } from "../../store/foodSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Button from "../Button/Button";
import FoodCard, { FoodItem } from "../FoodCard/FoodCard";
import styles from "./FoodList.module.scss"

const FoodList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { foodList, pagination } = useAppSelector(
    (s) => s.food
  );
  return (
    <div className={styles["food-list"]}>
      <div className={styles.grid}>
        {foodList.showed.map((item: FoodItem) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
      {pagination.hasMore ? (
        <div className="text-center">
          <Button onClick={() => dispatch(nextPage())}>+ Show more</Button>
        </div>
      ) : (
        <div className="text-center">No more results</div>
      )}
    </div>
  );
};

export default FoodList;
