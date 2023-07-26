import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button} from '@rneui/themed';
import useFoodStorage from './useFoodStorage';

const MealItem = ({
  calories,
  portion,
  name,
  isAbleToAdd,
  itemPosition,
  onCompleteAddRemove,
}) => {
  const {onSaveTodayFood, onDeleteTodayFood} = useFoodStorage();

  const handleAddIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({calories, portion, name});
        Alert.alert('Comida agregada al día');
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert('comida eliminada exitosamente');
      }
      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
      Alert.alert('Comida no agregada');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.buttonsContainer}>
          <Button color="#a2d9ab">
            <Text style={styles.buttonDeleted} onPress={handleAddIconPress}>
              {isAbleToAdd ? '+' : 'x'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a2d9ab',
    color: '#333',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
  },
  portion: {
    color: '#333',
  },
  calories: {
    color: '#333',
    fontWeight: '500',
  },
  buttonDeleted: {
    fontSize: 21,
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    marginBottom: -10,
  },
  buttonsContainer: {},
});

export default MealItem;
