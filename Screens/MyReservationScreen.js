import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import { LocaleConfig } from "react-native-calendars";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import mylikedays from "../reducers/mylikedays";
import { removeMyDays } from "../reducers/mylikedays";
import dates from "../reducers/dates";
import { addMyDates } from "../reducers/dates";


export default function MyReservationScreen({ navigation }) {
   const dispatch = useDispatch()
  const poub = useSelector((state) => state.mylikedays.value)
  const dates = useSelector((state) => state.dates.value)
  const[myDays, setMyDays]= useState([])
  console.log('DATES', dates)
 
  useEffect(() => {
   dispatch(addMyDates(myDays))
  }, [myDays]);

  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";
  const mydays = useSelector((state) => state.mylikedays.value)
  console.log('DAYSDAYS', mydays)
 
  const myBookings = mydays.map((data, i) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [daySelected, setDaySelected] = useState("");
  const [dayBooked, setDayBooked] = useState(false);
  
  
    return(
      <View key={i}>
      <ImageBackground
      
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
            {data}
          </Text>
       
        </View>
        <Pressable style={styles.btnToReserve}  onPress={() => setShowCalendar(!showCalendar)}
>
        {!dayBooked &&  <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>Je plannifie</Text>}
        {dayBooked &&  <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>{daySelected}</Text>}
       
        </Pressable>
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
     {showCalendar && (
      <Calendar
        minDate={"2022-10-01"}
        maxDate={"2026-10-01"}
        onDayPress={(day) => {
          console.log("selected day", day);
          setDaySelected(day.dateString);
          setDayBooked(true);
          setShowCalendar(!showCalendar)
          setMyDays(daySelected)
        }}
        markedDates={{
          [daySelected]: {
            selected: true,
            selectedColor: "#335C67",
          },
        }}
        markingType={"dot"}
        theme={{
          arrowColor: "#9E2A2B",
          selectedDayBackgroundColor: "#F4F1F1",
          monthTextColor: "#9E2A2B",
          // textMonthFontWeight: 'bold'
        }}
        
      />
    )}
    </View>
    )
  })

  return (

      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        
          <View style={styles.header}>
            <View>
              <Image
                source={require("../assets/logo.png")}
                style={{ width: 40, height: 40 }}
                onPress={() => navigation.navigate("Home")}
              />
            </View>
            <View style={styles.btnHeader}>
            <FontAwesome
            style={{marginRight: 10}}
            name="suitcase"
            size={40}
            color={'#9E2A2B'}
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
  
          <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}></View>
          <View style={styles.titleRestoContainer}>
            <Text style={styles.titleResto}>
              Vos journées réservées
              
            </Text>
           
         
         
           
           <FontAwesome
            style={styles.iconP}
            name="bitbucket"
            size={30}
            onPress={() => dispatch(removeMyDays())}
          />
           </View>
             <ScrollView showsVerticalScrollIndicator={false}
          >    
 {myBookings}
 <Pressable style={styles.btnToReserve}  onPress={() => {navigation.navigate('Overview'); }}
>
       <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>Valider</Text>
        
        </Pressable>
          </ScrollView>
     
   
      </SafeAreaView>
  
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
  btnToReserve: {
    backgroundColor: '#9E2A2B',
    width: 80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '70%',
    marginBottom: 40, 

    borderRadius: 5   
  },
  
});




