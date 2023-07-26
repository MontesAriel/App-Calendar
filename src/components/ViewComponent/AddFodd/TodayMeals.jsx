import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MealItem from './MealItem';

const TodayMeals = ({foods, onCompleteAddRemove}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {foods?.map((food, index) => (
          <MealItem
            key={`today-meal-item-${index}`}
            {...food}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginVertical: 16,
  },
});
export default TodayMeals;
