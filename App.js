import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Screens/HomeScreen.js'
import StartScreen from './Screens/StartScreen';
import ReservedScreen from './Screens/ReservedScreen';
import ProfileScreen from './Screens/ProfileScreen';
// import OverviewScreen from './Screens/OverviewScreen';
import MyReservationScreen from './Screens/MyReservationScreen';
import MapScreen from './Screens/MapScreen';

import MyDayScreen from './Screens/MapScreen';
import DaysScreen from './Screens/DaysScreen';
import ConnectionScreen from './Screens/ConnectionScreen';

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'
import user from './reducers/users'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const persistConfig = {
  key: "voyagevoyage",
  storage: AsyncStorage,
};
const reducers = combineReducers({user})



const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
let persistor = persistStore(store);


const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        }
 
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2196f3',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
 
       <Tab.Screen name="Connection" component={ConnectionScreen} />
    </Tab.Navigator>
  );
 }




export default function App() {
  return (

 <Provider store={store}>
  <PersistGate persistor={persistor}>
    <NavigationContainer>
          
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Connection" component={ConnectionScreen} /> 
            <Stack.Screen name="Profile" component={ProfileScreen} /> 
            <Stack.Screen name="MyReservation" component={MyReservationScreen} /> 
            <Stack.Screen name="Map" component={MapScreen} />   
            <Stack.Screen name="Reserved" component={ReservedScreen} /> 
            <Stack.Screen name="MyDay" component={MyDayScreen} /> 
            {/* <Stack.Screen name="Overview" component={OverviewScreen} />  */}
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
           </Stack.Navigator> 
    </NavigationContainer>
    </PersistGate>
    </Provider> 

    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
