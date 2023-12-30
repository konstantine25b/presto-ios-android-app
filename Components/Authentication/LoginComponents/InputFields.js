import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import COLORS from "../../Styles/colors";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../Processing/PrestoAPI";

export default function InputFields() {
  const navigation = useNavigation();

  const [passwordIsShown, setPassworVisibility] = useState(false);


  function setVisibility() {
    if (passwordIsShown) {
      setPassworVisibility(false);
    } else {
      setPassworVisibility(true);
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
      console.log("Correct data");
      navigation.navigate("Home");
    } else {
      console.log("Wrong Data");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    handleLogin(data.email, data.password);
  };
  

  return (
    <>
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
    </>
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

    marginTop: 5,
  },

  account: { fontSize: 40, marginLeft: 0 },

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

  textField: { borderColor: "black", borderRadius: 10 },
});
