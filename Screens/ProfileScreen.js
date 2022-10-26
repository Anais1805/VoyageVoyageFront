import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../reducers/users";
import createPersistoid from "redux-persist/es/createPersistoid";

export default function ProfileScreen({ navigation }) {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isSelected, setSelected] = useState([]);
  const [checked, setChecked] = useState("Seul(e)");
  const [checked2, setChecked2] = useState("€");
  const [checked3, setChecked3] = useState("Flexitarien");
  const [alreadyPress, setAlreadyPress]=useState('false')
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();

  
  const user = useSelector((state)=> state.user.value)  
  console.log(user)
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 
  const submitClick = () => {
    fetch("http://192.168.1.43:4000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
        family: checked,
        budget: checked2,
        diet: checked3,
        displacement: [...isSelected],
        isConnected: true,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.result && EMAIL_REGEX.test(emailValue)) {
          dispatch(
           SignUp({
              username: usernameValue,
              password: passwordValue,
              email: emailValue,
              family: checked,
              budget: checked2,
              diet: checked3,
              displacement: [...isSelected],
              isConnected: true,
            })
          )
          setSelected([])
        } else {
            setEmailError(true);
        }
      });
  };
  const addDisplacement = (newDisplacement) => {
    
    setSelected([...isSelected, newDisplacement])
    console.log('r', isSelected)
  }
  const removeDisplacement = (newDisplacement) => {
    if(alreadyPress){
    setSelected(isSelected.filter(e => e !== newDisplacement) )
    
}
  }
  const checkedBox = () => {
    setAlreadyPress(!alreadyPress)
   
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity  style={styles.logoContainer} onPress={() => navigation.navigate('Home')}>
             <Image style= {styles.logo} source={require('../assets/logo.png')}></Image>
          </TouchableOpacity>
        </View>

      <Image
        style={styles.avatar}
        source={{
          uri: "https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small_2x/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg",
        }}
      ></Image>
      <KeyboardAvoidingView>
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
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(emailValue) => setEmailValue(emailValue)}
          value={emailValue}
          placeholder={"Email"}
          textContentType='emailAddress'
          autoComplete="email"
        />
        {emailError && <Text style={styles.error}> ⚠️ Invalid email address</Text>}
      </KeyboardAvoidingView>

      <Text style={styles.soustitre}>Profil Voyageur - Préférences</Text>

      <View style={styles.allRadioButton}>
        <View style={styles.containerRadioButton}>
          {/* //////////////SITUATION FAMILIALE //////////// */}
          <Text style={styles.subtitleRadio}>Je suis :</Text>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="Seul(e)"
              status={checked === "Seul(e)" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("Seul(e)");
              }}
              disabled={false}
              uncheckedColor="#F3F3F3"
            />
            <Text style={styles.textRadio}>Seul(e)</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="En famille"
              status={checked === "En famille" ? "checked" : "unchecked"}
              onPress={() => setChecked("En famille")}
              disabled={false}
            />
            <Text style={styles.textRadio}>En famille</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="Entre amis"
              status={checked === "Entre amis" ? "checked" : "unchecked"}
              onPress={() => setChecked("Entre amis")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Entre amis</Text>
          </View>

          {/* ////////////// BUDGET //////////// */}
          <Text style={styles.subtitleRadio}>Budget :</Text>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="€"
              status={checked2 === "€" ? "checked" : "unchecked"}
              onPress={() => setChecked2("€")}
              disabled={false}
            />
            <Text style={styles.textRadio}>€</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="¥¥"
              status={checked2 === "¥¥" ? "checked" : "unchecked"}
              onPress={() => setChecked2("¥¥")}
              disabled={false}
            />
            <Text style={styles.textRadio}>¥¥</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="$$$"
              status={checked2 === "$$$" ? "checked" : "unchecked"}
              onPress={() => setChecked2("$$$")}
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
              value="Flexitarien"
              status={checked3 === "Flexitarien" ? "checked" : "unchecked"}
              onPress={() => setChecked3("Flexitarien")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Flexitarien</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="Végétarien"
              status={checked3 === "Végétarien" ? "checked" : "unchecked"}
              onPress={() => setChecked3("Végétarien")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Végétarien</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              style={styles.radioButton}
              value="Vegan"
              status={checked3 === "Vegan" ? "checked" : "unchecked"}
              onPress={() => setChecked3("Vegan")}
              disabled={false}
            />
            <Text style={styles.textRadio}>Vegan</Text>
          </View>

          {/* ////////////// DEPLACEMENT//////////// */}
          <Text style={styles.subtitleRadio}>Déplacement :</Text>
          <View style={styles.radio}>
            <BouncyCheckbox
              onPress={() => {addDisplacement("A pied"); removeDisplacement(); ; checkedBox()}}
              fillColor="#9E2A2B"
              text="A pied"
              textStyle={styles.textRadio}
            />
          </View>
          <View style={styles.radio}>
            <BouncyCheckbox
              onPress={() => {addDisplacement("En transports"); removeDisplacement("En transports"); checkedBox()}}
              fillColor="#9E2A2B"
              text="En transports"
              textStyle={styles.textRadio}
              
            />
          </View>
          <View style={styles.radio}>
            <BouncyCheckbox
              onPress={() => {addDisplacement("En voiture"); removeDisplacement("En voiture"); ; checkedBox()}}
              fillColor="#9E2A2B"
              text="En voiture"
              textStyle={styles.textRadio}
            />
          </View>
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => submitClick()}>
        <Text style={styles.texteButton}>Valider</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  header: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    borderBottomColor: '#9E2A2B',
    borderBottomWidth : 1,
    marginBottom: 15
  },
  logoContainer: {
    marginLeft: '-10%',
    marginBottom: '-5%'
  },
  logo: {
    width: "35%",
    height: "50%",
    marginLeft: "35%",
    marginTop: "22%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    padding: 5,
    width: 200,
    marginBottom: 15,
    borderRadius: 10,
    // textAlign: "Left",
  },
  avatar: {
    width: 70,
    height: 70,
    marginBottom: 20,
    borderRadius: 50,
  },
  ligne: {
    borderBottomWidth: 2,
    textDecorationLine: "underline",
  },
  soustitre: {
    borderWidth: 1,
    borderColor: "#9E2A2B",
    padding: 5,
    width: 300,
    textAlign: "center",
    borderRadius: 10,
   
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
    display: "flex",
    flexDirection: "row",
  },
  allRadioButton: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    margin: 40,
    marginBottom: 30,
  },
  textRadio: {
    marginLeft: 5,
    marginTop: 6,
    marginBottom: 10,
    color: "black",
    fontSize: 15,
    textDecorationLine: "none",
  },
  subtitleRadio: {
    marginBottom: 4,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#9E2A2B",
    color: "white",
    paddingHorizontal: 25,
    padding: 10,
    borderRadius: 15,
  },
  texteButton: {
    color: "white",
  },
  error: {
    marginTop: 0,
    paddingBottom: 10
  }
});
