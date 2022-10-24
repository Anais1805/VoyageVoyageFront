import { View, Text, Button } from 'react-native'

export default function ConnectionScreen({ navigation }) {
    return (
      <View>
        <Text>Connection Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')} 
        />
      </View>
      
    );
   }