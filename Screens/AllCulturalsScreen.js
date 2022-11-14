import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import activities from "../reducers/activities";
import { useSelector, useDispatch } from "react-redux";
import { activitiesInfos } from "../reducers/activities";
import places from "./places";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected";
import users from "../reducers/users";
import AllCards from "../components/AllCards";
const BACKEND_ADRESS = "http://192.168.1.43:4000";
export default function AllCulturalsScreen({ navigation }) {
  const [allCulturals, setAllCulturals] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [xid, setXid] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);
  const user = useSelector((state) => state.user.value);
  const activity = useSelector((state) => state.activities.value);

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
                // setAllDetails([...allDetails,data])
              })
              .finally(() => setAllDetails([...allDetails, ...cult]));
          });
        }
      });
  }, []);

  const visit = allDetails.map((data, i) => {
    const image = data.infos.preview?.source;

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
          {!user.isConnected && <Header />}
          {user.isConnected && <HeaderConnected />}
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}></View>
        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>
            Les visites à {destination.city}
          </Text>
        </View>

        <ScrollView style={styles.scrollViewer}>{visit}</ScrollView>
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

  searchContainer: {
    flexDirection: "row",
  },
  cardImage: {
    height: 130,
    width: 350,
    marginHorizontal: 10,
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
