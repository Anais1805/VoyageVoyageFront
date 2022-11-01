import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardsRestaurantsComponent from "./CardsRestaurantsComponent";
import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import activities from "../reducers/activities";
import { useSelector, useDispatch } from "react-redux";
import { activitiesInfos } from "../reducers/activities";
import places from "./places";


export default function AllRestaurantsScreen({ navigation }) {
  const [city, setCity]=useState('')
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [xid, setXid] = useState([]);
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destinations.value);



  const activity = useSelector((state) => state.activities.value);


  useEffect(() => {
    fetch(
      `http://192.168.1.18:4000/foods/${destination.lon}/${destination.lat}`
    )
      .then(resp => resp.json())
      .then(data => {
        if (data.result) {
          setAllRestaurants(data.foods);
          let tmp = data.foods.map((e) => e.xid);
          setXid(tmp);
          // console.log(data.foods)
          let resto = []
          tmp.forEach((e) => {
            fetch(`http://192.168.1.18:4000/infos/${e}`)
              .then(resp => resp.json())
              .then(data => {
                resto.push(data)
               setAllDetails([...allDetails,data])
        
              }).finally(()=> setAllDetails([...allDetails,...resto]))
            
            })
            
            
        }
      });
  }, []);
 



console.log('DETAILS', allDetails)

    const restaurants = allDetails.map((data, i) => {
      // console.log('DAT', data.image);

      return (
        <ImageBackground key={i} style={styles.cardImage} source={require('../assets/Unknown.png')}>
        <View style={{backgroundColor: '#335C67', opacity: 0.9, width: "100%", height: "40%", top: "60%"}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'white', paddingHorizontal: 10, paddingVertical: 5}}>{data.infos.name}</Text>
            <Text style={{color: 'white', paddingHorizontal: 10}}>{data.infos.city || destination.city}</Text>
          </View>
        
        
        </View>
        </ImageBackground>)
})

    console.log(destination.city)
   
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
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
              size={30}
              onPress={() => navigation.navigate("Profile")}
            />
          </View>
        </View>

        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>Les restaurants à {destination.city}</Text>
        </View>
        {/* <ImageBackground source={require("../assets/bg.jpg")} style={styles.bg}>
         <View style={styles.allcards}>
         
        <ScrollView contentContainerStyle>
       {restaurants}
        </ScrollView>
         
         </View> 
        </ImageBackground> */}
   
          {/* <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            vertical
            showsHorizontalScrollIndicator={false}
            data={allDetails}
            renderItem={({ item }) => <Card allDetails={item}/>}
            
            
          /> */}
        
        <ScrollView style={styles.scrollViewer}>
        
            {restaurants}
          </ScrollView>
          
      </SafeAreaView>
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
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
    //  flex:0.80,

    height: "100%",
    margin: 0,
  },
  scrollView: {
    height: 20,
  },
  titleRestoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  titleResto: {
    fontSize: 26,
    fontWeight: "bold",
  },
  scrollViewer: {
    height: '100%',
   

    marginLeft: 20,
  }
});
