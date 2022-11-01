import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import destinations from "../reducers/destinations";
import { destinationSearch } from '../reducers/destinations';

import { useSelector, useDispatch } from 'react-redux';

export default function ModalSearch ({navigation})  {


const [city, setCity]=useState('')
const [country, setCountry]=useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const destination = useSelector((state) => state.destinations.value)
const dispatch = useDispatch()
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
    <>
    

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={{justifyContent: 'center', alignItems:'flex-end', marginTop: -20, marginBottom: 20}}>
              <Text style={{fontWeight: 'bold'}}>X</Text>
            </View>
            </TouchableOpacity>
            <Text style={styles.modalText}>Rechercher</Text>
            
            <SafeAreaView>
              <TextInput style={styles.inputDestinationVille}  onChangeText={(city) => setCity(city)}
          value={city} placeholder="Ville"/>
              <TextInput style={styles.inputDestinationPays} onChangeText={(country) => setCountry(country)}
          value={country} placeholder="Pays"/>
            
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); searchPress();  navigation.navigate("DayScreen")}}
            >
              <Text style={styles.textStyle}>Valider</Text>
            </Pressable>
            </SafeAreaView>
          </View>

        
      </Modal>

   

    <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.searchIcon]}>
    
    <Image style={styles.iconSearch} source={require('../assets/search.png')}/>  
   </TouchableOpacity>
  </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    
    
  },
  searchIcon:{
    marginRight: 20,
  },
  iconSearch: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  inputDestinationVille: {
    height: "10%",
    borderWidth: 1,
    backgroundColor: 'transparent',
    opacity: 0.3
  },
  inputDestinationPays: {
    height: "10%",
    borderWidth: 1,
    backgroundColor: 'transparent',
    opacity: 0.3,
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    marginTop: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonOpen: {
    
  },
  buttonClose: {
    backgroundColor: "#9E2A2B",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 11,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: '700'
  }
});

