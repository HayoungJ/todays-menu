import { database } from '../lib/Firebase';
import { child, get, push, ref, remove, set } from 'firebase/database';
import { ILocation, IMeal } from '../types/types';

export const createUserLocation = async (userId: string, location: ILocation) => {
  try {
    const newLocationKey = push(child(ref(database), `users/${userId}/locations`)).key;
    await set(ref(database, `users/${userId}/locations/${newLocationKey}`), {
      ...location
    });
  } catch (error) {
    console.log(error);
  }
}

export const createLocationMeal = async (locationId: string, meal: IMeal) => {
  try {
    const newMealKey = push(child(ref(database), `locations/${locationId}/meals`)).key;
    await set(ref(database, `locations/${locationId}/meals/${newMealKey}`), {
      ...meal
    });
  } catch (error) {
    console.log(error);
  }
}

export const getUserLocations = async (userId: string) => {
  try {
    const data = await get(ref(database, `users/${userId}/locations`));
    return data.val();
  } catch (error) {
    console.error(error);
  }
}

export const getLocationMeals = async (locationId: string) => {
  try {
    const data = await get(ref(database, `locations/${locationId}/meals`));
    return data.val();
  } catch (error) {
    console.error(error);
  }
}

export const deleteUserLocation = async (userId: string, locationId: string) => {
  try {
    await remove(ref(database, `users/${userId}/locations/${locationId}`));
  } catch (error) {
    console.error(error);
  }
}

export const deleteLocationMeal = async (locationId: string, mealId: string) => {
  try {
    await remove(ref(database, `locations/${locationId}/meals/${mealId}`));
  } catch (error) {
    console.error(error);
  }
}