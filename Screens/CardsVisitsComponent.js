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
import { useState } from "react";

export default function CardsVisitsComponent(props) {
  const [moreInfos, setMoreInfos] = useState(true);

  function infosPress() {
    setMoreInfos(!moreInfos);
  }

  let cards = {};
  if (moreInfos) {
    cards = { height: "20%" };
  } else {
    cards = { height: "70%" };
  }

  let image = {};
  if (moreInfos) {
    image = { height: "100%", width: "100%", borderRadius: 5, padding: "1%" };
  } else {
    image = { height: "55%", width: "100%", borderRadius: 5, padding: "1%" };
  }

  return (
    <View style={cards}>
      <View style={styles.cardcontainer}>
        <View style={styles.leftpart}>
          <Image style={image} source={require("../assets/rando.jpg")}></Image>
        </View>
        <View style={styles.rightpart}>
          <Text style={styles.title2}>{props.name}</Text>

          <Text style={styles.description}>{props.kind}</Text>

          <Pressable onPress={() => infosPress()}>
            {moreInfos && <Text style={styles.infos}>+ d'infos</Text>}
            {!moreInfos && <Text style={styles.infos}>- d'infos</Text>}
          </Pressable>
          <View style={styles.button}>
            {!moreInfos && (
              <Pressable style={styles.planButton}>
                <Text style={styles.buttonText}>Site Web</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: "5%",
  },
  description: {
    fontSize: 12,
    marginVertical: "5%",
  },
  infos: {
    fontSize: 12,
    color: "#9E2A2B",
    marginVertical: "5%",
  },
  button: {
    marginLeft: "55%",
    margin: "5%",
  },
  planButton: {
    backgroundColor: "#335C67",
    padding: 7,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
