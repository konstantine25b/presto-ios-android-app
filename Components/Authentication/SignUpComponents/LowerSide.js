import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import COLORS from "../../Styles/colors";

export default function LowerSide() {
  return (
    <>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>
      <Text style={styles.otherOptions}> Sign up with</Text>
      <View style={styles.logos}>
        <Pressable style={styles.logoButton}>
          <Image
            style={styles.logo}
            source={require("../../../assets/Google__G__Logo.png")}
          />
        </Pressable>
        <Pressable style={styles.logoButton}>
          <Image
            style={styles.logo}
            source={require("../../../assets/faceBook.png")}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  otherOptions: { fontSize: 18, color: COLORS.mainColor, marginTop: 10 },
  logos: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginBottom: 40,
  },
  logoButton: {
    margin: 3,
    borderRadius: 35,
    overflow: "hidden",
  },
  logo: {
    height: 36,
    width: 36,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "black",
  },
});
