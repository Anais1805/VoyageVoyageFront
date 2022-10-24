// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.js'
// import StartScreen from './screens/StartScreen';
// import ReservedScreen from './Screens/ReservedScreen';
import ProfileScreen from './Screens/ProfileScreen';
// import OverviewScreen from './Screens/OverviewScreen';
// import MyReservationScreen from './Screens/MyReservationScreen';
// import MyDayScreen from './Screens/MyDayScreen';
// import MapScreen from './Screens/MapScreen';
// import DaysScreen from './Screens/DaysScreen';
import ConnectionScreen from './Screens/ConnectionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
<NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Connection" component={ConnectionScreen} />
       <Stack.Screen name="Profile" component={ProfileScreen} />
       {/* <Stack.Screen name="Days" component={DaysScreen} />
      
       <Stack.Screen name="Profile" component={ProfileScreen} />
       <Stack.Screen name="Reserved" component={ReservedScreen} />
       <Stack.Screen name="MyReservation" component={MyReservationScreen} />
       <Stack.Screen name="MyDay" component={MyDayScreen} />
       <Stack.Screen name="Overview" component={OverviewScreen} />
       <Stack.Screen name="Map" component={MapScreen} /> */}
     </Stack.Navigator>
   </NavigationContainer>
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
