import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import dates from "../reducers/dates";
import { removeMyDates } from "../reducers/dates";

import { importMarkers, removeMarkers } from "../reducers/markers";
import { addMyDay, removeMyDays } from "../reducers/mylikedays";
import { addMyDates } from "../reducers/dates";
import markers from "../reducers/markers";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected";

const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
//const BACKEND_ADRESS = "http://192.168.1.43:4000";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const dates = useSelector((state) => state.dates.value);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [myMarkers, setMyMarkers] = useState([]);
  const [myDates, setMyDates] = useState([]);
  let mark = [];
  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/destinations/${user.token}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("FETCH", data.destination);
        mark.push(data.destination);
        setMyMarkers(data.destination);
      });
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  // // console.log('USERS', user.token)
  const mymarkers = useSelector((state) => state.markers.value);
  //  console.log('MYMARKER', mymarkers)

  console.log("MARK", myMarkers);

  const markers = myMarkers.map((data, i) => {
    if (data !== null) {
      return (
        <Marker
          key={i}
          coordinate={{
            latitude: Number(data.lat),
            longitude: Number(data.lon),
          }}
          title={data.city}
        />
      );
    }
  });
  const myBookingDays = myMarkers.map((data, i) => {
    if (data) {
      return (
        <View key={i} style={styles.btnToReserve}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            Journée du {data.date} à {data.city}
          </Text>
        </View>
      );
    }
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
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}></View>
        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>Récapitulatif</Text>
          <FontAwesome
            style={styles.iconP}
            name="bitbucket"
            size={20}
            onPress={() => {
              dispatch(removeMyDays());
              dispatch(removeMarkers());
              dispatch(removeMyDates());
            }}
          />
        </View>

        <View
          style={{
            paddingVertical: 3,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          {myBookingDays}
        </View>

        <View style={{ width: "100%", height: "40%", alignItems: "center" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.mymap}></Text>
          </View>
          <MapView
            onLongPress={() => navigation.navigate("Map")}
            mapType="hybrid"
            style={styles.map}
          >
            <FontAwesome
              style={styles.iconE}
              name="expand"
              size={25}
              color={"white"}
              onPress={() => navigation.navigate("Map")}
            />
            {currentPosition && (
              <Marker
                coordinate={currentPosition}
                title="My position"
                pinColor="#fecb2d"
              />
            )}
            {markers}
          </MapView>
        </View>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  titleResto: {
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 5,
    position: "absolute",
    marginBottom: 15,
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
  btnToReserve: {
    backgroundColor: "#9E2A2B",
    width: 250,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,

    borderRadius: 5,
  },
  iconP: {
    marginLeft: 300,
  },
  map: {
    width: "95%",
    height: "80%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  mymap: {
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 5,
    paddingLeft: "30%",
  },
  iconE: {
    marginBottom: 190,
    marginLeft: 300,
  },
});
