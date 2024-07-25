import { FoodCategoryType, FoodItemType } from "@open-foody/types";
import { FoodList, CategoryFilter } from "@open-foody/react-components";
import { fetchFoodCategories, fetchFoods } from "@open-foody/utils";

export const revalidate = 3600 // revalidate the data at most every hour

export default async function Home() {
  const foodItems = await fetchFoods()
  const categories = await fetchFoodCategories()
  return (
    <main>
      <div className="">
        { !!categories.length && <CategoryFilter categories={categories as FoodCategoryType[]} />}
        { !!foodItems.length && <FoodList foodItems={foodItems as FoodItemType[]} />}
      </div>
    </main>
  );
}