import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export default function DaysScreen({ navigation }) {


    //compteur
    const [count, setCount] = useState(1);

    const handleUpPage = () => {
        setCount(count +1);
    };
    const handleDownPage = () =>{
        if (count <2){
            return;
        } else {
        setCount(count -1);
        }
    }

    //map en attendant les fetch...
    //const [places, setPlaces] = useState([]);


    const placeData = [
        { title: 'Opera Fenice', poster: 'operafenice.jpg', overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.' },
        { title: 'Palais des Doges', poster: 'palaisdesdoges.jpg', overview: 'Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.' },
        { title: 'Trattoria Onesta', poster: 'trattoriaonesta.jpg', overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.' },
    ];

    const places = placeData.map( (places, i) => {
        //return <Places key={i} {...data} />
    })
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() =>navigation.navigate('Home')} activeOpacity={0.8}> 
                    <Image style= {styles.logo} source={require('../assets/logo.png')} />
                </TouchableOpacity>
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
                <ImageBackground source={require('../assets/bg.jpg')} style={styles.bg}>
                    <View style={styles.pagePlace}>
                        <View style={styles.titleDay}>
                            <Text style={styles.text}>Vos journées à (selon ville à rajouter)</Text>
                        </View>

                        <View style={styles.suggest}>
                            <Text>Suggestions (à faire avec un map ou des components) {places.tittle}</Text>
                        </View>

                        <View style={styles.pageNumber}>
                            <TouchableOpacity onPress={() => handleDownPage()} style={styles.pageChangement}>
                                <Text style={styles.text}>G </Text>
                            </TouchableOpacity>
                            <Text style={styles.text}>Journée {count}/ nb page</Text>
                            <TouchableOpacity onPress={() => handleUpPage()} style={styles.pageChangement}>
                                <Text style={styles.text}>D </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

            </View>
        </View>
    )
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
        flexDirection: "row",
        width: "100%",
        height: 100,
        marginTop: "15%",
        marginLeft: "25%",
    },
    logo: {
        width: "40%",
        height: "50%",
        marginLeft: "30%",
        marginTop: "40%",
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
        fontSize: 10,
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    titleDay:{
        width: '90%',
        height: '10%',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    pageNumber:{
        flexDirection: "row",
        width: '90%',
        height: '7%',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    pagePlace:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:{
        color: 'red'
    },
    pageChangement: {
        width: '20%',
        height: '40%',
        marginRight: '5%',
        marginLeft: '5%',
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#9E2A2B',
    }
}) 

