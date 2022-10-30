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
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardsVisitsComponent from "./CardsVisitsComponent";
import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import { useSelector, useDispatch } from "react-redux";

export default function AllCulturalsScreen({ navigation }) {
  const [allCulturals, setAllCulturals] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);

  useEffect(() => {
    fetch(
      `http://192.168.1.43:4000/visits/${destination.lon}/${destination.lat}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllCulturals(data.visits);
        }
      });
  }, []);
  console.log("all", allCulturals);

  const allVisits = allCulturals.map((data, i) => {
    if (i < 100) {
      return (
        <CardsVisitsComponent
          key={i}
          name={data.name}
          kind={data.kinds}
          style={styles.cards}
        />
      );
    } else {
      return;
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </TouchableOpacity>
        <View style={styles.menuHeader}>
          <FontAwesome
            style={styles.icon}
            name="suitcase"
            size={40}
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
      <View style={styles.content}>
        <ImageBackground source={require("../assets/bg.jpg")} style={styles.bg}>
          <View style={styles.allcards}>{allVisits}</View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    borderBottomColor: "#9E2A2B",
    borderBottomWidth: 1,
  },
  menuHeader: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    marginTop: "12%",
    marginLeft: "45%",
  },
  logoContainer: {
    marginLeft: "-10%",
    marginBottom: "-5%",
  },
  logo: {
    width: "35%",
    height: "50%",
    marginLeft: "35%",
    marginTop: "22%",
  },
  avatar: {
    width: "20%",
    height: "20%",
  },
  icon: {
    marginLeft: "0.5%",
    marginRight: "2%",
    marginBottom: "15%",
    padding: 0,
    marginTop: 0,
  },
  content: {
    flex: 1,
  },
  bg: {
    width: "100%",
    height: "100%",
  },
  cards: {
    width: 100,
    height: 100,
  },
  allcards: {
    height: "100%",
    margin: 0,
  },
});
