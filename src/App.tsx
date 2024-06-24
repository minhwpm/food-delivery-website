import { useEffect, useState } from "react";
import { fetchFoodData, updateNotification, nextPage } from "./store/foodSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import FoodCard, { FoodItem } from "./components/FoodCard/FoodCard";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  
  const { foodList, pagination, search, notification } = useAppSelector(
    (s) => s.food
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(process.env.REACT_APP_CATEGORY_API as string)
      .then((response) => {
        console.log("RESPONSE", response);
        return response.json()
      })
      .then((data) => {
        console.log("DATA", data)
        setCategories(data)
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          updateNotification(
            "Can't fetch category data. Please try again later."
          )
        );
      });

    dispatch(fetchFoodData());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        {!!categories.length && <CategoryFilter categories={categories} />}
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
        {!!foodList.showed.length && (
          <div className="wrapper">
            <div className="food-list">
              {foodList.showed.map((item: FoodItem) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
            {pagination.hasMore ? (
              <div className="text-center">
                <Button onClick={() => dispatch(nextPage())}>
                  + Show more
                </Button>
              </div>
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
