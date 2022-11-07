import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import places from "./places";

const {width} = Dimensions.get('screen');

export default function ReservedScreen({ navigation }) {

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

  return (

   

    <SafeAreaView style={{flex:1}}>

        <View style={styles.header}>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Image style={styles.logo} source={require("../assets/logo.png")} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuHeader}>
            <FontAwesome
              style={styles.icon}
              name="suitcase"
              size={30}
              color={"#335C67"}
              onPress={() => navigation.navigate("Profile")}
            />
            <FontAwesome
              style={styles.iconUser}
              name="user-circle-o"
              size={30}
              onPress={() => navigation.navigate("Profile")}
            />
          </View>

        </View>

        <View style={styles.journee}>
          <Text style={styles.title}>MA JOURNEE</Text>
        </View>

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
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9E2A2B",
  },
  journee: {
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#9E2A2B",
    shadowColor: "#9E2A2B",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
    margin: "8%",
    width: "85%",
  },
  cardImage: {
    height: 200,
    width: 350,
    marginRight: 20,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  // part: {
  //   flex: 0.82,
  // },
  // image: {
    
  //   height: "100%",
  //   borderRadius: 5,
  //   padding: "1%",
  // },
  // cardcontainer: {
    
  //   flexDirection: "row",
  //   borderColor: "#9E2A2B",
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   margin: "3%",
  // },
  // left: {
  //   flex: 0.4,
  //   margin: "2%",
  // },
  // right: {
  //   flex: 0.6,
  //   alignItems: "flex-start",
  //   justifyContent: "space-around",
  //   margin: "2%",
  // },
  // delete: {
  //   marginLeft: "85%",
  // },
  // remplace: {
  //   backgroundColor: "#335C67",
  //   width: "40%",
  //   height: "20%",
  //   marginLeft: "55%",
  //   borderRadius: 5,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   shadowColor: "#335C67",
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,
  //   elevation: 6,
  // },
  // descritpion: {
  //   fontSize: 12,
  // },
  // title2: {
  //   fontWeight: "bold",
  // },
});
