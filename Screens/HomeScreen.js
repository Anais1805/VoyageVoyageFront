
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput } from 'react-native'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import destinations from "../reducers/destinations";
import { destinationSearch } from '../reducers/destinations';

export default function HomeScreen({ navigation }){
const [city, setCity]=useState('')
const [country, setCountry]=useState('')
const dispatch = useDispatch()

const destination = useSelector((state)=> state.destinations.value)
 
console.log(destination)
const searchPress = () => {
fetch(`http://192.168.1.43:4000/favorite/${city}/${country}`)
            .then((resp) => resp.json())
            .then((data) => {
              if(data.result) {
                dispatch(destinationSearch({
                  city: data.city.name,
                  country: data.city.country,
                  lat: data.city.lat,
                  lon: data.city.lon
                }
                ))

              }
            })
          }
    return (

      <View style={styles.container}>
        
        <View style={styles.header}>
            <Image style= {styles.logo} source={require('../assets/logo.png')} />
            <View style={styles.menuHeader}>
                
                <TouchableOpacity onPress={() => navigation.navigate('Connection')} style={styles.login1} activeOpacity={0.8}>
                    <Text style={styles.btnLogin1}>S'inscrire</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.login2} activeOpacity={0.8}>
                    <Text style={styles.btnLogin2}>Se connecter</Text>
                </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(city) => setCity(city)}
          value={city}
          placeholder={"City"}
        />
        <TextInput
          style={styles.input}
          onChangeText={(country) => setCountry(country)}
          value={country}
          placeholder={"Ex : fr pour France"}
        />
        <View style={styles.iconContainer}>
         <FontAwesome
            style={styles.iconSearch}
            name="search"
            size={20}
            color={'white'}
            onPress={() => searchPress() }
          />
          </View>
        </View>
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.bg}>
            <View style={styles.titleHome}>
              <Text style={styles.title}>Nos suggestions</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MyReservation')}>
               <Text style={styles.btnLogin1}>Réservation</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('AllRestaurants')}>
               <Text style={styles.btnLogin1}>Restaurants</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('AllCulturals')}>
               <Text style={styles.btnLogin1}>Culturals</Text></TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('AllNaturals')}>
               <Text style={styles.btnLogin1}>Naturals</Text></TouchableOpacity>
              

               <TouchableOpacity onPress={() => navigation.navigate('Days')} style={styles.titleHome} activeOpacity={0.8}>
                    <Text style={styles.daysButton}>Days Resa</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Overview')} style={styles.titleHome} activeOpacity={0.8}>
                    <Text style={styles.title}>Direction Recap</Text>
                </TouchableOpacity>
                <TextInput style={styles.searchBar}> </TextInput>
        </ImageBackground>

            
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
      width: '100%',
      height: '12%',
      flexDirection: 'row',
    }, 
    menuHeader: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        marginTop: '16%',
        marginLeft: '35%',
    },
    logo: {
      width: '10%',
      height: '50%',
      marginLeft: '10%',
      marginTop: '12%',
    },
    login1: {
      width: '18%',
      height: '30%',
      marginRight: '2%',
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
    login2: {
        width: '20%',
        height: '30%',
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
    btnLogin1: {
      color: '#9E2A2B',
      fontWeight: 'bold',
      fontSize: 20,
    },
    btnLogin2: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
    content: {
        flex: 1,
    },
    bg: {
        width: '100%',
        height: '100%',
    },
    titleHome: {
        justifyContent: 'center',
        marginLeft: '25%',
        marginTop: '15%',
        backgroundColor: '#9E2A2B',
        width: '55%',
        height: '6%',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,
    },
    daysButton: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    searchBar: {
      width: 100, 
      height: 50,
    },
    searchContainer:{
      flexDirection: 'row',
    },
    input: {
      borderWidth: 1,
      borderColor: "#E1E1E1",
      padding: 5,
      width: '46.5%',
      marginBottom: 15,
      backgroundColor:'white',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    iconSearch: {
      backgroundColor: '#9E2A2B',
      padding: 5,
      marginBottom: '50%',
    },
  }) 

