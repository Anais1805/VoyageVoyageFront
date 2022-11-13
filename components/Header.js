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
import { SafeAreaView } from "react-native-safe-area-context";
import ModalSearch from "../components/ModalSearch";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";


import users from "../reducers/users";
import { logout} from "../reducers/users"

import { useNavigation } from "@react-navigation/native";

const {width} = Dimensions.get('screen')
export default function Header() {
const navigation = useNavigation()
    return (
      
      <View style={styles.btnHeader}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.login1}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin1}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity

              onPress={() => navigation.navigate('Connection')}

              style={styles.login2}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin2}>Se connecter</Text>
            </TouchableOpacity>
     
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