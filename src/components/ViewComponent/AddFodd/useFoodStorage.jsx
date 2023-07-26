import AsyncStorage from '@react-native-async-storage/async-storage';
import {isToday} from 'date-fns';
export const MY_FOOD_KEY = '@MyFood:Key';
export const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey, meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);
      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed),
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveFood = async ({calories, name, portion}) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveTodayFood = async ({calories, name, portion}) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(
          parsedFoods.filter(item => item.date && isToday(new Date(item.date))),
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveTodayFood = async ( index) => {
    try {
      const todayFood = await handleGetTodayFood();
      const filteredItems = todayFood.filter((item, itemIndex) => {
        return itemIndex !== index;
      });
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredItems),
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
};

export default useFoodStorage;
