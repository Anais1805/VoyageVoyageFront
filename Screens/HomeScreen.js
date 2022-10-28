
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import Header from '../components/Header';
import Card from '../components/Card';
import ModalSearch from '../components/ModalSearch';

export default function HomeScreen({ navigation }){
    return (
      
        <ImageBackground style={styles.container} source={require('../assets/bg.jpg')}>

        <Header />

      <View style={styles.headline}>
          <Text style={styles.titleHome}>NOS SUGGESTIONS</Text>
      </View>   
     
     <ModalSearch />
     </ImageBackground>
    );
   }

   const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
  },
    headline: {
    backgroundColor: '#9E2A2B',
    width: 180,
    alignItems: 'center',
    marginTop: 140,
    marginLeft: 100,
    borderRadius: 5,
  },
    titleHome: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    margin: 12,
    }
  })

