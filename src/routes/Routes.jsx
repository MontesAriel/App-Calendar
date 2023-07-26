import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from '../components/ViewComponent/Notes';
import Events from '../components/ViewComponent/Events';
import Bills from '../components/ViewComponent/Bills';
import Main from '../components/Main';
import NutritionalPlanes from '../components/ViewComponent/NutritionalPlanes';
import AddFood from '../components/ViewComponent/AddFodd/AddFood';

const Stack = createNativeStackNavigator();
const routeBills = {
  headerStyle: {
    backgroundColor: '#a9a2d9',
  },
};
const routeNotes = {
  headerStyle: {
    backgroundColor: '#F7DC6F',
  },
};
const routeEvents = {
  headerStyle: {
    backgroundColor: '#d9b3a2',
  },
};
const routePlanesNut = {
  headerStyle: {
    backgroundColor: '#a2d9ab',
  },
};
const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={Main}>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Gastos" component={Bills} options={routeBills} />
      <Stack.Screen
        name="Plan Nutricional"
        component={NutritionalPlanes}
        options={routePlanesNut}
      />
      <Stack.Screen name="Notas" component={Notes} options={routeNotes} />
      <Stack.Screen name="Eventos" component={Events} options={routeEvents} />
      <Stack.Screen name="Add Food" component={AddFood} options={routePlanesNut} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
