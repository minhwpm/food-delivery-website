import { useEffect, useState } from "react";
import "./App.css";
import FoodCard, {FoodType} from "./components/FoodCard/FoodCard";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import { fetchFoodData, foodActions } from "./store/foodSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import Button from "./components/Button/Button";
import SearchBox from "./components/SearchBox/SearchBox";

function App() {
  const [categories, setCategories] = useState([]);
  const { foodList, pagination, search, notification } = useAppSelector((s) => s.food);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(process.env.REACT_APP_CATEGORY_API as string)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((e) => {
        console.error(e)
        dispatch(foodActions.updateNotification("Can't fetch category data. Please try again later."))
      });

    dispatch(fetchFoodData());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="container">
        <SearchBox />
        <div className="search-result-noti">
          {search.keyword && (
            <>
              {search.resultNo <= 1
                ? `There is ${search.resultNo} result.`
                : `There are ${search.resultNo} results.`}
            </>
          )}
        </div>
        {notification && <span>{notification}</span>}
        {!!categories.length && <CategoryFilter categories={categories} />}
        {!!foodList.showed.length && (
          <div className="wrapper">
            <div className="food-list">
              {foodList.showed.map((item: FoodType) => (
                <FoodCard key={item.id} {...item} />
              ))}
            </div>
            {pagination.hasMore ? (
              <Button onClick={() => dispatch(foodActions.nextPage())}>
                + Show more
              </Button>
            ) : (
              <div className="text-center">No more results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
