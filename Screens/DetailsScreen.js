import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details({ navigation, route }) {
  const place = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{ flex: 0.7 }} source={place.image}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require("../assets/leftRight.png")}
              style={styles.leftIcon}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.imageDetails}>
          <Text
            style={{
              width: "70%",
              fontSize: 30,
              color: "white",
              marginBottom: 20,
            }}
          >
            {place.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              style={styles.iconHeart}
              source={require("../assets/iconHeart.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems:'flex-start', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{flexDirection: 'row'}}>
          <Image
            style={{ width: 28, height: 28 }}
            source={require("../assets/iconLocation.png")}
          />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: "bold",
              color: "#9E2A2B",
            }}
          >
            {place.location}
          </Text>
          </View>
         
          <View style={{alignItems: 'flex-end'}}>
          
            <Text style= {{fontWeight: 'bold', fontSize: 14}}>{place.hour}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
          A propos
        </Text>
        <Text style={{ marginTop: 20, lineHeight: 22 }}>{place.details}</Text>
      </View>
      <View style={styles.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{place.price}</Text>
        </View>
        <TouchableOpacity>
        <View style={styles.btnReservecontainer}>
            <Text style={styles.btnReserve}>Réservez</Text>
        </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  leftIcon: {
    width: 40,
    height: 40,
  },
  imageDetails: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },
  detailsContainer: {
    top: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flex: 0.3,
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    backgroundColor: "white",
    borderRadius: 30,
    right: 20,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 40.0,

    elevation: 24,
  },
  iconHeart: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: "#335C67",
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  btnReservecontainer: {
    backgroundColor: 'white',
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnReserve: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9E2A2B',
  }
});
