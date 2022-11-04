import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Button,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import destinations from "../reducers/destinations";
import users from "../reducers/users";


import favorite from "../reducers/favorites";
import { addActivities, cleanActivities } from "../reducers/favorites";
import mylikedays, { removeMyDays } from "../reducers/mylikedays";
import { addMyDay } from "../reducers/mylikedays";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function DaysScreen({ navigation }) {
  const [allCulturals, setAllCulturals] = useState([]);
  const [allDetails, setAllDetails] = useState([]);

  const [heart, setHeart] = useState(false);

  const destination = useSelector((state) => state.destinations.value);
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [details, setDetails] = useState([]);
  const [myvisits, setMyVisits]=useState([])

const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  const mydays = useSelector((state) => state.mylikedays.value);
  const favorites = useSelector((state) => state.favorite.value);
  
  useEffect(() => {
    fetch('https://voyage-voyage-back.vercel.app/destinations', {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: destination.city,
        lat: destination.lat,
        lon: destination.lon
      }),
    })
      
   }, [heart]);


  function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]];// swap
    }
  }

  const shuffle = () => {
    fisherYatesShuffle(allDetails);
    fisherYatesShuffle(details);
    shuffleState ? setShuffleState(false) : setShuffleState(true) ;
  }

  let iconColor = {};

  if (heart) {
    iconColor = { color: "#9E2A2B" };
  } else {
    iconColor = { color: "#335C67" };
  }

  const heartPress = () => {
    setHeart(!heart);
    // if(!heart && favorites){dispatch(cleanActivities())}
  };
 

  // const wait = (timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // };
  // const [refreshing, setRefreshing] = useState(false);
  const [shuffleState, setShuffleState] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   shuffleState ? setShuffleState(false) : setShuffleState(true) ;
  //    setRefreshing(()=>true);
  //   wait(2000).then(() => setRefreshing(()=>false));
    
  // }, []);
