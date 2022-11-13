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
  ScrollView,
  StatusBar
} from "react-native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { SignUp, login } from "../reducers/users";
import users from "../reducers/users";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import createPersistoid from "redux-persist/es/createPersistoid";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import HeaderConnected from "../components/HeaderConnected";
const BACKEND_ADRESS = 'http://192.168.1.43:4000'

export default function ProfileScreen({ navigation }) {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isSelected, setSelected] = useState([]);
  const [checked, setChecked] = useState("Seul(e)");
  const [checked2, setChecked2] = useState("€");
  const [checked3, setChecked3] = useState("Flexitarien");
  const [alreadyPress, setAlreadyPress] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [connected, setConnected]=useState(false)
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
 
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submitClick = () => {

    fetch(`${BACKEND_ADRESS}/users/signup`, {

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
        isConnected: connected,
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
              isConnected: connected,
            })
          );
          dispatch(login({ token: data.token }))
          setSelected([]);
          navigation.navigate('Home')
          setConnected(!connected)
        } else {
          setEmailError(true);
        }
      });
  };

  console.log('user up', user);

 
  const updateDisplacement = (displacement) => {
    if(isSelected.find(displacement => displacement === 'A pied')){
        setSelected(isSelected.filter(displacement => displacement !== 'A pied'))
    }else {
       return setSelected([...isSelected, displacement])
    }
  }
  const updateDisplacement1 = (displacement) => {
    if(isSelected.find(displacement => displacement === 'En transports')){
        setSelected(isSelected.filter(displacement => displacement !== 'En transports'))
    }else {
        return setSelected([...isSelected, displacement])
     }
   }
   const updateDisplacement2 = (displacement) => {
    if(isSelected.find(displacement => displacement === 'En voiture')){
        setSelected(isSelected.filter(displacement => displacement !== 'En voiture'))
    }else {
        return setSelected([...isSelected, displacement])
     }
   }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#335C67" }}>
    <StatusBar />
    <View style={{ flex: 1, backgroundColor: "#FFFBF7" }}>
      <View style={styles.header}>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../assets/logoWhite.png")}
        ></Image>
      </TouchableOpacity>
        </View>
        {!user.isConnected && <Header/>}
        {user.isConnected && <HeaderConnected />}
      </View>
   
<ScrollView showsVerticalScrollIndicator={false}>
      <View style={{justifyContent: 'center', alignItems:'center'}}>
      <View style={styles.iconAvater}>
              <FontAwesome
                style={{ marginTop: 30 }}
                name="user-circle-o"
                size={80}
                color="#335C67"
                onPress={() => navigation.navigate("Profile")}
              />

              <View style={styles.iconPlus}>
                <TouchableOpacity>
                  <FontAwesome name="plus" size={20} color={"white"} />
                </TouchableOpacity>
              </View>
              </View>
              <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 11 }}>
                Ajouter une photo à votre profil
              </Text>
            </View>
            <View style={{alignItems: 'center', marginVertical: 30}}>
            <View>
              <Text style={{ fontSize: 24, paddingBottom: 30 }}>
                Créez votre compte
              </Text>
            </View>
           
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          onChangeText={(usernameValue) => setUsernameValue(usernameValue)}
          value={usernameValue}
          placeholder={"Nom"}
        />
        <TextInput
          style={styles.input}
          onChangeText={(passwordValue) => setPasswordValue(passwordValue)}
          value={passwordValue}
          placeholder={"Mot de passe"}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(emailValue) => setEmailValue(emailValue)}
          value={emailValue}
          placeholder={"Email"}
          textContentType="emailAddress"
          autoComplete="email"
        />
        {emailError && (
          <Text style={styles.error}> ⚠️ Invalid email address</Text>
        )}
      </KeyboardAvoidingView>
      </View>
      </View>
      
      <View style={{justifyContent: 'center', alignItems:'center'}}>
      <Text style={styles.soustitre}>Profil Voyageur - Préférences</Text>
      </View>
      

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
              onPress={() => updateDisplacement('A pied')
              //{
              //   // addDisplacement("A pied");
              //   // removeDisplacement();
              //   // checkedBox();
              // }
            }
              fillColor="#9E2A2B"
              text="A pied"
              textStyle={styles.textRadio}
            />
          </View>
          <View style={styles.radio}>
            <BouncyCheckbox
              onPress={() => updateDisplacement1('En transports')
              //    {
              //   addDisplacement("En transports");
              //   removeDisplacement("En transports");
              //   checkedBox();
              // }
            }
              fillColor="#9E2A2B"
              text="En transports"
              textStyle={styles.textRadio}
            />
          </View>
          <View style={styles.radio}>
            <BouncyCheckbox
              onPress={() => updateDisplacement2('En voiture')
                // {
                // addDisplacement("En voiture");
                // removeDisplacement("En voiture");
                // checkedBox();
              // }
            }
              fillColor="#9E2A2B"
              text="En voiture"
              textStyle={styles.textRadio}
            />
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={styles.button} onPress={() => submitClick()}>
        <Text style={styles.texteButton}>Valider</Text>
      </TouchableOpacity>  
      </View>      
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#335C67'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBF7'
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  btnHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  login2: {
    width: 100,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#9E2A2B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#9E2A2B",
    marginLeft: 10,
  },
  btnLogin2: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#9E2A2B",
    padding: 5,
    width: 300,
    height: 40,
    marginBottom: 15,
    borderRadius: 10,
    // textAlign: "Left",
  },
  avatar: {
    borderRadius: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ligne: {
    borderBottomWidth: 1,
    textDecorationLine: "underline",
  },
  soustitre: {
    borderWidth: 1,
    borderColor: "#9E2A2B",
    padding: 5,
    width: 250,
    textAlign: "center",
    justifyContent: 'center',
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
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  texteButton: {
    color: "white",
  },
  error: {
    marginTop: 0,
    paddingBottom: 10,
  },
  iconPlus: {
    position: 'absolute',
    backgroundColor: '#9E2A2B',
    borderRadius: '40%',
    width: 30, 
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 60,
    top: 75,
    left: 1
  }
});
