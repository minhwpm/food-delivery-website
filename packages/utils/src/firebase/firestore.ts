import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { firestoreDb } from "./firebaseClient";
import { FoodItemType } from "@open-foody/types";

const PAGE_SIZE = 12

export const fetchFoods = async (
  startAfterDoc?: FoodItemType,
  categoryId?: string,
  pagination: boolean = true,
) => {

  try {
    const foodsCollection = collection(firestoreDb, "foods");
    let foodsQuery = query(foodsCollection); // Default query

    if (categoryId) {
      foodsQuery = query(foodsQuery, where("categoryId", "==", categoryId));
    }

    if (startAfterDoc) {
      const startAfterDocRef = startAfterDoc ? await getDoc(doc(firestoreDb, "foods", startAfterDoc.id)) : null;
      foodsQuery = query(
        foodsQuery,
        startAfter(startAfterDocRef)
      );
    }

    if (pagination) {
      foodsQuery = query(foodsQuery, limit(PAGE_SIZE));
    }

    const foodsSnapshot = await getDocs(foodsQuery);
    const foodItems = foodsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return foodItems
  } catch (error) {
    console.error("Error fetching foods:", error);
    return []
  }
};

export const fetchFoodCategories = async () => {
  const categoriesCollection = collection(firestoreDb, "food-categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  const categoriesList = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return categoriesList;
};
