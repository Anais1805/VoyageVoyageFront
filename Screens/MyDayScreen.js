import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ReservedScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => navigation.navigate("Home")}>
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

            <View style={styles.journee}>
                     <Text style={styles.title}>MA JOURNEE</Text>
            </View>

            <View style={styles.part}>
                <View style={styles.cardcontainer}>
                    <View style={styles.left} >
                        <Image style={styles.image} source={require('../assets/rando.jpg')}></Image>
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity onPress={() => handleSubmit()}  style={styles.delete} activeOpacity={0.8}>
                            <FontAwesome name='times-circle' size={25} color='#335C67'></FontAwesome>
                        </TouchableOpacity>
                        <Text style={styles.title2}>Title</Text>
                        <Text style={styles.descritpion}>Descritpion Adultes: 25€,  jusqu’à 14ans et après     65 ans : 13€, avant 5ans: gratuit</Text>
                        <TouchableOpacity onPress={() => handleSubmit()}  style={styles.remplace} activeOpacity={0.8}>
                            <Text style={styles.textButton}>Remplacer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      height: '100%',
      backgroundColor: 'white',
    },
    header: {
        width: "100%",
        height: "12%",
        flexDirection: "row",
        borderBottomColor: "#9E2A2B",
        borderBottomWidth: 2,
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
    textButton: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9E2A2B',
    },
    journee:{
        flex: 0.05,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#9E2A2B',
        shadowColor: "#9E2A2B",
        shadowOffset: {
              width: 0,
              height: 3,
              },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '8%',
        width: '85%',
    },
    part: {
        flex: 0.82, 
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        padding: '1%',
    },
    cardcontainer: {
        flex: 0.2, 
        flexDirection: 'row',
        borderColor: '#9E2A2B',
        borderWidth: 1,
        borderRadius: 5,
        margin: '3%',
    
    },
    left: {
        flex: 0.4, 
        margin: '2%',
       
    },
    right: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        margin: '2%',
        
    },
    delete: {
        marginLeft: '85%',
    },
    remplace: {
        backgroundColor: '#335C67',
        width: '40%',
        height: '20%', 
        marginLeft: '55%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#335C67",
        shadowOffset: {
              width: 0,
              height: 3,
              },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    descritpion: {
        fontSize: 12, 
    }, 
    title2: {
        fontWeight: 'bold',
    }
})
