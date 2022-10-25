import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal } from 'react-native'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addPlace, allPlaces } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  
  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [newPlace, setNewPlace] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
          });
      }
    })();
    //  insert code here
}, []);

// mettre les markers de chaque activité enregistré 
// const markers = user.places.map((data, i) => {
//     //console.log(data)
//     return <Marker key={i} coordinate={{ latitude: data.latitude || 0, 
//                                          longitude: data.longitude || 0 }} 
//                            title={data.name} />;

    return (
            <View style={styles.container}>
             <View style={styles.header}>
                    <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
                        <Image style= {styles.logo} source={require('../assets/logo.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}  style={styles.login} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Sign Up</Text>
                    </TouchableOpacity>
             </View>

              {/* <Modal visible={modalVisible} animationType="fade" transparent>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TextInput placeholder="New place" onChangeText={(value) => setNewPlace(value)} value={newPlace} style={styles.input} />
                    <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
                      <Text style={styles.textButton}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
                      <Text style={styles.textButton}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal> */}
        
              <MapView onLongPress={(e) => handleLongPress(e)} mapType="hybrid" style={styles.map}>
                {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
                {/* {markers} */}
              </MapView>
            </View>
          );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
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
        marginBottom: -8,
      },
    login: {
        width: '20%',
        height: '30%',
        marginLeft: '75%',
        marginTop: '-10%',
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
    map: {
      flex: 0.87,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    input: {
      width: 150,
      borderBottomColor: '#ec6e5b',
      borderBottomWidth: 1,
      fontSize: 16,
    },
    button: {
      width: 150,
      alignItems: 'center',
      marginTop: 20,
      paddingTop: 8,
      backgroundColor: '#ec6e5b',
      borderRadius: 10,
    },
    textButton: {
      color: '#ffffff',
      height: 24,
      fontWeight: '600',
      fontSize: 15,
    },
  });