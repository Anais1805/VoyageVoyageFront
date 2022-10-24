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
          <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
             <Image style= {styles.logo} source={require('../assets/logo.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.login} activeOpacity={0.8}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.part1}>
          <View style={styles.connexion}>
            <Text style={styles.title}>CONNEXION</Text>
          </View>
        <TextInput style={styles.input} placeholder='  ✉️️ Adresse Mail'>
          {/* <FontAwesome name='envelope' size={20}></FontAwesome> */}
        </TextInput>
        <TextInput style={styles.input} placeholder=' 🔒 Mot de Passe'></TextInput>
           <TouchableOpacity style={styles.textconnexion} onPress={() => handleSubmit()} activeOpacity={0.8}>
              <Text style={styles.title2}>SE CONNECTER</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.compte}>________________   OU   ________________</Text>
        <Text style={styles.compte}> Pas encore de compte ? </Text>

        <View style={styles.part2}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.input} activeOpacity={0.8}>
            <Text style={styles.text}>Inscritpion avec email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.input} activeOpacity={0.8}>
            <Text style={styles.text}>Connexion avec Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.input} activeOpacity={0.8}>
            <Text style={styles.text}>Connexion avec Facebook</Text>
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
      backgroundColor: 'white',
    },
    header: {
      flex: 0.13,
      width: '100%',
     
      
    }, 
    logo: {
      width: '15%',
      height: '50%',
      marginLeft: '6%',
      marginTop: '14%',
    },
    login: {
      width: '20%',
      height: '30%',
      marginLeft: '75%',
      marginTop: '-12%',
      borderRadius: 8,
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
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '10%',
    },
    part2: {
      flex: 0.36,  
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '-5%',
    },
    input: {
      width: '70%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#9E2A2B',
    },
    textconnexion: {
      width: '80%',
      height: '15%',
      borderRadius: 20,
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
    title2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    text: {
      fontSize: 16,
    },
    compte: {
      backgroundColor: "white",
      textAlign: 'center',
      marginBottom: '5%',
      marginTop: '2%',
    }
  }) 