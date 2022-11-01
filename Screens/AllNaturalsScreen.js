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
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardsVisitsComponent from "./CardsVisitsComponent";
import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import { useSelector, useDispatch } from "react-redux";
import places from "./places";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllNaturalssScreen({ navigation }) {

  const Card = ({place}) => {
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Details',place)}>
      <ImageBackground style={styles.cardImage} source={place.image}>
        
        <View style={{backgroundColor: '#335C67', opacity: 0.9, width: "100%", height: "40%", top: "60%"}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'white', paddingHorizontal: 10, paddingVertical: 5}}>{place.name}</Text>
            <Text style={{color: 'white', paddingHorizontal: 10}}>{place.location}</Text>
          </View>
        
        <Text style={{color: 'white', paddingHorizontal: 10, fontSize: 12}}>{place.hour}</Text>
        <Text style={{color: 'white', paddingHorizontal: 10,  paddingVertical: 5, fontSize: 12}}>{place.details2}</Text>
  
        </View>
        
      </ImageBackground>
      </TouchableOpacity>
    );
  };


  const [allNaturals, setAllNaturals] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);

  useEffect(() => {
    fetch(
      `http://192.168.1.43:4000/naturals/${destination.lon}/${destination.lat}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllNaturals(data.naturals);
        }
      });
  }, []);

  const hikes = allNaturals.map((data, i) => {
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
    <SafeAreaView style={{flex: 1}}>
        
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
            size={30}
            onPress={() => navigation.navigate("MyReservation")}
          />
          <FontAwesome
            style={styles.iconUser}
            name="user-circle-o"
            size={30} onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
      
      {/* <View style={styles.content}>
        <ImageBackground source={require("../assets/bg.jpg")} style={styles.bg}>
          <View style={styles.allcards}>{hikes}</View>
        </ImageBackground>
      </View> */}
      <View style={{marginTop: 20}}>
              <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              vertical
              showsHorizontalScrollIndicator={false}
              data={places}
              renderItem={({item}) => <Card place={item} /> } />
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection:'row',
    justifyContent: "space-between",
  },
  logo: {
    width: 30,
    height: 30,
  },
  menuHeader: {
    flexDirection: "row",
  },
  avatar: {
    width: "20%",
    height: "20%",
  },
  icon: {
    marginHorizontal: 20,
  },
  iconUser: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
  },
  cardImage: {
    height: 200,
    width: 350,
    marginRight: 20,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
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
