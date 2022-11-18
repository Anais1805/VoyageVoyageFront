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


  const BACKEND_ADRESS = 'https://voyage-voyage-back.vercel.app'
  // const BACKEND_ADRESS = 'http://192.168.1.43:4000'

export default function BookingCards(props) {
    const [myDates, setMyDates] = useState('')
    const [showCalendar, setShowCalendar] = useState(false);
    const [daySelected, setDaySelected] = useState('');
    const [dayBooked, setDayBooked] = useState(false);
    const [press, setPress]= useState(false)
    const user = useSelector((state) => state.user.value);
    
    
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
      // console.log('DAYSDAYS', mydays)
    
      const submitPress = () => {
        fetch(`${BACKEND_ADRESS}/destinations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: user.token,
            city: props.name,
            lat: props.lat,
            lon: props.lon,
            date: daySelected,
          }),
        });
        setPress(!press)
      }
     

        return(
          <View >
          <ImageBackground
          
          style={styles.cardImage}
          source={{
            uri: "https://federation-mdl.fr/wp-content/uploads/2021/08/calendrier.jpeg",
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
                  fontWeight: 'bold',
                  fontSize: 16
                
                }}
              >
                {props.name}
              </Text>
           
            </View>
            <Pressable style={styles.btnToReserve}  onPress={() => setShowCalendar(!showCalendar)}
    >
            {!dayBooked &&  <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>Je planifie</Text>}
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
             
              // dispatch(removeMyDates())
              
             
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
         <Pressable style={styles.btnToReserve}  onPress={() => submitPress()}>
      { !press && <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>Valider</Text>}
      {press && <Text style={{color: 'white', fontSize: 12, fontWeight:'bold'}}>✔️</Text>}
        
        </Pressable>
        </View>
        )
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
          height: 200,
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
          marginTop: 10,
      
          borderRadius: 5   
        },
        
      });
      