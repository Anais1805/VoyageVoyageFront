import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
            <Text style={styles.modalText}>Rechercher</Text>
            
            <SafeAreaView>
              <TextInput style={styles.inputDestination} placeholder="Destination"/>
            
            
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
    width: 40,
    height: 40,
    marginTop: 10,
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
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: '700'
  }
});

export default ModalSearch;