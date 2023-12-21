import { StyleSheet, View, TextInput } from "react-native";

import { useState } from "react";
import COLORS from "../../Styles/colors";

export default function CustomTextField(props) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.container,
        isFocused && {
          borderWidth: 1.3,
          borderColor: COLORS.theBorderColor,
          backgroundColor: "white",
        },
      ]}
    >
      <TextInput
        style={styles.insideText}
        placeholder={props.writtenText}
        placeholderTextColor="#aaa"
        onChangeText={(text) => props.onChange(text)}
        keyboardType={props.theKeyboardType}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        secureTextEntry={props.isSecureEntry}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4FB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: "100%",
    flexDirection: "row",
    padding: 1,
    borderColor: COLORS.mainColor,
    //borderWidth: 2,
    height: 50,
    marginTop: 14,
    marginBottom: 0,
  },
  insideText: {
    color: "black",
    width: "75%",
  },
});
