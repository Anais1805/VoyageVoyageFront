import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,

  FlatList,

  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardsRestaurantsComponent from "./CardsRestaurantsComponent";
import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import activities from "../reducers/activities";
import { useSelector, useDispatch } from "react-redux";
import { activitiesInfos } from "../reducers/activities";

export default function AllRestaurantsScreen({ navigation }) {
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [allDetails, setAllDetails]= useState([])
  const [xid, setXid] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);
  console.log(destination);


  const activity = useSelector((state) => state.activities.value)
  console.log('act', activity)
  
  useEffect(() => {
    fetch(
      `http://192.168.10.137:4000/foods/${destination.lon}/${destination.lat}`
    )
      .then(resp => resp.json())
      .then(data => {
        if (data.result) {
      
          setAllRestaurants(data.foods)
          let tmp = data.foods.map(e => e.xid) 
          setXid(tmp)
      }
    })    
  }, [])


  useEffect(() => {
    xid.map(e => {
    fetch(`http://192.168.10.137:4000/infos/${e}`)
    .then(resp => resp.json())
    .then(data => 
      setAllDetails(data),
      )
  })}, [xid])
 
console.log('xid', xid)
console.log('rest', allDetails)

  //  console.log("rest", allrestaurants);

  // const everyRestaurants = [...allrestaurants];
  // console.log('every', everyRestaurants)

  const restaurants = allDetails.map((data, i) => {

    if(i <100){
    return (
        <CardsRestaurantsComponent
        key={i}
        name={data.name}
        kind={data.kinds}
        style={styles.cards}
        
        />)
    } else {
      return

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

      
        <ImageBackground source={require("../assets/bg.jpg")} style={styles.bg}>
         <View style={styles.allcards}>
         
        {/* <ScrollView contentContainerStyle> */}
       {restaurants}
        {/* </ScrollView> */}
         
         </View> 
        </ImageBackground>
       
        

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bg: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    flexDirection: "row",
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
    height: 100,
  },
  allcards: {

   height: '100%',
   margin: 0,
  },
  scrollView: {
    height: 20,
  
  }
 
});

