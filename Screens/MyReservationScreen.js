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
  ImageBackground,
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
import BookingCards from "../components/BookingCards";
import { addLikedDays } from "../reducers/users";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected";
import { logout } from "../reducers/users";

const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
//const BACKEND_ADRESS = "http://192.168.1.43:4000";
export default function MyReservationScreen({ navigation }) {
  const dispatch = useDispatch();
  const poub = useSelector((state) => state.mylikedays.value);
  const user = useSelector((state) => state.user.value);

  const mydays = useSelector((state) => state.mylikedays.value);
  console.log("DAYSDAYS", mydays);

  const myBookings = mydays.map((data, i) => {
    return (
      <BookingCards key={i} name={data.city} lat={data.lat} lon={data.lon} />
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#335C67" }}>
      <StatusBar />
      <View style={{ flex: 1, backgroundColor: "#FFFBF7" }}>
        <View style={styles.header}>
          <View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/logoWhite.png")}
          ></Image>
        </TouchableOpacity>
          </View>
          
           <HeaderConnected />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}></View>
        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>Vos journées à planifier</Text>

          <FontAwesome
            style={styles.iconP}
            name="bitbucket"
            size={30}
            onPress={() => dispatch(removeMyDays())}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {myBookings}
          <Pressable
            style={styles.btnToReserve}
            onPress={() => navigation.navigate("Overview")}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              Voir mon récapitulatif
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#335C67",
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
    fontWeight: "bold",
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
    paddingBottom: 5,
  },
  scrollViewer: {
    height: "100%",

    marginLeft: 20,
  },
  cardImage: {
    height: 200,
    width: 350,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  btnToReserve: {
    backgroundColor: "#9E2A2B",
    width: 200,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "40%",
    marginTop: 10,

    borderRadius: 5,
  },
});
