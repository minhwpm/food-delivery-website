import { cache } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "@/app/firebaseConfig";

export const fetchFoods = cache(async () => {
  const foodsCollection = collection(firestoreDb, "foods");
  const foodsSnapshot = await getDocs(foodsCollection);
  const foodItems = foodsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return foodItems;
});

export const fetchFoodCategories = cache(async() => {
  const categoriesCollection = collection(firestoreDb, "food-categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  const categoriesList = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return categoriesList;
})
