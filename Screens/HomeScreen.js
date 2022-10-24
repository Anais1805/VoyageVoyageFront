import { View, Text, Button } from 'react-native'

export default function ConnectionScreen({ navigation }) {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to Connection"
          onPress={() => navigation.navigate('Connection')}
        />
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
    }
  }) 

