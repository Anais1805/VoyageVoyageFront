
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'


export default function HomeScreen({ navigation }){
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
        <ImageBackground source={require('../assets/bg.jpg')} style={styles.bg}>
            <View style={styles.titleHome}>
              <Text style={styles.title}>Nos suggestions</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MyReservation')}>
               <Text style={styles.btnLogin1}>Réservation</Text></TouchableOpacity>

               <TouchableOpacity onPress={() => navigation.navigate('Days')} style={styles.titleHome} activeOpacity={0.8}>
                    <Text style={styles.daysButton}>Days Resa</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Overview')} style={styles.titleHome} activeOpacity={0.8}>
                    <Text style={styles.title}>Direction Recap</Text>
                </TouchableOpacity>
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
  }) 

