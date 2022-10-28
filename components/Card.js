import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text, Button, Image, TouchableOpacity } from 'react-native';


export default function Card() {

    return (
    <View style={styles.container}>

        <View style={styles.cardContent}>

            <View style={{flexDirection: 'row'}}>
             
                <Image style={styles.cardImg} source={require('../assets/resto1.jpg')} />
                <View style={styles.desc}>
                    <Text style={styles.titleCard}>Notre Dame de Paris</Text>
                    <Text style={styles.descCard}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.btnCard}>
                <Text style={styles.btnText}>+ de filtres</Text>
            </TouchableOpacity>

        </View>


        <View style={styles.cardContent}>

<View style={{flexDirection: 'row'}}>
 
    <Image style={styles.cardImg} source={require('../assets/resto1.jpg')} />
    <View style={styles.desc}>
        <Text style={styles.titleCard}>Notre Dame de Paris</Text>
        <Text style={styles.descCard}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque
        </Text>
    </View>
</View>

<TouchableOpacity style={styles.btnCard}>
    <Text style={styles.btnText}>+ de filtres</Text>
</TouchableOpacity>

</View>


<View style={styles.cardContent}>

<View style={{flexDirection: 'row'}}>
 
    <Image style={styles.cardImg} source={require('../assets/resto1.jpg')} />
    <View style={styles.desc}>
        <Text style={styles.titleCard}>Notre Dame de Paris</Text>
        <Text style={styles.descCard}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque
        </Text>
    </View>
</View>

<TouchableOpacity style={styles.btnCard}>
    <Text style={styles.btnText}>+ de filtres</Text>
</TouchableOpacity>

</View>

<View style={styles.cardContent}>

<View style={{flexDirection: 'row'}}>
 
    <Image style={styles.cardImg} source={require('../assets/resto1.jpg')} />
    <View style={styles.desc}>
        <Text style={styles.titleCard}>Notre Dame de Paris</Text>
        <Text style={styles.descCard}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque
        </Text>
    </View>
</View>

<TouchableOpacity style={styles.btnCard}>
    <Text style={styles.btnText}>+ de filtres</Text>
</TouchableOpacity>

</View>


        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    marginTop: 210,
    // justifyContent: 'center',
    position: 'absolute',
  },
  cardContent: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 150,
   borderRadius: 10,
   flexDirection: 'column',
   
   marginBottom: 10,
  },
  cardImg: {
    width: 150,
    height: 110,
    margin: 5,
    borderRadius: '5',
  },
  desc: {
    width: 170,
    height: 100,
    margin: 5,
    marginBottom: 20,
  },
  titleCard: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descCard: {
    fontSize: 13,
    margin: 2,
  },
  btnCard: {
    backgroundColor: '#9E2A2B',
    width: 100,
    height: 20,
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 2,
    marginLeft: 5,
  }, 
  btnText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  }
});
