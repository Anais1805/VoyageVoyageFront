import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.js'
import StartScreen from './Screens/StartScreen';
// import ReservedScreen from './Screens/ReservedScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OverviewScreen from './Screens/OverviewScreen';
import MyReservationScreen from './Screens/MyReservationScreen';

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

const Stack = createNativeStackNavigator();

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

export default function App() {
  
  
  return (

<Provider store={store}>
<PersistGate persistor={persistor}>
<NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Start" component={StartScreen} />
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Connection" component={ConnectionScreen} />
       <Stack.Screen name="Profile" component={ProfileScreen} />
       <Stack.Screen name="Overview" component={OverviewScreen} />
       <Stack.Screen name="MyReservation" component={MyReservationScreen} />
       <Stack.Screen name="Map" component={MapScreen} />  
       <Stack.Screen name="MyDay" component={MyDayScreen} />
       <Stack.Screen name="Days" component={DaysScreen} />

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
