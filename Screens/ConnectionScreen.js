import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ConnectionScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text>Connection Screen</Text> */}
          {/* <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')} 
          /> */}
          <Image style= {styles.logo} source={require('../assets/logo.png')}></Image>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.login} activeOpacity={0.8}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.part1}>
        <Text style={styles.connexion}>CONNEXION</Text>
        <TextInput style={styles.input} placeholder='Adresse Mail'>
          {/* <FontAwesome name='envelope' size={20}></FontAwesome> */}
        </TextInput>
        <TextInput style={styles.input} placeholder='Mot de Passe'></TextInput>
           <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.8}>
            <Text style={styles.textConnexion}>Connexion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.part2}>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.login} activeOpacity={0.8}>
            <Text style={styles.textConnexion}>Connexion avec email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.login} activeOpacity={0.8}>
            <Text style={styles.textConnexion}>Connexion avec Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.login} activeOpacity={0.8}>
            <Text style={styles.textConnexion}>Connexion avec Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
   }

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      height: '100%',
    },
    header: {
      flex: 0.13,
      width: '100%',
      backgroundColor: 'white',
      
    }, 
    logo: {
      width: '15%',
      height: '50%',
      marginLeft: '6%',
      marginTop: '12%',
    },
    login: {
      width: '20%',
      height: '30%',
      marginLeft: '75%',
      marginTop: '-12%',
      borderRadius: 8,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
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
    },
    textButton: {
      color: '#9E2A2B',
      fontWeight: 'bold',
      fontSize: 16,
    },
    part1: {
      flex: 0.40,
      width: '100%',
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    part2: {
      flex: 0.36,  
      width: '100%',
      backgroundColor: 'yellow',
    },
    input: {
      width: '70%',
      height: '15%',
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
    },
    connexion:{
      width: '80%',
      height: '15%',
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
    }
  }) 