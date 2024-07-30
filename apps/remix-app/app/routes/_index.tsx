import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { fetchFoodCategories, fetchFoods } from "@open-foody/utils";
import { useLoaderData } from "@remix-run/react";
import { CategoryFilter, FoodList } from "@open-foody/react-components";
import { FoodCategoryType, FoodItemType } from "@open-foody/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Open Foody" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const foodItems = await fetchFoods()
  const categories = await fetchFoodCategories()
  return { foodItems, categories }
}

export default function Index() {
  const { foodItems, categories } = useLoaderData<typeof loader>()
  
  return (
    <main>
      <div>
        { !!categories.length && <CategoryFilter categories={categories as FoodCategoryType[]} />}
        { !!foodItems.length && <FoodList foodItems={foodItems as FoodItemType[]} />}
      </div>
    </main>
  );
}
