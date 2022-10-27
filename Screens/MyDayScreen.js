import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ReservedScreen({ navigation }) {

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

            <View style={styles.part}>
                <View style={styles.journee}>
                 <Text style={styles.title}>MA JOURNEE</Text>
                </View>
                <View styles={styles.cardcontainer}>
                    <View style= {styles.image} >
                     <Image source={require('../assets/logo.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleSubmit()}  style={styles.delete} activeOpacity={0.8}>
                         <FontAwesome name='times-circle' size={25}></FontAwesome>
                     </TouchableOpacity>
                     <Text style={styles.title2}>Title</Text>
                     <Text style={styles.descritpion}>Descritpion</Text>
                     <TouchableOpacity onPress={() => handleSubmit()}  style={styles.login} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Remplacer</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.part}>
                <View style={styles.journee}>
                 <Text style={styles.title}>MA JOURNEE</Text>
                </View>
                <View styles={styles.cardcontainer}>
                    <View style= {styles.image} >
                     <Image source={require('../assets/logo.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleSubmit()}  style={styles.delete} activeOpacity={0.8}>
                         <FontAwesome name='times-circle' size={25}></FontAwesome>
                     </TouchableOpacity>
                     <Text style={styles.title2}>Title</Text>
                     <Text style={styles.descritpion}>Descritpion</Text>
                     <TouchableOpacity onPress={() => handleSubmit()}  style={styles.login} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Remplacer</Text>
                </TouchableOpacity>
                </View>
                </View>

                <View style={styles.part}>
                <View style={styles.journee}>
                 <Text style={styles.title}>MA JOURNEE</Text>
                </View>
                <View styles={styles.cardcontainer}>
                    <View style= {styles.image} >
                     <Image source={require('../assets/logo.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleSubmit()}  style={styles.delete} activeOpacity={0.8}>
                         <FontAwesome name='times-circle' size={25}></FontAwesome>
                     </TouchableOpacity>
                     <Text style={styles.title2}>Title</Text>
                     <Text style={styles.descritpion}>Descritpion</Text>
                     <TouchableOpacity onPress={() => handleSubmit()}  style={styles.login} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Remplacer</Text>
                </TouchableOpacity>
                </View>
                </View>

                <View style={styles.part}>
                <View style={styles.journee}>
                 <Text style={styles.title}>MA JOURNEE</Text>
                </View>
                <View styles={styles.cardcontainer}>
                    <View style= {styles.image} >
                     <Image source={require('../assets/logo.png')}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleSubmit()}  style={styles.delete} activeOpacity={0.8}>
                         <FontAwesome name='times-circle' size={25}></FontAwesome>
                     </TouchableOpacity>
                     <Text style={styles.title2}>Title</Text>
                     <Text style={styles.descritpion}>Descritpion</Text>
                     <TouchableOpacity onPress={() => handleSubmit()}  style={styles.login} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Remplacer</Text>
                </TouchableOpacity>
                </View>
                </View>
 
            </View>
        </View>
    )
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
     borderBottomColor: '#9E2A2B',
     borderBottomWidth: 2,
      
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
    part: {
        flex: 0.2175, 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9E2A2B',
    },
    
    journee:{
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
        marginTop: '10%',
    },
})