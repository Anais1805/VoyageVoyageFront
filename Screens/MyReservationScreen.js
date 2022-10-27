import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { LocaleConfig } from "react-native-calendars";

export default function MyReservationScreen({ navigation }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [daySelected, setDaySelected] = useState("");
  const [dayBooked, setDayBooked] = useState(false);

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
            color={'#335C67'}
            onPress={() => navigation.navigate("Profile")}
          />
          <FontAwesome
            style={styles.icon}
            name="user-circle-o"
            size={40}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mes réservations</Text>
      </View>
      <View style={styles.bookingsContainer}>
        <View style={styles.bookingCards}>
          <Text style={styles.titleCard}>Journée "" </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.persoButton}>
              <Text style={styles.buttonText}>Je personnalise</Text>
            </Pressable>
            <Pressable
              style={styles.planButton}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              {!dayBooked && <Text style={styles.buttonText}>Je planifie</Text>}
              {dayBooked && (
                <Text style={styles.buttonText}>{daySelected}</Text>
              )}
            </Pressable>
          </View>
        </View>
        {showCalendar && (
          <Calendar
            minDate={"2022-10-01"}
            maxDate={"2026-10-01"}
            onDayPress={(day) => {
              console.log("selected day", day);
              setDaySelected(day.dateString);
              setDayBooked(true);
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
        <View style={styles.submitContainer}>
          <Pressable
            style={styles.submitButton}
            onPress={() => navigation.navigate("Overview")}
          >
            <Text style={styles.buttonText}>Valider</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    borderBottomColor: "#9E2A2B",
    borderBottomWidth: 1,
    marginBottom: 15,
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

  titleContainer: {
    alignItems: "center",
    marginTop: "5%",
  },
  title: {
    color: "#9E2A2B",
    fontWeight: "bold",
    width: "80%",
    padding: 5,
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9E2A2B",
    padding: 7,
    paddingHorizontal: 45,
    marginBottom: 10,
  },
  bookingsContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  bookingCards: {
    borderWidth: 1,
    borderColor: "#9E2A2B",
    width: "80%",
    padding: 10,
    borderRadius: 10,
  },
  titleCard: {
    fontWeight: "bold",
    padding: 5,
    width: 300,
    textAlign: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  persoButton: {
    backgroundColor: "#9E2A2B",
    padding: 7,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  planButton: {
    backgroundColor: "#335C67",
    padding: 7,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#9E2A2B",
    padding: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
  },
});
