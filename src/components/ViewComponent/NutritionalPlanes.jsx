import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useFoodStorage from './AddFodd/useFoodStorage';
import TodayCalories from './AddFodd/TodayCalories';
import TodayMeals from './AddFodd/TodayMeals';

const NutritionalPlanes = () => {
  const [todayFood, setTodayFood] = useState([]);
  const [todayStatistics, setTodayStatistics] = useState({
    consumed: 0,
    percentage: 0,
    remaining: 0,
  });
  const {navigate} = useNavigation();
  const {onGetTodayFood} = useFoodStorage();
  const handleAddCaloriesPress = () => {
    navigate('Add Food');
  };
  const calculateTodayStatistics = meals => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );
      const remainingCalories = 2000 - caloriesConsumed;
      const percentage = (caloriesConsumed / 2000) * 100;
      setTodayStatistics({
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      calculateTodayStatistics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerCalories}>
        <View style={styles.containerText}>
          <Text style={styles.textStyle}>Calorías</Text>
        </View>
        <View style={styles.containerIcon} />
        <Button radius="lg" color="#6edb80" onPress={handleAddCaloriesPress}>
          <Text style={styles.iconStyle}>+</Text>
        </Button>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={todayFood}
        onCompleteAddRemove={() => loadTodayFood()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,

    backgroundColor: '#fff',
    flex: 1,
  },
  containerCalories: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 21,
    color: '#333',
  },
  iconStyle: {
    fontSize: 21,
    color: 'white',
    padding: 1,
    width: 30,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    textAlign: 'center',
  },
  containerIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default NutritionalPlanes;
