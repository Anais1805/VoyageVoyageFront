import { View, Text, Button, TextInput, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ProfileScreen({ navigation }) {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isSelected, setSelected] = useState(false);
  const [checked, setChecked] = useState("first");
  const [checked2, setChecked2] = useState("first");
  const [checked3, setChecked3] = useState("first");
 

  return (
    <View style={styles.container}>
         <View style={styles.header}>
          <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
            <Image style= {styles.logo} source={require('../assets/logo.png')}></Image>
          </TouchableOpacity>
        </View>

      <Image
        style={styles.avatar}
        source={{
          uri: "https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small_2x/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg",
        }}
      ></Image>
      <TextInput
        style={styles.input}
        onChangeText={(usernameValue) => setUsernameValue(usernameValue)}
        value={usernameValue}
        placeholder={"Username"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(passwordValue) => setPasswordValue(passwordValue)}
        value={passwordValue}
        placeholder={"Password"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(emailValue) => setEmailValue(emailValue)}
        value={emailValue}
        placeholder={"Email"}
      />
      
      <Text style={styles.ligne}>              </Text>
      <Text style={styles.soustitre}>Profil Voyageur - Préférences</Text>
       
      <View style={styles.allRadioButton}>
        <View style={styles.containerRadioButton}>
          {/* //////////////SITUATION FAMILIALE //////////// */}
          <Text style={styles.subtitleRadio}>Je suis :</Text>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="Seul(e)"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Seul(e)</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
              disabled={false}
            />
            <Text style={styles.textRadio}>En famille</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="third"
              status={checked === "third" ? "checked" : "unchecked"}
              onPress={() => setChecked("third")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Entre amis</Text>
          </View>
        
        
          {/* ////////////// BUDGET //////////// */}
          <Text style={styles.subtitleRadio}>Budget :</Text>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="Seul(e)"
              status={checked2 === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked2("first")}
              disabled={false}
            />
            <Text style={styles.textRadio}>€</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="second"
              status={checked2 === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked2("second")}
              disabled={false}
            />
            <Text style={styles.textRadio}>¥¥</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="third"
              status={checked2 === "third" ? "checked" : "unchecked"}
              onPress={() => setChecked2("third")}
              disabled={false}
            />
            <Text style={styles.textRadio}>$$$</Text>
          </View>
          </View>

          <View style={styles.containerRadioButton}>
          {/* //////////////REGIME ALIMENTAIRE //////////// */}
          <Text style={styles.subtitleRadio}>Régime alimentaire :</Text>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="first"
              status={checked3 === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked3("first")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Flexitarien</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="second"
              status={checked3 === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked3("second")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Végétarien</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="third"
              status={checked3 === "third" ? "checked" : "unchecked"}
              onPress={() => setChecked3("third")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Vegan</Text>
          </View>
       

        
          {/* ////////////// DEPLACEMENT//////////// */}
          <Text style={styles.subtitleRadio}>Déplacement :</Text>
          <View style={styles.radio}>
            {/* <RadioButton
              style={styles.radioButton}
              value="first"
              status={checked4 === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked4("first")}
              disabled={false}
            /> */}
        <BouncyCheckbox onPress={(isSelected) => {}} fillColor="#9E2A2B"/>
            <Text style={styles.textRadio}>A pied</Text>
          </View>
          <View style={styles.radio}>
            {/* <RadioButton
              style={styles.radioButton}
              value="second"
              status={checked4 === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked4("second")}
              disabled={false}
            /> */}
            <BouncyCheckbox onPress={(isSelected) => {}} fillColor="#9E2A2B"/>
            <Text style={styles.textRadio}>En transports</Text>
          </View>
          <View style={styles.radio}>
          <BouncyCheckbox onPress={(isSelected) => {}}  fillColor="#9E2A2B" />
            <Text style={styles.textRadio}>En voiture</Text>
          </View>
      </View>
    </View>
    <Pressable style={styles.button}>
    <Text style={styles.texteButton}>Valider</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: "center",
    width:'100%',
    height: '100%',
    
  },

  header: {
      width: '100%',
      backgroundColor: 'white',
      borderWidth: 1,
      justifyContent: 'flex-start',
      alignItems: 'left',
      marginBottom: 15,
      paddingTop: 30,

      
    },
    logo: {
        width: 60,
        height: 60,
        marginLeft: '6%',
        marginBottom: 15,
        justifyContent: 'flex-start',
        
      },
   
      
  input: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 5,
    width: 200,
    marginBottom: 20,
    borderRadius: 10,
    textAlign: "Left",
  },
  avatar: {
    width: 70,
    height: 70,
    marginBottom: 20,
    borderRadius: 50
  },
  ligne: {
    borderBottomWidth: 2,
    textDecorationLine: 'underline'
  },
  soustitre: {
    borderWidth: 1,
    borderColor: "#9E2A2B",
    padding: 5,
    width: 300,
    textAlign: "center",
    borderRadius: 10,
    borderStyle: 'dashed'
  },
  radioButton: {
    width: 10,
    height: 10,
   
  },
  containerRadioButton: {
    flex: 1,
    marginBottom: 5,
   
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    
  },
  allRadioButton: {
    flexWrap: 'wrap',
   display: 'flex',
    flexDirection: 'row',
    margin: 40,
    marginBottom: 30
  },
  textRadio: {
    marginLeft: 5,
    marginTop: 6,
    marginBottom: 15
  },
  subtitleRadio: {
    marginBottom: 4,
    textDecorationLine: 'underline'
  },
  button: { 
    backgroundColor: '#9E2A2B',
    color: 'white',
    paddingHorizontal: 25,
    padding : 10,
    borderRadius: 15
  }, 
  texteButton: {
    color: 'white'
  },
  
});
