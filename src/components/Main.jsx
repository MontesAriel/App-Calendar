import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Categories from './Categories';
const Main = () => {
  return (
    <View style={styles.containerTitle}>
      <Image source={require('../../assets/logo.png')} />
      <Categories />
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Main;
