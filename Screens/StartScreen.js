import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native'


export default function StartScreen({ navigation }) {

    return (
        
        <ImageBackground source={require('../assets/bg.jpg')} style={{flex: 1}}>
        

        <View style={styles.container}>
            
            <View style={styles.part1}>
                <Image style={styles.logo} source={require('../assets/logoWhite.png')}></Image>
                <Text style={styles.txt}>Préparer ses sorties</Text>
                <Text style={styles.txt}>pour en profiter au Maximum</Text>
            </View>
            <View style={styles.part2}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
                    <Text style={styles.title}>ORGANISER</Text>
                </TouchableOpacity>
            </View>
           
        </View>
        </ImageBackground>
    
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'black',
      opacity: 0.9
    },
    part1: {
        flex: 0.80,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    part2: {
        
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: '20%',
    },
    logo: {
        
        width: 200,
        height: '100%',
        resizeMode: 'contain'
    },
    btn: {
      width: 200,
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
        color: 'white',
    }

  }) 