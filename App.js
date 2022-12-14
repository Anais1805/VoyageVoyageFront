import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Screens/HomeScreen.js'
import StartScreen from './Screens/StartScreen';
// import ReservedScreen from './Screens/ReservedScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OverviewScreen from './Screens/OverviewScreen';


import DetailsScreen from './Screens/DetailsScreen';

import MyReservationScreen from './Screens/MyReservationScreen';
import AllCulturalsScreen from './Screens/AllCulturalsScreen.js';
import AllNaturalssScreen from './Screens/AllNaturalsScreen.js';
import AllRestaurantsScreen from './Screens/AllRestaurantsScreen.js';
import Card from './components/Card.js'

import HeaderConnected from './components/HeaderConnected.js';
import Header from './components/Header.js';
import MyDayScreen from './Screens/MyDayScreen';
import MapScreen from './Screens/MapScreen';
import DaysScreen from './Screens/DaysScreen';
import ConnectionScreen from './Screens/ConnectionScreen';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'
import user from './reducers/users'
import destinations from './reducers/destinations.js';
import activities from './reducers/activities.js';
import mylikedays from './reducers/mylikedays.js';
import favorite from './reducers/favorites';




const Stack = createNativeStackNavigator();

const persistConfig = {
  key: "voyagevoyage",
  storage: AsyncStorage,
};

const reducers = combineReducers({user, destinations, activities, mylikedays, favorite})



const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
let persistor = persistStore(store);

export default function App() {
  
  
  return (

<Provider store={store}>
<PersistGate persistor={persistor}>
<NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
    
       <Stack.Screen name="Start" component={StartScreen} />
       <Stack.Screen name='Header' component={Header}/>
      <Stack.Screen name='HeaderConnected' component={HeaderConnected}/>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="AllRestaurants" component={AllRestaurantsScreen} />
       <Stack.Screen name="AllCulturals" component={AllCulturalsScreen} />
       <Stack.Screen name="AllNaturals" component={AllNaturalssScreen} />
       <Stack.Screen name="Connection" component={ConnectionScreen} />
       <Stack.Screen name="Profile" component={ProfileScreen} />
       <Stack.Screen name="Overview" component={OverviewScreen} />
        <Stack.Screen name="MyReservation" component={MyReservationScreen} /> 
       <Stack.Screen name="Map" component={MapScreen} />  
       <Stack.Screen name="MyDay" component={MyDayScreen} />
       <Stack.Screen name="Days" component={DaysScreen} />
       <Stack.Screen name="Card" component={Card} />
       <Stack.Screen name='Details' component={DetailsScreen}/>
       {/* <Stack.Screen name="Reserved" component={ReservedScreen} />
        <Stack.Screen name="Overview" component={OverviewScreen} />*/}
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
