import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    ScrollView
  } from "react-native";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import { useState } from "react";
  import AllRestaurantsScreen from "./AllRestaurantsScreen";
  
  
  export default function  CardsRestaurantsComponent  (props)  {
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Details', allDetails)}>
      <ImageBackground style={styles.cardImage} source={props.source}>
        
        <View style={{backgroundColor: '#335C67', opacity: 0.9, width: "100%", height: "40%", top: "60%"}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'white', paddingHorizontal: 10, paddingVertical: 5}}>{props.name}</Text>
            <Text style={{color: 'white', paddingHorizontal: 10}}>{props.city}</Text>
          </View>
        
        {/* <Text style={{color: 'white', paddingHorizontal: 10, fontSize: 12}}>{place.hour}</Text> */}
        {/* <Text style={{color: 'white', paddingHorizontal: 10,  paddingVertical: 5, fontSize: 12}}>{place.details2}</Text>
   */}
        </View>
        
      </ImageBackground> 
      </TouchableOpacity>
    );

  }
  
  const styles = StyleSheet.create({
    cards:{
        height:'20%',
      
    },
    cardcontainer: {
      
      flexDirection: "row",
      borderColor: "#9E2A2B",
      borderWidth: 1,
      borderRadius: 5,
      margin: "3%",
      backgroundColor: "white",
     
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 5,
      padding: "1%",
    },
    leftpart: {
      flex: 0.4,
      margin: "2%",
    },
    rightpart: {
      flex: 0.6,
      alignItems: "flex-start",
      justifyContent: "space-around",
      margin: "2%",
    },
    title2: {
      fontWeight: "bold",
      marginVertical: '5%'
    },
    description: {
      fontSize: 12,
      marginVertical: '5%'
    },

  };


  const styles = StyleSheet.create({
  cardImage: {
    height: 200,
    width: 350,
    marginRight: 20,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 10,
  }
})