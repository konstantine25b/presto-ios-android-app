import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import InputFields from "./LoginComponents/InputFields.js";
import UpperSide from "./LoginComponents/UpperSide.js";

export default function LogIn() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <UpperSide />
      <InputFields />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingBottom: "17%",
    height: "100%",
  },
});
