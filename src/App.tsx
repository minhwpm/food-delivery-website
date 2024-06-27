import { useEffect, useState } from "react";
import { fetchFoodData, updateNotification } from "./store/foodSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import Header from "./components/Header/Header";
import SearchResultNotification from "./components/SearchResultNotification/SearchResultNotification";
import FoodList from "./components/FoodList/FoodList";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  
  const { foodList, notification } = useAppSelector(
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
        <SearchResultNotification />
        {notification && <span>{notification}</span>}
        {!!foodList.showed.length && (
          <FoodList />
        )}
      </div>
    </div>
  );
}

export default App;