import { FoodCategoryType } from "@/types/types";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import FoodList from "../components/FoodList/FoodList";
import { fetchFoodCategories, fetchFoods } from "@/lib/firestore";

export const revalidate = 3600 // revalidate the data at most every hour

export default async function Home() {
  const foodItems = await fetchFoods()
  const categories = await fetchFoodCategories()
  return (
    <main>
      <div className="container">
        { !!categories.length && <CategoryFilter categories={categories as FoodCategoryType[]} />}
        { !!foodItems.length && <FoodList foodItems={foodItems} />}
      </div>
    </main>
  );
}