import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import markers from "../reducers/markers";
import { importMarkers } from "../reducers/markers";
import HeaderConnected from "../components/HeaderConnected";

const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
//const BACKEND_ADRESS = "http://192.168.1.43:4000";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [newPlace, setNewPlace] = useState("");
  const [myMarkers, setMyMarkers] = useState([]);
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
  let mark = [];
  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/destinations/${user.token}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("FETCH", data.destination);

        mark.push(data.destination);
        setMyMarkers(data.destination),
          dispatch(importMarkers(data.destination));
      });
  }, []);

  const mymarkers = useSelector((state) => state.markers.value);
  console.log("MYMARKERS", myMarkers);
  const markers = myMarkers.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: Number(data.lat), longitude: Number(data.lon) }}
        title={data.name}
      />
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#335C67" }}>
      <StatusBar />
      <View style={{flex: 1, backgroundColor: '#FFFBF7'}}>
  
  
  

  <View style={styles.header}>
    <View>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/logoWhite.png")}
          ></Image>
        </TouchableOpacity>
    </View>
    <HeaderConnected/>
</View>

        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <MapView mapType="hybrid" style={styles.map}>
            {currentPosition && (
              <Marker
                coordinate={currentPosition}
                title="My position"
                pinColor="#fecb2d"
              />
            )}
            {markers}
          </MapView>
          <FontAwesome
            style={{ marginRight: 20, marginTop: 10 }}
            name="arrow-left"
            size={30}
            color={"#9E2A2B"}
            onPress={() => navigation.navigate("Overview")}
          />
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
    width: 150,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10,

    borderRadius: 5,
  },
  iconP: {
    marginLeft: 300,
  },
  map: {
    width: "95%",
    height: "75%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  mymap: {
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 5,
    marginRight: 5,
  },
});
