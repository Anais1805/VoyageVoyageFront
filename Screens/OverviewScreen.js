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
// import { addPlace, allPlaces } from '../reducers/user';
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import dates from "../reducers/dates";
import { removeMyDates } from "../reducers/dates";
import markers from "../reducers/markers";
import { importMarkers } from "../reducers/markers";
import { addMyDay, removeMyDays } from "../reducers/mylikedays";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const dates = useSelector((state) => state.dates.value);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [myMarkers, setMyMarkers]= useState([])
  const [myDates, setMyDates]=useState([])
  useEffect(() => {
    fetch(`http://192.168.1.43:4000/destinations/${user.token}`)
    .then(resp => resp.json())
      .then(data =>{
        console.log('FETCH', data.destination)
         setMyMarkers(data),
        dispatch(importMarkers(data.destination))
        })}, [])
        useEffect(() => {
        fetch(`http://192.168.1.43:4000/bookings/${user.token}`)
        .then(resp => resp.json())
          .then(data =>{
            console.log('BOOK', data.Journeys)
            setMyDates(data.Journeys)
          dispatch(addMyDay(data.Journeys)) 
            })}, []);


            const mydays = useSelector((state) => state.mylikedays.value);
            console.log('DATESDATES', mydays);
   


  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status === "granted") {
  //       Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
  //         setCurrentPosition(location.coords);
  //       });
  //     }
  //   })();
  // }, []);
  

  // console.log('USERS', user.token)
  const mymarkers = useSelector((state) => state.markers.value)
  // console.log('MYMARKERS', mymarkers)
  const markers = mymarkers.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: Number(data.lat), longitude: Number(data.lon) }} title={data.city} />;
  });
  const myBookingDays = mymarkers.map((data, i) => {
    console.log('HELLO', data.date)
    if (data) {
      return (
        <View key={i} style={styles.btnToReserve}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            Journée à/en {data.city}
          </Text>
        </View>
      );
    }
  });

  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar />
      <View style={styles.header}>
        <View>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 40, height: 40 }}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View style={styles.btnHeader}>
          <FontAwesome
            style={{ marginRight: 10 }}
            name="suitcase"
            size={40}
            color={"#9E2A2B"}
            onPress={() => navigation.navigate("MyReservation")}
          />

          <FontAwesome
            style={styles.icon}
            name="user-circle-o"
            size={40}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}></View>
      <View style={styles.titleRestoContainer}>
        <Text style={styles.titleResto}>Récapitulatif</Text>
        <FontAwesome
          style={styles.iconP}
          name="bitbucket"
          size={30}
          onPress={() => dispatch(removeMyDates())}
        />
      </View>
      
        <View
          style={{ paddingVertical: 3, flexWrap: "wrap", flexDirection: "row", justifyContent: 'space-around', marginVertical: 10 }}
        >
          {myBookingDays}
        </View>

        <View style={{ width: "100%", height: "50%", alignItems: "center", }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.mymap}>My Map</Text>
          <FontAwesome
         style={styles.iconE}
          name="expand"
          size={25}
          onPress={() => navigation.navigate('Map')}
        />
        </View>
          <MapView
            onLongPress={() => navigation.navigate("Map")}
            mapType="hybrid"
            style={styles.map}
          >
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
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignItems: 'center',
    marginVertical: 10
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
    width: 170,
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
    paddingLeft: '30%'
  },
  iconE: {
   
    paddingLeft: '30%'
  }
});
