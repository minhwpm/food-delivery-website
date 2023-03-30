import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import FoodCard from './components/FoodCard/FoodCard';
import type { FoodType } from './components/FoodCard/FoodCard';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';


function App() {
  let [categories, setCategories] = useState([])
  let [foodList, setFoodList] = useState([])
  console.log(categories, foodList)

  useEffect(() => {
    
    fetch("https://run.mocky.io/v3/f25ced0a-9ff7-4996-bdc7-430f281c48db")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(e => console.error(e))

    fetch("https://run.mocky.io/v3/a24cfec5-f76c-410b-a5ac-9f63fab28abb")
      .then(response => response.json())
      .then(data => setFoodList(data))
      .catch(e => console.error(e))

  }, [])


  return (
    <div className="App container">
      
      {!!categories.length && (
        <CategoryFilter categories={categories} />
      )}

      <div className="food-list">
        {!!foodList.length && foodList.map((item: FoodType) => (
          <FoodCard {...item} />
        ))}
      </div>
    </div>
  );
}

export default App;
