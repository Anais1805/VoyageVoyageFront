import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'


export default function StartScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.part1}>
                <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
                <Text style={styles.txt}>Préparer ses sorties pour en profiter au Maximum</Text>
            </View>
            <View style={styles.part2}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
                    <Text style={styles.title}>ORGANISER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'white',
    },
    part1: {
        flex: 0.80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    part2: {
        flex: 0.20,
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: '20%',
    },
    logo: {
        marginBottom: '-20%',
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    btn: {
      width: '80%',
      height: '30%',
      borderRadius: 5,
      backgroundColor: '#9E2A2B',
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
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    txt: {
        fontSize:20,
        fontWeight: 'bold',
        color: '#335C67',
        textAlign: 'center',
        fontStyle: 'italic'
    }

  }) 