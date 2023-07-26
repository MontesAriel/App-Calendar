import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button} from '@rneui/base';
import {Input} from '@rneui/themed';
import AddFoodModal from './AddFoodModal';
import useFoodStorage from './useFoodStorage';
import MealItem from './MealItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MY_FOOD_KEY} from './useFoodStorage';

const AddFood = () => {
  const [visible, setVisible] = useState(false);
  const [savedFood, setSavedFood] = useState(false);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const {onGetFoods} = useFoodStorage();

  const handleDeleteFood = async ({calories, portion, name}) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        const updatedFoods = currentSavedFoodParsed.filter(
          food =>
            food.calories !== calories ||
            food.portion !== portion ||
            food.name !== name,
        );

        await AsyncStorage.setItem(MY_FOOD_KEY, JSON.stringify(updatedFoods));

        setFoods(updatedFoods);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods().catch(null);
  }, []);

  useEffect(() => {
    if (savedFood) {
      Alert.alert('Comida guardada exitosamente');
      setSavedFood(false);
    }

    fetchFoods();
  }, [savedFood]);

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter(item =>
          item?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addFoodContainer}>
        <View style={styles.leyendContainer}>
          <Text style={styles.addFoodLeyend}>Add Food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button radius="lg" color="#6edb80" onPress={() => setVisible(true)}>
            <Text style={styles.iconStyle}>+</Text>
          </Button>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, pie, soda..."
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <Button
          title="Search"
          radius="lg"
          color="#a2d9ab"
          onPress={handleSearchPress}
          titleStyle={styles.searchTitle}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((food, i) => (
          <MealItem
            key={i}
            calories={food.calories}
            portion={food.portion}
            name={food.name}
            onDeletedFood={handleDeleteFood}
            isAbleToAdd
          />
        ))}
      </ScrollView>
      <AddFoodModal
        onClose={handleModalClose}
        visible={visible}
        shouldUpdate={setSavedFood}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: '#fff',
  },

  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
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
  leyendContainer: {
    flex: 1,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addFoodLeyend: {
    fontSize: 21,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchTitle: {
    color: '#333',
  },
});

export default AddFood;
