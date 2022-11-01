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
  RefreshControl
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DaysScreen({ navigation }) {
  const [allCulturals, setAllCulturals] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  

  const destination = useSelector((state) => state.destinations.value);
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [details, setDetails] = useState([]);

  const dispatch = useDispatch();

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
    const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

  useEffect(() => {
    fetch(
      `http://192.168.1.18:4000/visits/${destination.lon}/${destination.lat}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result) {
          setAllCulturals(data.visits);
          let tmp = data.visits.map((e) => e.xid);
          // setXid(tmp);
          // console.log(data.foods)
          let cult = [];
          tmp.forEach((e) => {
            fetch(`http://192.168.1.18:4000/infos/${e}`)
              .then((resp) => resp.json())
              .then((data) => {
                cult.push(data);
                // setAllDetails([...allDetails,data])
              })
              .finally(() => setAllDetails([...allDetails, ...cult]));
          });
        }
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://192.168.1.18:4000/foods/${destination.lon}/${destination.lat}`
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
            fetch(`http://192.168.1.18:4000/infos/${e}`)
              .then((resp) => resp.json())
              .then((data) => {
                resto.push(data);
                // setAllDetails([...allDetails,data])
              })
              .finally(() => setDetails([...details, ...resto]));
          });
        }
      });
  }, []);

  const visit = allDetails.map((data, i) => {
    // const image = data.infos.wikipedia_extracts

    // console.log('DAT', image)
    if (i < 2) {
      return (
        <ImageBackground
          key={i}
          style={styles.cardImage}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Point_Z%C3%A9ro_des_Routes_de_France_%281%29.JPG/400px-Point_Z%C3%A9ro_des_Routes_de_France_%281%29.JPG",
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
    const image = "";

    console.log("DAT", image);
    if (j < 2) {
      return (
        <ImageBackground
          key={j}
          style={styles.cardImage}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Au_Vieux_Paris_d%27Arcole%2C_24_Rue_Chanoinesse%2C_75004_Paris%2C_1_May_2018.jpg/400px-Au_Vieux_Paris_d%27Arcole%2C_24_Rue_Chanoinesse%2C_75004_Paris%2C_1_May_2018.jpg",
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Days")}
              style={styles.login2}
              activeOpacity={0.8}
            >
              <Text style={styles.btnLogin2}>Days</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}></View>
        <View style={styles.titleRestoContainer}>
          <Text style={styles.titleResto}>
            Votre journée à {destination.city}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {visit}
          {restaurants}
        </ScrollView>
   
      </ImageBackground>
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
