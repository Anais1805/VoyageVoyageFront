import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalSearch from "../components/ModalSearch";
import places from "./places";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import destinations from "../reducers/destinations";
import { destinationSearch } from '../reducers/destinations';
import * as Location from 'expo-location';

const {width} = Dimensions.get('screen');

export default function HomeScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            console.log(location);
            // setCurrentPosition(location.coords);
          });
      }
    })();
    //  insert code here
}, []);
  
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
        
        <View style={styles.btnToReserve}>
          <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>Réserver</Text>
        </View>
       
        </View>
        
      </ImageBackground>
      </TouchableOpacity>
    );
  };

  

const [city, setCity]=useState('')
const [country, setCountry]=useState('')
const dispatch = useDispatch()

const destination = useSelector((state) => state.destinations.value)
 
console.log(destination)
const searchPress = () => {
fetch(`http://192.168.10.137:4000/favorite/${city}/${country}`)
            .then((resp) => resp.json())
            .then((data) => {
              if(data.result) {
                dispatch(destinationSearch({
                  city: data.city.name,
                  country: data.city.country,
                  lat: data.city.lat,
                  lon: data.city.lon

                }
                ))

              }
            })
   
   }
   
    return (

      <SafeAreaView style={{ flex: 1}}>
        <StatusBar />
        <ImageBackground source={require("../assets/bg.jpg")} style={{ flex: 1 }}>
  
  
  

        <View style={styles.header}>
          <View>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View style={styles.btnHeader}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.login1}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin1}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Connection")}
              style={styles.login2}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin2}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 120, paddingHorizontal: 20, paddingVertical: 20}}>


          <View style={styles.inputContainer}>
           <ModalSearch />
           
            <Text style={styles.headerTitle}>Organisez vos sorties</Text>  
           
            </View>
          </View>

            <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.suggestTxt}>Les restaurants</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllRestaurants')}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color:'#9E2A2B'}}>Voir plus ...</Text>
            </TouchableOpacity>
            </View>
              <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places}
              renderItem={({item}) => <Card place={item} /> } />
            </View>

            
            <View style={{marginTop: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View>
            <Text style={styles.suggestTxt}>Les activitées sportives</Text>
            <Text style={styles.suggestTxt}>et randonnées</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AllNaturals')}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color:'#9E2A2B'}}>Voir plus ...</Text>
            </TouchableOpacity>
            </View>
              <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places}
              renderItem={({item}) => <Card place={item} /> } />
            </View>

            <View style={{marginTop: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View>
            <Text style={styles.suggestTxt}>Les visites culturelles</Text>
            
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('AllNaturals')}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color:'#9E2A2B'}}>Voir plus ...</Text>

            <TouchableOpacity onPress={() => navigation.navigate('AllCulturals')}>
            <Text style={{fontSize: 12}}>Voir plus ...</Text>

            </TouchableOpacity>
            </View>
              <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places}
              renderItem={({item}) => <Card place={item} /> } />
            </View>
            
        </ScrollView>
        </ImageBackground>
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
    fontWeight: 'bold',
  },
  inputContainer: {
    borderRadius: 10,
    marginTop: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  suggestTxt: {
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 20,
    fontSize: 15,
  },
  cardImage: {
    height: 300,
    width: width / 1.5,
    marginRight: 20,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 10,
  },
  btnToReserve: {
    backgroundColor: '#9E2A2B',
    width: 80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5, 
    borderRadius: 5   
  },
});






   

