import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const options = ['Gastos', 'Plan Nutricional', 'Notas', 'Eventos'];

const Categories = () => {
  const navigation = useNavigation();

  const handleCategoryPress = category => {
    switch (category) {
      case 'Gastos':
        navigation.navigate('Gastos');
        break;
      case 'Plan Nutricional':
        navigation.navigate('Plan Nutricional');
        break;
      case 'Notas':
        navigation.navigate('Notas');
        break;
      case 'Eventos':
        navigation.navigate('Eventos');
        break;
      default:
        break;
    }
  };

  const renderItem = ({item}) => {
    let backgroundColor;
    switch (item) {
      case 'Gastos':
        backgroundColor = '#a9a2d9';
        break;
      case 'Plan Nutricional':
        backgroundColor = '#a2d9ab';
        break;
      case 'Notas':
        backgroundColor = '#F7DC6F';
        break;
      case 'Eventos':
        backgroundColor = '#d9b3a2';
        break;
      default:
        backgroundColor = 'red';
        break;
    }

    return (
      <View style={[styles.categoryContainer, {backgroundColor}]}>
        <TouchableOpacity onPress={() => handleCategoryPress(item)}>
          <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View style={styles.containerCategories}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContentContainer}
            style={{width: screenWidth}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerCategories: {
    width: '100%',
    padding: 10,
  },
  categoryContainer: {
    width: '49%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    fontSize: 21,
    color: '#333333',
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContentContainer: {
    alignItems: 'center',
  },
});

export default Categories;
