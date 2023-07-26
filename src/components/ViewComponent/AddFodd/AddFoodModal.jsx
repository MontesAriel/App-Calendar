import {Button, Input} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import useFoodStorage from './useFoodStorage';

const AddFoodModal = ({onClose, visible, shouldUpdate }) => {
  const [calories, setCalories] = useState('');
  const [portion, setPortion] = useState('');
  const [name, setName] = useState('');
  const {onSaveFood} = useFoodStorage();
  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion,
      });
      onClose();
      shouldUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button onPress={() => onClose()} type="clear">
              <Text style={styles.textButtonClear}>x</Text>
            </Button>
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={calories}
                onChangeText={text => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>KCAL</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={name} onChangeText={text => setName(text)} />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={portion} onChangeText={text => setPortion(text)} />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Porción</Text>
            </View>
          </View>
          <Button
            title="Add +"
            color="#58d66d"
            onPress={handleAddPress}
            radius="lg"
            disabled={
              calories.trim() === '' ||
              name.trim() === '' ||
              portion.trim() === ''
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textButtonClear: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AddFoodModal;
