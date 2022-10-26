import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MyReservationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity  style={styles.logoContainer} onPress={() => navigation.navigate('Home')}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        </TouchableOpacity>
        <View style={styles.menuHeader}>
         <FontAwesome style={styles.userIcon} name='user-circle-o'size={40}/>
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
    marginLeft: '-10%',
    marginBottom: '-5%'
  },
  logo: {
    width: "35%",
    height: "50%",
    marginLeft: "35%",
    marginTop: "22%",
    
  },
  avatar:{
    width: "20%",
    height: "20%"
  },
  userIcon:{
    marginLeft: "10%",
    marginBottom: '15%',
    padding: 0,
    marginTop: 0,
   

  }
});
