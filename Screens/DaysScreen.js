import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Button,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import destinations from "../reducers/destinations";
import users, { addLikedDays } from "../reducers/users";
import dates from "../reducers/dates";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected"
import favorite from "../reducers/favorites";
import { addActivities, cleanActivities } from "../reducers/favorites";
import mylikedays, { removeMyDays } from "../reducers/mylikedays";
import { addMyDay } from "../reducers/mylikedays";
import { icon } from "@fortawesome/fontawesome-svg-core";
import AllCards from "../components/AllCards";

const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
//const BACKEND_ADRESS = "http://192.168.1.43:4000";

export default function DaysScreen({ navigation }) {
  const [allCulturals, setAllCulturals] = useState([]);
  const [allDetails, setAllDetails] = useState([]);

  const [heart, setHeart] = useState(false);

  const destination = useSelector((state) => state.destinations.value);
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [details, setDetails] = useState([]);
  const [myvisits, setMyVisits] = useState([]);
  const dates = useSelector((state) => state.dates.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const mydays = useSelector((state) => state.mylikedays.value);
  const favorites = useSelector((state) => state.favorite.value);

  const newPlace = {
    city: destination.city,
    lat: destination.lat,
    lon: destination.lon,
  };
  // useEffect(() => {
  //   fetch(`${BACKEND_ADRESS}/destinations`, {

  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       city: destination.city,
  //       lat: destination.lat,
  //       lon: destination.lon,

  //     }),
  //   })

  //  }, [heart]);

  function fisherYatesShuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  const shuffle = () => {
    fisherYatesShuffle(allDetails);
    fisherYatesShuffle(details);
    shuffleState ? setShuffleState(false) : setShuffleState(true);
  };

  let iconColor = {};

  if (heart) {
    iconColor = { color: "#9E2A2B" };
  } else {
    iconColor = { color: "#335C67" };
  }

  const heartPress = () => {
    setHeart(!heart);
    // if(!heart && favorites){dispatch(cleanActivities())}
  };

  const [shuffleState, setShuffleState] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/visits/${destination.lon}/${destination.lat}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllCulturals(data.visits);
          let tmp = data.visits.map((e) => e.xid);
          let cult = [];
          tmp.forEach((e) => {
            fetch(`${BACKEND_ADRESS}/infos/${e}`)
              .then((resp) => resp.json())
              .then((data) => {
                cult.push(data);
              })
              .finally(() => setAllDetails([...allDetails, ...cult]));

            // fisherYatesShuffle(allDetails)
          });
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/foods/${destination.lon}/${destination.lat}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllRestaurants(data.foods);
          let tmp = data.foods.map((e) => e.xid);
          let resto = [];
          tmp.forEach((e) => {
            fetch(`${BACKEND_ADRESS}/infos/${e}`)
              .then((resp) => resp.json())
              .then((data) => {
                resto.push(data);
              })
              .finally(() => setDetails([...details, ...resto]));
          });
        }
      });
  }, []);

  const visit = allDetails.map((data, i) => {
    const image = data.infos.preview?.source;
    if (i < 2) {
      return (
        <AllCards
          key={i}
          name={data.infos.name}
          city={data.infos.address?.city}
          source={
            image ??
            "https://mutuelle-mie.fr/assets/mieuploads/2021/11/Musee-Histoire-de-la-medecine.jpg"
          }
        />
      );
    } else {
      return;
    }
    // <CardsRestaurantsComponent key={i} name={data.infos.name} city={data.infos.address.city} source={{uri:data.infos.image}}/>)
  });

  const restaurants = details.map((data, j) => {
    const image = data.infos.preview?.source;
    if (j < 2) {
      return (
        <AllCards
          key={j}
          name={data.infos.name}
          city={data.infos.address?.city}
          source={
            image ??
            "https://restaurant-lasiesta.fr/wp-content/uploads/2022/03/la-siesta-restaurant-canet-en-roussillon-2-570x855.jpg"
          }
        />
      );
    } else {
      return;
    }

    // <CardsRestaurantsComponent key={i} name={data.infos.name} city={data.infos.address.city} source={{uri:data.infos.image}}/>)
  });

  console.log("ADD REDUCER FAVORITE", favorites);
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
          {!user.isConnected && <Header/>}
          {user.isConnected && <HeaderConnected />}
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}></View>
        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>
            Votre journée à {destination.city}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              style={iconColor}
              name="heart"
              size={40}
              onPress={() => {
                // dispatch(addActivities({activities: }))
                dispatch(addMyDay(newPlace));
                // dispatch(removeMyDays());
                heartPress();
                {
                  user.isConnected && navigation.navigate("MyReservation");
                }
                {
                  !user.isConnected && navigation.navigate("Profile");
                }
              }}
            />
            <FontAwesome
              style={styles.icon}
              name="refresh"
              size={40}
              color={"#9E2A2B"}
              onPress={() => shuffle()}
            />
          </View>
        </View>
        <ScrollView>
          {visit}
          {restaurants}
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
    height: 130,
    width: 350,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 5,
  },

  // container: {
  //     flex: 1,
  //     width:'100%',
  //     height: '100%',
  // },
  // header: {
  //     width: '100%',
  //     height: '12%',
  //     flexDirection: 'row',
  // },
  // menuHeader: {
  //     flexDirection: "row",
  //     width: "100%",
  //     height: 100,
  //     marginTop: "15%",
  //     marginLeft: "25%",
  // },
  // logo: {
  //     width: "40%",
  //     height: "50%",
  //     marginLeft: "30%",
  //     marginTop: "40%",
  // },
  // login1: {
  //     width: '18%',
  //     height: '30%',
  //     marginRight: '2%',
  //     borderRadius: 8,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderWidth: 1,
  //     borderColor: '#9E2A2B',
  //     shadowColor: "#9E2A2B",
  //     shadowOffset: {
  //         width: 0,
  //         height: 3,
  //         },
  //     shadowOpacity: 0.27,
  //     shadowRadius: 4.65,
  //     elevation: 6,
  // },
  // login2: {
  //     width: '20%',
  //     height: '30%',
  //     borderRadius: 8,
  //     backgroundColor: '#9E2A2B',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderWidth: 1,
  //     borderColor: '#9E2A2B',
  //     shadowColor: "#9E2A2B",
  //     shadowOffset: {
  //         width: 0,
  //         height: 3,
  //         },
  //     shadowOpacity: 0.27,
  //     shadowRadius: 4.65,
  //     elevation: 6,
  // },
  // btnLogin1: {
  //     color: '#9E2A2B',
  //     fontWeight: 'bold',
  //     fontSize: 10,
  // },
  // btnLogin2: {
  //     color: '#FFF',
  //     fontWeight: 'bold',
  //     fontSize: 10,
  // },
  // content: {
  //     flex: 1,
  // },
  // bg: {
  //     width: '100%',
  //     height: '100%',
  //     alignItems: 'center',
  //     justifyContent: 'space-between'
  // },
  // text: {
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //     color: 'black',
  // },
  // titleDay:{
  //     width: '90%',
  //     height: '10%',
  //     borderRadius: 5,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 50,
  // },
  // pageNumber:{
  //     flexDirection: "row",
  //     width: '90%',
  //     height: '7%',
  //     borderRadius: 5,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginBottom: 50,
  // },
  // pagePlace:{
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  // },
  // button:{
  //     color: 'red'
  // },
  // pageChangement: {
  //     width: '20%',
  //     height: '40%',
  //     marginRight: '5%',
  //     marginLeft: '5%',
  //     borderRadius: 8,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderWidth: 1,
  //     borderColor: '#9E2A2B',
  // }
});
