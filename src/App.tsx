import { useEffect, useState } from "react";
import "./App.css";
import FoodCard from "./components/FoodCard/FoodCard";
import type { FoodType } from "./components/FoodCard/FoodCard";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import { fetchFoodData, foodActions } from "./store/foodSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import Button from "./components/Button/Button";
import SearchBox from "./components/SearchBox/SearchBox";

function App() {
  const [categories, setCategories] = useState([]);
  const { foodList, pagination, searchQuery } = useAppSelector((s) => s.food);
  const dispatch = useAppDispatch();
  console.log(foodList.showed);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/f25ced0a-9ff7-4996-bdc7-430f281c48db")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));

    dispatch(fetchFoodData());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="container">
        <SearchBox />
          <div className="search-result-noti">
            {searchQuery && (
              <>
                {foodList.showed.length <= 1
                  ? `There is ${foodList.showed.length} result.`
                  : `There are ${foodList.showed.length} results.`}
              </>
            )}
          </div>
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
