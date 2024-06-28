import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import FoodList from "../components/FoodList/FoodList";

async function fetchData(apiEndpoint: string) {
  try {
    const res = await fetch(apiEndpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch(e) {
    console.error(e)
    return []
  }
}

export default async function Home() {

  const categories = await fetchData(process.env.REACT_APP_CATEGORY_API as string)
  const foodItems = await fetchData(process.env.REACT_APP_FOOD_API as string)
  // console.log(foodItems)

  return (
    <main>
      <div className="container">
        {categories && !!categories.length && <CategoryFilter categories={categories} />}
        <FoodList foodItems={foodItems} />
      </div>
    </main>
  );

}