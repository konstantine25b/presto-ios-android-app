import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../Styles/colors";

const UpperSide = () => {
  return (
    <>
      <View style={styles.topLine}>
        <View style={styles.createAccount}>
          <Text style={styles.title}>Create Your</Text>
          <Text style={styles.subtitle}>Presto account</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topLine: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 60,
  },
  title: { fontSize: 40 },
  subtitle: { fontSize: 20, marginLeft: 10 },
  otherOptions: { fontSize: 18, color: COLORS.mainColor, marginTop: 10 },

  createAccount: {
    marginBottom: "10%",
    marginTop: "0%",
    alignItems: "center",
  },
});

export default UpperSide;
