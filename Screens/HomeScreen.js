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
import places1 from "./places1";
import places2 from "./places2";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import destinations from "../reducers/destinations";
import { destinationSearch } from '../reducers/destinations';
import * as Location from 'expo-location';
import users from "../reducers/users";
import { logout} from "../reducers/users"
import { importPosition } from "../reducers/currentPosition";
import HeaderConnected from "../components/HeaderConnected"
import Header from "../components/Header";
const BACKEND_ADRESS = 'http://192.168.1.43:4000'

const {width} = Dimensions.get('screen');

export default function HomeScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);
  const [city, setCity]=useState('')
  const [country, setCountry]=useState('')
  const dispatch = useDispatch()
  const [allDetailsResto, setAllDetailsResto]=useState(null)
  const destination = useSelector((state) => state.destinations.value)
  const [buttonDay, setButtonDay] = useState(true)
  const user = useSelector((state) => state.user.value)


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            console.log('LOC', location);
           setCurrentPosition(location.coords);
           dispatch(importPosition(location.coords))
          });
      }
    })();
  
}, []);

  console.log('CURRENT', currentPosition?.latitude)


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

  






   
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#335C67'}}>
        <StatusBar />
        <View style={{flex: 1, backgroundColor: '#FFFBF7'}}>
  
  
  

        <View style={styles.header}>
          <View>
            <Image
              source={require("../assets/logoWhite.png")}

              style={{ width: 40, height: 40 }}

            />
          </View>
         {!user.isConnected &&  <Header/>}
          {user.isConnected &&  <HeaderConnected/>}
        </View> 
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 120, paddingHorizontal: 20, paddingVertical: 20}}>


          <View style={styles.inputContainer}>
           <ModalSearch />
           
            <Text style={styles.headerTitle}>Organisez vos vacances</Text>  
           
            </View>
           { buttonDay && <TouchableOpacity
              onPress={() => navigation.navigate("Days")}
              style={styles.days}
              activeOpacity={0.8}
            >
              <Text style={styles.btnDays}>Découvrez vos journées   😃</Text>
            </TouchableOpacity>}
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
              data={places1}
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


        <TouchableOpacity onPress={() => navigation.navigate('AllCulturals')}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color:'#9E2A2B'}}>Voir plus ...</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AllCulturals')}>
       


            </TouchableOpacity>
            </View>
              <FlatList
              contentContainerStyle={{paddingLeft: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places2}
              renderItem={({item}) => <Card place={item} /> } />
            </View>
            
        </ScrollView>
    </View>
      </SafeAreaView>


          
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#335C67'
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
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5, 
    borderRadius: 5 
  },
  btnDays:{
    backgroundColor: '#9E2A2B',
    width: 200,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5, 
    borderRadius: 5,  
    fontWeight: 'bold',
    color: 'white'
    
  }, 
  days: {
    width: 250,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#9E2A2B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#9E2A2B",
    marginLeft: 10,
    marginLeft: '20%'
  },
  icon: {
    marginLeft: 14
  }
});






   

