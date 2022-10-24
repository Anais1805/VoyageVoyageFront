import { View, Text, Button, TextInput } from 'react-native'

export default function HomeScreen({ navigation }) {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Connection')}
        />
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    );
   }
