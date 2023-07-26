import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
const TodayCalories = ({
  total = 2000,
  consumed = 0,
  remaining = 0,
  percentage = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <AnimatedCircularProgress
          size={150}
          width={10}
          fill={percentage}
          tintColor="#6edb80"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#f5f5f5">
          {percentage => (
            <Text style={styles.porcentage}>{`${percentage} %`}</Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.today}>Hoy</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Consumido</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Restante</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  today: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
    marginBottom: 14,
  },
  rightItemLeyend: {
    flex: 1,
  },
  rightItemValue: {
    flex: 1,
    textAlign: 'right',
  },
  porcentage: {
    fontSize: 37,
    color: '#6edb80',
  },
});

export default TodayCalories;