//essai forcer render suite au shuffle = marche une seule fois
    // useEffect(() => {
    
  //   fisherYatesShuffle(allDetails)
  //   fisherYatesShuffle(details)

  // }, [shuffleState]);


    
  useEffect(() => {
    fetch(


      `https://voyage-voyage-back.vercel.app/visits/${destination.lon}/${destination.lat}`


    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllCulturals(data.visits);
          let tmp = data.visits.map((e) => e.xid);

          let cult = [];
          tmp.forEach((e) => {


            fetch(`https://voyage-voyage-back.vercel.app/infos/${e}`)

              .then((resp) => resp.json())
              .then((data) => {
                cult.push(data);

                // setAllDetails([...allDetails,data])
              })
              .finally(() => setAllDetails([...allDetails, ...cult]));
      
              // fisherYatesShuffle(allDetails)

          });
        }
      });
  }, []);




  const store = useSelector((state) => state.mylikedays.value);
 
  
  // console.log("ACTIVITES", myactivities);

  useEffect(() => {
    fetch(

      `https://voyage-voyage-back.vercel.app/foods/${destination.lon}/${destination.lat}`

    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllRestaurants(data.foods);
          let tmp = data.foods.map((e) => e.xid);
          // setXid(tmp);
          // console.log(data.foods)
          let resto = [];
          tmp.forEach((e) => {

            fetch(`https://voyage-voyage-back.vercel.app/infos/${e}`)


              .then((resp) => resp.json())
              .then((data) => {
                resto.push(data);
                // setAllDetails([...allDetails,data])
              })
              .finally(() => setDetails([...details, ...resto]));
              //  fisherYatesShuffle(details)
          });
        }
      });
  }, []);
 


  // console.log('VISIT', allDetails)
  

  const visit = allDetails.map((data, i) => {
     const image = data.infos.preview?.source
    // console.log('DAT', image)
    if (i < 2) {

    // if(heart && data){
    
    //   dispatch(addActivities({activities:data.infos.name}))
      
    // }
     

      return (
       
       
        <ImageBackground
          key={i}
          style={styles.cardImage}
          source={{
            uri: image ?? 'https://mutuelle-mie.fr/assets/mieuploads/2021/11/Musee-Histoire-de-la-medecine.jpg',
          }}
        >
          <View
            style={{
              backgroundColor: "#335C67",
              opacity: 0.9,
              width: "100%",
              height: "40%",
              top: "60%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                {data.infos.name}
                
              </Text>
              <Text style={{ color: "white", paddingHorizontal: 10 }}>
                {destination.city}
              </Text>
            </View>

            {/* <Text style={{color: 'white', paddingHorizontal: 10, fontSize: 12}}>{data.infos.adress}</Text>  */}
            <Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 12,
              }}
            >
              Activités
            </Text>
          </View>
        </ImageBackground>
        // </TouchableOpacity>
      );
      
    } else {
      return;
    }
    // <CardsRestaurantsComponent key={i} name={data.infos.name} city={data.infos.address.city} source={{uri:data.infos.image}}/>)
  });



  const restaurants = details.map((data, j) => {
    const image = data.infos.preview?.source

    // console.log("DAT", image);
    if (j < 2) {
      // if(heart ){
      //   // state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
      // dispatch(addActivities({foods:(data.infos.name).filter(e => e !== action.payload)}))}
      // console.log(data.infos.name)

      return (
        <ImageBackground
          key={j}
          style={styles.cardImage}
          source={{
            uri: image ?? 'https://restaurant-lasiesta.fr/wp-content/uploads/2022/03/la-siesta-restaurant-canet-en-roussillon-2-570x855.jpg'
            
          }}
        >
          <View
            style={{
              backgroundColor: "#335C67",
              opacity: 0.9,
              width: "100%",
              height: "40%",
              top: "60%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                {data.infos.name}
              </Text>
              <Text style={{ color: "white", paddingHorizontal: 10 }}>
                {data.infos.address?.city}
              </Text>
            </View>

            {/* <Text style={{color: 'white', paddingHorizontal: 10, fontSize: 12}}>{data.infos.adress}</Text>  */}
            <Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 12,
              }}
            >
              Restauration
            </Text>
          </View>
        </ImageBackground>
        // </TouchableOpacity>
      );
    } else {
      return;
    }

    // <CardsRestaurantsComponent key={i} name={data.infos.name} city={data.infos.address.city} source={{uri:data.infos.image}}/>)
  });
   

  //compteur
  const [count, setCount] = useState(1);

  const handleUpPage = () => {
    setCount(count + 1);
  };
  const handleDownPage = () => {
    if (count < 2) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  //map en attendant les fetch...
  //const [places, setPlaces] = useState([]);

   
    console.log("ADD REDUCER FAVORITE", favorites);
  return (
    
      <SafeAreaView style={{ flex: 1, backgroundColor: '#335C67' }}>
        <StatusBar />
       <View style={{flex: 1, backgroundColor: '#FFFBF7'}}>

       <View style={styles.header}>
          <View>
            <Image
              source={require("../assets/logoWhite.png")}

              style={{ width: 40, height: 40 }}

            />
          </View>
         {!user.isConnected && <View style={styles.btnHeader}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.login1}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin1}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity

              onPress={() => navigation.navigate('Connection')}

              style={styles.login2}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin2}>Se connecter</Text>
            </TouchableOpacity>
     
          </View> }
          {user.isConnected &&  <View style={styles.btnHeader}>
        
            <FontAwesome
            style={styles.icon}
            name="suitcase"
            size={30}
            color={'white'}
            onPress={() => navigation.navigate("MyReservation")}
          />
         

                <FontAwesome
            style={styles.icon}
            name="user-circle-o"
            size={30}
            color={'white'}
            onPress={() => navigation.navigate("Profile")}
          />
            <FontAwesome
            style={styles.icon}
            name="times-circle"
            size={30}
            onPress={() => handleLogout()}
          />
                    
            
            </View>}
  </View>
  <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}></View>
  <View style={styles.titleRestoContainer}>
    <Text style={styles.titleResto}>
      Votre journée à {destination.city}
    </Text>
    <View style={{flexDirection: 'row'}}>
    <FontAwesome
      style={iconColor}
      name="heart"
      size={40}
      // color={'#335C67'}
      onPress={() => {
      // dispatch(addActivities({activities: }))
        dispatch(addMyDay(destination.city));
        // dispatch(removeMyDays());
        heartPress();
        {user.isConnected &&  navigation.navigate('MyReservation')}
        {!user.isConnected &&  navigation.navigate('Profile')}
      }}
    />
      <FontAwesome
      style={styles.icon}
      name="refresh"
      size={40}
      color={'#9E2A2B'}
      // color={'#335C67'}
      onPress={() => shuffle()}
    />
    </View>
  </View>
  <ScrollView
  //   showsVerticalScrollIndicator={false}
  //   refreshControl={
  //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  //   }
  >
    {visit}
    {restaurants}
  </ScrollView>
  
 
   </View>
   
  </SafeAreaView>

    // <View style={styles.container}>

    //     <View style={styles.header}>
    //         <TouchableOpacity onPress={() =>navigation.navigate('Home')} activeOpacity={0.8}>
    //             <Image style= {styles.logo} source={require('../assets/logo.png')} />
    //         </TouchableOpacity>
    //         <View style={styles.menuHeader}>

    //             <TouchableOpacity onPress={() => navigation.navigate('Connection')} style={styles.login1} activeOpacity={0.8}>
    //                 <Text style={styles.btnLogin1}>S'inscrire</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.login2} activeOpacity={0.8}>
    //                 <Text style={styles.btnLogin2}>Se connecter</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>

    //     <View style={styles.content}>
    //         <ImageBackground source={require('../assets/bg.jpg')} style={styles.bg}>
    //             <View style={styles.pagePlace}>
    //                 <View style={styles.titleDay}>
    //                     <Text style={styles.text}>Vos journées à (selon ville à rajouter)</Text>
    //                 </View>

    //                 <View style={styles.suggest}>
    //                     <Text>Suggestions (à faire avec un map ou des components) {places.tittle}</Text>
    //                 </View>

    //                 <View style={styles.pageNumber}>
    //                     <TouchableOpacity onPress={() => handleDownPage()} style={styles.pageChangement}>
    //                         <Text style={styles.text}>G </Text>
    //                     </TouchableOpacity>
    //                     <Text style={styles.text}>Journée {count}/ nb page</Text>
    //                     <TouchableOpacity onPress={() => handleUpPage()} style={styles.pageChangement}>
    //                         <Text style={styles.text}>D </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </ImageBackground>

    //     </View>
    // </View>
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
    fontWeight: "bold",
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
    paddingBottom: 5,
  },
  scrollViewer: {
    height: "100%",

    marginLeft: 20,
  },
  cardImage: {
    height: 130,
    width: 350,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 5
  }
  
  // container: {
  //     flex: 1,
  //     width:'100%',
  //     height: '100%',
  // },
  // header: {
  //     width: '100%',
  //     height: '12%',
  //     flexDirection: 'row',
  // },
  // menuHeader: {
  //     flexDirection: "row",
  //     width: "100%",
  //     height: 100,
  //     marginTop: "15%",
  //     marginLeft: "25%",
  // },
  // logo: {
  //     width: "40%",
  //     height: "50%",
  //     marginLeft: "30%",
  //     marginTop: "40%",
  // },
  // login1: {
  //     width: '18%',
  //     height: '30%',
  //     marginRight: '2%',
  //     borderRadius: 8,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderWidth: 1,
  //     borderColor: '#9E2A2B',
  //     shadowColor: "#9E2A2B",
  //     shadowOffset: {
  //         width: 0,
  //         height: 3,
  //         },
  //     shadowOpacity: 0.27,
  //     shadowRadius: 4.65,
  //     elevation: 6,
  // },
  // login2: {
  //     width: '20%',
  //     height: '30%',
  //     borderRadius: 8,
  //     backgroundColor: '#9E2A2B',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderWidth: 1,
  //     borderColor: '#9E2A2B',
  //     shadowColor: "#9E2A2B",
  //     shadowOffset: {
  //         width: 0,
  //         height: 3,
  //         },
  //     shadowOpacity: 0.27,
  //     shadowRadius: 4.65,
  //     elevation: 6,
  // },
  // btnLogin1: {
  //     color: '#9E2A2B',
  //     fontWeight: 'bold',
  //     fontSize: 10,
  // },
  // btnLogin2: {
  //     color: '#FFF',
  //     fontWeight: 'bold',
  //     fontSize: 10,
  // },
  // content: {
  //     flex: 1,
  // },
  // bg: {
  //     width: '100%',
  //     height: '100%',
  //     alignItems: 'center',
  //     justifyContent: 'space-between'
  // },
  // text: {
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //     color: 'black',
  // },
  // titleDay:{
  //     width: '90%',
  //     height: '10%',
  //     borderRadius: 5,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginTop: 50,
  // },
  // pageNumber:{
  //     flexDirection: "row",
  //     width: '90%',
  //     height: '7%',
  //     borderRadius: 5,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginBottom: 50,
  // },
  // pagePlace:{
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  // },
  // button:{
  //     color: 'red'
  // },
  // pageChangement: {
  //     width: '20%',
  //     height: '40%',
  //     marginRight: '5%',
  //     marginLeft: '5%',
  //     borderRadius: 8,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderWidth: 1,
  //     borderColor: '#9E2A2B',
  // }
});
