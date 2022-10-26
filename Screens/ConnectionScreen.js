import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore } from '../reducers/users';

const BACKEND_ADRESS='http://192.168.10.152:4000'

export default function ConnectionScreen({ navigation }) {

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user)

  const [emailError, setEmailError] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

  const handleSubmit = () => {
    fetch(`${BACKEND_ADRESS}/users/signin`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: signInPassword, email: signInEmail })
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data.result)
    if (data.result && EMAIL_REGEX.test(signInEmail)) {
      dispatch(addUserToStore({email: setSignInEmail, token: data.token}));
      navigation.navigate('MyReservation');
      setSignInEmail('');
			setSignInPassword('');
    } else {
      setEmailError(true);
    }
  })
  };


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
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}  style={styles.login} activeOpacity={0.8}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.part1}>
          <View style={styles.connexion}>
            <Text style={styles.title}>CONNEXION</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.login} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Go to Map</Text>
                </TouchableOpacity>
        <TextInput style={styles.input} 
                   placeholder='  ✉️️ Adresse Mail'
                   autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                   keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                   textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                   autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
                   onChangeText={(signInEmail) => setSignInEmail(signInEmail)}
                   value={signInEmail}/>
          {emailError && <Text style={styles.error}>⚠️ Invalid email address</Text>}
        <TextInput style={styles.input} 
                   placeholder=' 🔒 Mot de Passe'
                   onChangeText={(signInPassword) => setSignInPassword(signInPassword)}
                   value = {signInPassword}></TextInput>
           <TouchableOpacity style={styles.textconnexion} onPress={() => handleSubmit()} activeOpacity={0.8}>
              <Text style={styles.title2}>SE CONNECTER</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.compte}>________________   OU   ________________</Text>
        <Text style={styles.compte}> Pas encore de compte ? </Text>

        <View style={styles.part2}>
        <TouchableOpacity  onPress={() => navigation.navigate('Profile')} style={styles.input} activeOpacity={0.8}>
            <Text style={styles.text}>Inscritpion avec email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGoogle()} style={styles.input} activeOpacity={0.8}>
            <Text style={styles.text}>Connexion avec Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFacebook()} style={styles.input} activeOpacity={0.8}>
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
      backgroundColor: '#9E2A2B',
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
      color: 'white',
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