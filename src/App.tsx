import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import FoodCard from './components/FoodCard/FoodCard';
import type { FoodType } from './components/FoodCard/FoodCard';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import { fetchFoodData } from './store/foodSlice';
import { useAppSelector, useAppDispatch } from './store/hooks'

function App() {
  const [categories, setCategories] = useState([])
  const showedFood = useAppSelector(s => s.food.foodList.showed)
  const dispatch = useAppDispatch()
  console.log(showedFood)

  useEffect(() => {
    
    fetch("https://run.mocky.io/v3/f25ced0a-9ff7-4996-bdc7-430f281c48db")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(e => console.error(e))

    dispatch(fetchFoodData())

  }, [dispatch])


  return (
    
      <div className="App container">
        {!!categories.length && (
          <CategoryFilter categories={categories} />
        )}
        <div className="food-list">
          {!!showedFood.length && showedFood.map((item: FoodType) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>
  );
}

export default App;
