import { StyleSheet, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "react-native-heroicons/outline";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import COLORS from "../../Styles/colors";
import CustomTextField from "../AuthComponets/CustomTextField";
import { API } from "../../../Processing/PrestoAPI";

export default function InputFields() {
  const navigation = useNavigation();
  const [passwordIsShown, setPassworVisibility] = useState(false);
  const [secureEntry, setSecureEntry] = useState(false);
  const [user, setUser] = useState(null); // kotem chaamata

  function setVisibility() {
    if (passwordIsShown) {
      setSecureEntry(false);
      setPassworVisibility(false);
    } else {
      setPassworVisibility(true);
      setSecureEntry(true);
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    handleSignup(data.name, data.email, data.password);
  };

  const handleSignup = async (username, email, password) => {
    console.log(username, email, password);
    const success = await API.register({
      username,
      email,
      password,
    });

    if (success) {
      setUser({ email });
    } else {
      console.log("wrong data");
    }
  };

  useEffect(() => {
    if (user != null) {
      navigation.navigate("Home");
    }
  }, [user]);
  return (
    <>
      <View style={styles.field}>
        <View>
          <Controller
            control={control}
            rules={{
              required: "Please Enter Your Name",
              minLength: {
                value: 2,
                message: "Minimum length of name is 2",
              },
              maxLength: {
                value: 15,
                message: "Maximum length of name is 15",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Name can only contain letters (a-z, A-Z)",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <CustomTextField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  writtenText="Enter your name"
                />
                {error && <Text style={styles.errorMsg}>{error.message}</Text>}
              </>
            )}
            name="name"
          />
        </View>
        <UserIcon size={24} color={COLORS.iconColor} style={styles.icon} />
      </View>

      <View style={styles.field}>
        <View>
          <Controller
            control={control}
            rules={{
              required: "Please Enter Your Phone Number",
              valueAsNumber: true,
              minLength: {
                value: 7,
                message: "Minimum length of phoneNumber is 7",
              },
              maxLength: {
                value: 15,
                message: "Maximum length of phoneNumber is 15",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <CustomTextField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  writtenText="Enter your phone number"
                  theKeyboardType="numeric"
                />
                {error && <Text style={styles.errorMsg}>{error.message}</Text>}
              </>
            )}
            name="phoneNumber"
          />
        </View>
        <PhoneIcon size={24} color={COLORS.iconColor} style={styles.icon} />
      </View>
      <View style={styles.field}>
        <View>
          <Controller
            control={control}
            rules={{
              required: "Please Enter Your Email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter a Valid Email",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <CustomTextField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  writtenText="Enter your email"
                />
                {error && <Text style={styles.errorMsg}>{error.message}</Text>}
              </>
            )}
            name="email"
          />
        </View>
        <EnvelopeIcon size={24} color={COLORS.iconColor} style={styles.icon} />
      </View>
      <View style={styles.field}>
        <View>
          <Controller
            control={control}
            rules={{
              required: "Please Enter Password",
              minLength: {
                value: 8,
                message: "Minimum length of password is 8",
              },
              maxLength: {
                value: 18,
                message: "Maximum length of password is 18",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <CustomTextField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  writtenText="Enter your password"
                  isSecureEntry={secureEntry}
                />
                {error && <Text style={styles.errorMsg}>{error.message}</Text>}
              </>
            )}
            name="password"
          />
        </View>

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
        <LockClosedIcon
          size={24}
          color={COLORS.iconColor}
          style={styles.icon}
        />
      </View>

      <Pressable
        android_ripple={{ color: "white" }}
        style={styles.signUp}
        onPress={handleSubmit(onSubmit)}
        //  onPress={signUpFunction}
      >
        <View>
          <Text style={styles.text}>Sign Up</Text>
        </View>
      </Pressable>
      <View style={styles.bottomLine}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <Pressable
          android_ripple={{ color: "white" }}
          style={styles.signIn}
          onPress={() => navigation.navigate("NewLoginScreen")}
        >
          <View>
            <Text style={styles.logInText}>Log In</Text>
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
  eyeIcons: { position: "absolute", top: 4, left: 4 },
  passwordRevealButton: {
    // backgroundColor: "#ddd",
    borderRadius: 4,
    height: 32,
    width: 32,
    top: 23,
    left: "77%",
    position: "absolute",
  },

  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },

  signIn: {
    //backgroundColor: mainColor,
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    width: "20%",
    marginBottom: 0,
    paddingBottom: "10%",
  },
  signUp: {
    backgroundColor: COLORS.mainColor,
    padding: 12,
    borderRadius: 4,
    marginTop: 15,
    width: "75%",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  logInText: {
    color: COLORS.mainColor,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  field: {
    flexDirection: "row",
  },

  bottomLine: {
    flexDirection: "row",
  },
  signInText: {
    marginTop: 15,
    marginLeft: 15,
    color: "#444",
  },
  exitArrow: { marginRight: 30, marginBottom: 0 },

  textField: { borderColor: "black", borderRadius: 10 },

  errorMsg: {
    flexDirection: "column",
    marginLeft: 4,
    color: "red",
    fontSize: 13,
  },
  inner: {},
});
