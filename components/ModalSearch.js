import React, { useState } from "react";
import {  Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ModalSearch = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        
          <View style={styles.modalView}>
            <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={()=> setModalVisible(false)} >
            <Image source={require('../assets/close.png')} style={styles.btnClose} />

            </TouchableOpacity>
            </View>
            
            <Text style={styles.modalText}>Rechercher</Text>
           
            
            <SafeAreaView>
              <TextInput style={styles.inputDestination} placeholder="Destination"/>

              <View style={{ marginVertical: 20}}>
              <Image style={{width: 40, height: 40, marginVertical: 20}} source={require('../assets/calendar.png')} />
              <Image style={{width: 40, height: 40}} source={require('../assets/users.png')} />
              <Image style={{width: 40, height: 40, marginVertical: 20}} source={require('../assets/euro.png')} />
              </View>
             
            
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Valider</Text>
            </Pressable>
            </SafeAreaView>
          </View>

        
      </Modal>

   

    <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.searchIcon]}>
    <View>
    <Image style={styles.iconSearch} source={require('../assets/search.png')}/>  
    </View>
   </TouchableOpacity>
  </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
  },
  searchIcon:{
    marginRight: 20,
    borderRadius: 5,
  },
  iconSearch: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5
  },
  inputDestination: {
    height: "10%",
    borderWidth: 1,
    backgroundColor: 'transparent',
    opacity: 0.3
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
    padding: 8,
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
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: '700'
  },
  btnClose: {
   width: 30,
   height: 30,
   justifyContent: 'center',
   alignItems:'flex-end'
  }
});

export default ModalSearch;