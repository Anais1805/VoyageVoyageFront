import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';


export default function Header({navigation}) {

    return (
        <View style={styles.container}>

          <View style={{width: '100%', height: 60}}>

          <View style={styles.iconHeader}>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </TouchableOpacity>

            

          </View>
        </View>

        <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    marginTop: 60,
    position: 'absolute',
    
  },
  iconHeader: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginLeft: 20,
  },
  
});
