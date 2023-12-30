import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import UpperSide from "./SignUpComponents/UpperSide";
import InputFields from "./SignUpComponents/InputFields";
import LowerSide from "./SignUpComponents/LowerSide";

export default function SignUp() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      style={styles.container}
    >
      <UpperSide />
      <InputFields/>
      <LowerSide/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
});
