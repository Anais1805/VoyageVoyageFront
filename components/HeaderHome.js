import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";


export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      

        <View style={styles.iconHeader}>

            <View style={styles.logoHeader}>
                <TouchableOpacity>
                    <Image
                    style={styles.logo}
                    source={require("../assets/logo.png")}
                    onPress={() => navigation.navigate("Home")}
                    />
                 </TouchableOpacity>
            </View>

            <View style={styles.loginHome}>
                <TouchableOpacity onPress={() => navigation.navigate('Connection')} style={styles.login1} activeOpacity={0.8}>
                    <Text style={styles.btnLogin1}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.login2} activeOpacity={0.8}>
                    <Text style={styles.btnLogin2}>Se connecter</Text>
                </TouchableOpacity>
            </View> 
          
        </View>
     

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    marginTop: 45,
  },
  iconHeader: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  loginHome: {
    flexDirection: 'row',
    width: '100%',
  },
  login1: {
    width: '18%',
    height: '30%',
    marginRight: '2%',
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9E2A2B',
    shadowColor: "#9E2A2B",
    shadowOffset: {
          width: 0,
          height: 3,
          },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  login2: {
      width: '20%',
      height: '30%',
      borderRadius: 8,
      backgroundColor: '#9E2A2B',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#9E2A2B',
      shadowColor: "#9E2A2B",
      shadowOffset: {
            width: 0,
            height: 3,
            },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
  btnLogin1: {
    color: '#9E2A2B',
    fontWeight: 'bold',
    fontSize: 10,
  },
  btnLogin2: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 10,
  },
});
