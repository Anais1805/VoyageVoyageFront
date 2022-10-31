import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions, 
  FlatList, 
  ImageBackground
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CardsRestaurantsComponent from "./CardsRestaurantsComponent";
import { useState, useEffect } from "react";
import destinations from "../reducers/destinations";
import activities from "../reducers/activities";
import { useSelector, useDispatch } from "react-redux";
import { activitiesInfos } from "../reducers/activities";
import places from "./places";

const {width} = Dimensions.get('screen');


export default function AllRestaurantsScreen({ navigation }) {

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

      `http://192.168.10.133:4000/foods/${destination.lon}/${destination.lat}`

    )
      .then(resp => resp.json())
      .then(data => {
        if (data.result) {

          setAllRestaurants(data.foods);
          // console.log(data.foods)
        }
      });
  }, []);
  // console.log("rest", allrestaurants);
  // const everyRestaurants = [...allrestaurants];
  // console.log('every', everyRestaurants)

  const restaurants = allrestaurants.map((data, i) => {
    if(i<100){

      
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


  // // const everyRestaurants = [...allrestaurants];
  // // console.log('every', everyRestaurants)


  
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


  //   }
  // });

  return (
    <SafeAreaView style={{flex: 1}}>
    


    <SafeAreaView style={styles.container}>
     

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => navigation.navigate("Home")}>
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
        <Text style={styles.titleResto}>Les restaurants à </Text>
      </View>
        {/* <ImageBackground source={require("../assets/bg.jpg")} style={styles.bg}>
         <View style={styles.allcards}>
         
        <ScrollView contentContainerStyle>
       {restaurants}
        </ScrollView>
         
         </View> 
        </ImageBackground> */}
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

   height: '100%',
   margin: 0,
  },
  scrollView: {

    height: 20,
  },
  titleRestoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleResto: {
    fontSize: 26,
    fontWeight: 'bold',
  }

});

