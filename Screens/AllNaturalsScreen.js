import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  StatusBar
} from "react-native";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import { useSelector, useDispatch } from "react-redux";
import places from "./places";
import AllCards from "../components/AllCards";
import { SafeAreaView } from "react-native-safe-area-context";

const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
//const BACKEND_ADRESS = 'http://192.168.1.43:4000'
export default function AllNaturalssScreen({ navigation }) {
  const [city, setCity] = useState("");
  const [allNaturals, setAllNaturals] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [xid, setXid] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);
  const user = useSelector((state)=> state.user.value)
  const activity = useSelector((state) => state.activities.value);

  useEffect(() => {
    fetch(



      `${BACKEND_ADRESS}/naturals/${destination.lon}/${destination.lat}`


    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllNaturals(data.naturals);
          let tmp = data.naturals.map((e) => e.xid);
          // setXid(tmp);
          // console.log("DDDDDD", data.naturals);
          let nature = [];
          tmp.forEach((e) => {


            fetch(`${BACKEND_ADRESS}/infos/${e}`)


              .then((resp) => resp.json())
              .then((data) => {
                nature.push(data);
                // setAllDetails([...allDetails,data])
              })
              .finally(() => setAllDetails([...allDetails, ...nature]));
          });
        }
      });
  }, []);

  // console.log(allDetails);
  const hikes = allDetails.map((data, i) => {

    const image = data.infos.preview?.source


    return (
      <AllCards
        key={i}
        name={data.infos.name}
        city={data.infos.address?.city}
        source={
          image ??
          "https://france3-regions.francetvinfo.fr/image/v0vf_b8jc4d_nDoH5thBr9Vnu4Q/600x400/regions/2020/06/09/5edf5bcbe8030_photo_sancy-3767849.jpg"
        }
      />
    );
  });
  

  console.log(destination.city);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#335C67' }}>
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
   
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}></View>
      <View style={styles.titleRestoContainer}>
        <Text style={styles.titleResto}>
          Les randonnées à {destination.city}
        </Text>
      </View>
      {/* <View style={styles.content}>
        <ImageBackground source={require("../assets/bg.jpg")} style={styles.bg}>
          <View style={styles.allcards}>{hikes}</View>
        </ImageBackground>
      </View> */}
      {/* <View style={{marginTop: 20}}>
              <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              vertical
              showsHorizontalScrollIndicator={false}
              data={places}
              renderItem={({item}) => <Card place={item} /> } />
            </View> */}
      <ScrollView style={styles.scrollViewer}>{hikes}</ScrollView>
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
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 10
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

