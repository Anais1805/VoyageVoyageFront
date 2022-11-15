import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Pressable,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground
  } from "react-native";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import { Calendar } from "react-native-calendars";
  import { useState, useEffect } from "react";
  import { LocaleConfig } from "react-native-calendars";
  import { useDispatch } from "react-redux";
  import { useSelector } from "react-redux";
  import mylikedays from "../reducers/mylikedays";
  import { removeMyDays } from "../reducers/mylikedays";
  import dates, { removeMyDates } from "../reducers/dates";
  import { addMyDates } from "../reducers/dates";

  const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
  // const BACKEND_ADRESS = 'http://192.168.1.43:4000'

export default function AllCards(props) {
    return (<ImageBackground
        
        style={styles.cardImage}
        source={{
          uri: props.source}}
      >
        <View
          style={{
            backgroundColor: "#335C67",
            opacity: 0.9,
            width: "100%",
            height: "40%",
            top: "60%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "right",
              marginLeft : 15
            }}
          >
            <Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 15,
                fontSize: 15

              }}
            >
              {props.name}
            </Text>
           
          </View>

          {/* <Text style={{color: 'white', paddingHorizontal: 10, fontSize: 12}}>{data.infos.adress}</Text>  */}
          <Text
            style={{
              color: "white",
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontSize: 12,
            }}
          >
            {/* {data.infos.wikipedia_extracts?.text} */}
          </Text>
        </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    header: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: '#335C67'
    },
   
   
    searchContainer: {
      flexDirection: "row",
    },
    cardImage: {
      height: 130,
      width: 350,
      marginHorizontal: 10,
      marginVertical: 10,
      overflow: "hidden",
      borderRadius: 10
    },
    input: {
      borderWidth: 1,
      borderColor: "#E1E1E1",
      padding: 5,
      width: "46.5%",
      marginBottom: 15,
      backgroundColor: "white",
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    iconSearch: {
      backgroundColor: "#9E2A2B",
      padding: 5,
      marginBottom: "50%",
    },
    cards: {
      width: 100,
      height: 20,
    },
    allcards: {
      // flex:0.80,
      height: "100%",
      margin: 0,
  
    },
    scrollView: {
      height: 20,
    },
    titleRestoContainer: {
    
      alignItems: "center",
    },
    titleResto: {
      fontSize: 26,
      fontWeight: "bold",
    },
    scrollViewer: {
  
      height: "100%",
  
      marginLeft: 5,
    },
  });
  
  