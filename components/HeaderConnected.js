import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import users from "../reducers/users";
import { logout} from "../reducers/users"


const {width} = Dimensions.get('screen')
export default function HeaderConnected() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleLogout = () => {
		dispatch(logout())
    navigation.navigate('Home')
	}
  return (
   
 
  
    <View style={styles.btnHeader}>
        
    <FontAwesome
    style={styles.icon}
    name="suitcase"
    size={30}
    color={'white'}
    onPress={() => navigation.navigate("MyReservation")}
  />
 

        <FontAwesome
    style={styles.icon}
    name="user-circle-o"
    size={30}
    color={'white'}
    onPress={() => navigation.navigate("Profile")}
  />
    <FontAwesome
    style={styles.icon}
    name="times-circle"
    size={30}
    onPress={() => handleLogout()}
  />
            
    </View>
    
    
   
  )}

  const styles = StyleSheet.create({
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: '#335C67'
    },
    btnHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    login1: {
      width: 100,
      height: 30,
      borderRadius: 8,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#FFF",
    },
    login2: {
      width: 100,
      height: 30,
      borderRadius: 8,
      backgroundColor: "#9E2A2B",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#9E2A2B",
      marginLeft: 10,
    },
    btnLogin1: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 10,
    },
    btnLogin2: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 10,
    },
    headerTitle: {
      color: "#9E2A2B",
      fontSize: 23,
      fontWeight: 'bold',
    },
    inputContainer: {
      borderRadius: 10,
      marginTop: 20, 
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    suggestTxt: {
      color: 'black',
      fontWeight: 'bold',
      marginHorizontal: 20,
      fontSize: 15,
    },
    cardImage: {
      height: 300,
      width: width / 1.5,
      marginRight: 20,
      marginTop: 20,
      overflow: 'hidden',
      borderRadius: 10,
    },
    btnToReserve: {
      backgroundColor: '#9E2A2B',
      width: 100,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 5, 
      borderRadius: 5 
    },
    btnDays:{
      backgroundColor: '#9E2A2B',
      width: 200,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 5, 
      borderRadius: 5,  
      fontWeight: 'bold',
      color: 'white'
      
    }, 
    days: {
      width: 250,
      height: 30,
      borderRadius: 8,
      backgroundColor: "#9E2A2B",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#9E2A2B",
      marginLeft: 10,
      marginLeft: '20%'
    },
    icon: {
      marginLeft: 14
    }
  });
  
  