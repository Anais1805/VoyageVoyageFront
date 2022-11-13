import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AllCards from "../components/AllCards";

// import CardsRestaurantsComponent from "./CardsRestaurantsComponent";

import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import activities from "../reducers/activities";
import { useSelector, useDispatch } from "react-redux";
import { activitiesInfos } from "../reducers/activities";
import places from "./places";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected";

const BACKEND_ADRESS = "http://192.168.1.43:4000";

export default function AllRestaurantsScreen({ navigation }) {
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);
  const user = useSelector((state) => state.user.value);
  const activity = useSelector((state) => state.activities.value);

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/foods/${destination.lon}/${destination.lat}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllRestaurants(data.foods);
          let tmp = data.foods.map((e) => e.xid);
          // setXid(tmp);
          // console.log(data.foods)
          let resto = [];
          tmp.forEach((e) => {
            fetch(`${BACKEND_ADRESS}/infos/${e}`)
              .then((resp) => resp.json())
              .then((data) => {
                resto.push(data);
                // setAllDetails([...allDetails,data])
              })
              .finally(() => setAllDetails([...allDetails, ...resto]));
          });
        }
      });
  }, []);

  // console.log('DETAILS', allDetails)

  const restaurants = allDetails.map((data, i) => {
    let image = data.infos.preview?.source;
    return (
      <AllCards
        key={i}
        name={data.infos.name}
        city={data.infos.address.city}
        source={
          image ??
          "https://restaurant-lasiesta.fr/wp-content/uploads/2022/03/la-siesta-restaurant-canet-en-roussillon-2-570x855.jpg"
        }
      />
    );
   
  });

  console.log(destination.city);

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
          {!user.isConnected && <Header />}
          {user.isConnected && <HeaderConnected />}
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}></View>
        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>
            Les restaurants à {destination.city}
          </Text>
        </View>
        <ScrollView style={styles.scrollViewer}>{restaurants}</ScrollView>
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
    backgroundColor: '#335C67'
  },

  
  searchContainer: {
    flexDirection: "row",
  },
  cardImage: {
    height: 130,
    width: 350,
    marginRight: 20,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 5,
    width: "46.5%",
    marginBottom: 15,
    backgroundColor: "white",
  },

  
  cards: {
    width: 100,
    height: 20,
  },
  allcards: {
    //flex:0.80,

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

    marginLeft: 10,
  },
});
