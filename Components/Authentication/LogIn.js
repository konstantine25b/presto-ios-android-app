import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ShieldExclamationIcon,
} from "react-native-heroicons/outline";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../Styles/colors.js";
import CustomTextField from "./LoginComponents/CustomTextField.js";
import { API } from "../../Processing/PrestoAPI";
const mainColor = "#622A0F";

export default function LogIn() {
  const navigation = useNavigation();

  const [hasEnteredWrongLogIn, SetIncorrectInputMsg] = useState(true);
  const [passwordIsShown, setPassworVisibility] = useState(false);
  // const [secureEntry, setSecureEntry] = useState(false);

  const [user, setUser] = useState(null); // kotem chaamata

  function setVisibility() {
    if (passwordIsShown) {
      // setSecureEntry(false);
      setPassworVisibility(false);
    } else {
      setPassworVisibility(true);
      // setSecureEntry(true);
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (email, password) => {
    const success = await API.login(email, password);
    if (success) {
      setUser({ email });
    } else {
      console.log("wrong data");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    handleLogin(data.email, data.password);
  };
  useEffect(() => {
    // kotem daamata
    if (user != null) {
      navigation.navigate("Home");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.topLine}>
        <View style={styles.createAccount}>
          <Text style={styles.createAn}>Log in to Your</Text>
          <Text style={styles.account}>Presto account</Text>
        </View>
      </View>
      <Text style={styles.otherOptions}> Log in with</Text>
      <View style={styles.logos}>
        <Pressable>
          <Image
            style={styles.img}
            source={require("../../assets/Google__G__Logo.png")}
          />
        </Pressable>
        <Pressable>
          <Image style={styles.img} source={require("../../assets/faceBook.png")} />
        </Pressable>
      </View>

      <View
        style={{ marginBottom: 40, flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <View style={styles.incorrectBox}>
        {!hasEnteredWrongLogIn && <ShieldExclamationIcon color="red" />}
        {!hasEnteredWrongLogIn && (
          <Text style={styles.incorrectText}>Incorrect Email or Password!</Text>
        )}
      </View>
      <View style={styles.field}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              style={styles.input}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              writtenText="Enter your Email"
            />
          )}
          name="email"
        />
        <EnvelopeIcon size={24} color={COLORS.iconColor} style={styles.icon} />
      </View>

      <View style={styles.field}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              style={styles.input}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              writtenText="Enter your password"
              isSecureEntry={passwordIsShown}
            />
          )}
          name="password"
        />
        <LockClosedIcon
          size={24}
          color={COLORS.iconColor}
          style={styles.icon}
        />
        <Pressable
          android_ripple={{ color: "white" }}
          style={styles.passwordRevealButton}
          onPress={setVisibility}
        >
          {passwordIsShown && (
            <EyeSlashIcon
              size={24}
              color="black"
              style={styles.eyeIcons}
            ></EyeSlashIcon>
          )}
          {!passwordIsShown && (
            <EyeIcon size={24} color="black" style={styles.eyeIcons}></EyeIcon>
          )}
        </Pressable>
      </View>

      <Pressable
        android_ripple={{ color: "white" }}
        style={styles.signUp}
        onPress={handleSubmit(onSubmit)}
        //onPress={loginFunction}
      >
        <View>
          <Text style={styles.text}>Log In</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
        android_ripple={{ color: "white" }}
      >
        <View>
          <Text style={styles.forgotPassword}>forgot password?</Text>
        </View>
      </Pressable>
      <View style={styles.bottomLine}>
        <Text style={styles.signInText}>Don't have an account?</Text>
        <Pressable
          android_ripple={{ color: "white" }}
          style={styles.signIn}
          onPress={() => navigation.navigate("NewSignUpScreen")}
        >
          <View>
            <Text style={styles.text}>Sign Up</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 4,
    position: "absolute",
    top: 27,
    bottom: 0,
    left: 8,
    right: 0,
  },
  eyeIcons: { position: "absolute", top: 4, left: "150%" },
  passwordRevealButton: {
    // backgroundColor: "#ddd",
    borderRadius: 4,
    height: 32,
    width: 32,
    top: 23,
    left: "77%",
    position: "absolute",
  },

  forgotPassword: {
    color: COLORS.mainColor,
    textDecorationLine: "underline",
    //marginLeft: 20,
    marginTop: 5,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 60,
  },
  otherOptions: { fontSize: 18, color: mainColor },
  logos: {
    flexDirection: "row",
    color: "white",
    padding: 5,
    marginBottom: 40,

    //backgroundColor: "black",
  },
  img: {
    height: 36,
    width: 36,
    margin: 3,
    borderRadius: 35,
    borderColor: "black",
  },
  smallText: {
    marginRight: 150,
  },
  incorrectBox: {
    flexDirection: "row",
  },
  smallText2: {
    marginRight: 125,
  },
  smallText3: {
    marginRight: 100,
  },
  createAn: { fontSize: 40, marginRight: 0 },
  account: { fontSize: 40, marginLeft: 0 },
  createAccount: {
    marginBottom: "13%",
    marginTop: "0%",
    alignItems: "center",
    //marginRight: 70,
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingBottom: "17%",
  },
  incorrectText: { color: "red", marginLeft: 7, marginTop: 2 },

  signIn: {
    backgroundColor: COLORS.mainColor,
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    width: "20%",
    marginBottom: "25%",
  },

  signUp: {
    backgroundColor: COLORS.mainColor,
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    width: "70%",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  logInText: {
    color: mainColor,
    textAlign: "center",
    textDecorationLine: "underline",
    //marginBottom: 60,
  },
  field: {
    flexDirection: "row",
    width: "90%",
  },
  bottomLine: {
    flexDirection: "row",
    marginTop: 5,
  },
  signInText: {
    marginTop: 15,
    marginLeft: 15,
    color: "#444",
  },
  exitArrow: { marginRight: 0, marginBottom: 0 },
  textField: { borderColor: "black", borderRadius: 10 },
  errorMsg: {
    flexDirection: "column",
    marginLeft: 20,
    color: "red",
    fontSize: 13,
  },
  inner: {},
});
