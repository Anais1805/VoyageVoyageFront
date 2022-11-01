import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addUserToStore } from "../reducers/users";


const BACKEND_ADRESS = "http://192.168.10.152:4000";


export default function ConnectionScreen({ navigation }) {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);

  const [emailError, setEmailError] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSubmit = () => {
    fetch(`${BACKEND_ADRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: signInPassword, email: signInEmail }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.result);
        if (data.result && EMAIL_REGEX.test(signInEmail)) {
          dispatch(
            addUserToStore({ email: setSignInEmail, token: data.token })
          );
          navigation.navigate("MyReservation");
          setSignInEmail("");
          setSignInPassword("");
        } else {
          setEmailError(true);
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.part1}>
        <View style={styles.connexion}>
          <Text style={styles.title}>CONNEXION</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyDay")}
          style={styles.login}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Go to MyDay</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputEmail}
          placeholder="  ✉️️ Adresse Mail"
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
          onChangeText={(signInEmail) => setSignInEmail(signInEmail)}
          value={signInEmail}
        />
        {emailError && (
          <Text style={styles.error}>⚠️ Invalid email address</Text>
        )}
        <TextInput
          style={styles.inputMdp}
          placeholder=" 🔒 Mot de Passe"
          onChangeText={(signInPassword) => setSignInPassword(signInPassword)}
          value={signInPassword}
        ></TextInput>

        <TouchableOpacity
          style={styles.textconnexion}
          onPress={() => handleSubmit()}
          activeOpacity={0.8}
        >
          <Text style={styles.title2}>SE CONNECTER</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{marginTop: 40}}>
      <Text style={styles.compte}>________________ OU ________________</Text>
      <Text style={styles.compte}> Pas encore de compte ? </Text>
      </View>

      <View style={styles.part2}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.inputMail}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>Inscritpion avec email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleGoogle()}
          style={styles.inputGoogle}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>Connexion avec Google</Text>
        </TouchableOpacity>
       
       <View style={styles.facebook}>
        <TouchableOpacity
          onPress={() => handleFacebook()}
          style={styles.inputFacebook}
          activeOpacity={0.8}
        >
          
          <Text style={styles.text}>Connexion avec Facebook</Text>
        </TouchableOpacity>
        </View>
      </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,

  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  login: {
    width: "20%",
    height: "30%",
    marginLeft: "75%",
    marginTop: "-12%",
    borderRadius: 8,
    backgroundColor: "#9E2A2B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#9E2A2B",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  part1: {
    width: 400,
    height: 200,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  part2: {
    width: 400,
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 40
  },
  inputEmail: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputMdp: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginVertical: 20
  },
  inputMail: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputGoogle: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginVertical: 20,
  },
  inputFacebook: {
    width: "70%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
 
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9E2A2B",
  },
  textconnexion: {
    width: "70%",
    height: "15%",
    borderRadius: 5,
    backgroundColor: "#9E2A2B",
    borderWidth: 1,
    borderColor: "#9E2A2B",
    shadowColor: "#9E2A2B",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 16,
  },
  compte: {
    textAlign: "center",
    marginTop: 20,
  },
  facebook: {
    width: 400,
    height: 40,
    flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
  },
  iconfb: {
    width: 20,
    height: 20
  }
})
