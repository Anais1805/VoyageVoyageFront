import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from "react-native";
  import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AllNaturalssScreen ({navigation}) {
    return ( <View style={styles.container}>
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
    </View>
    )
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
})