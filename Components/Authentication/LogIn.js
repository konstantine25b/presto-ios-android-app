import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import COLORS from "../Styles/colors.js";
import InputFields from "./LoginComponents/InputFields.js";

export default function LogIn() {
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
          <Image
            style={styles.img}
            source={require("../../assets/faceBook.png")}
          />
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
      <InputFields />
    </View>
  );
}

const styles = StyleSheet.create({
  topLine: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 60,
  },
  otherOptions: { fontSize: 18, color: COLORS.mainColor },
  logos: {
    flexDirection: "row",
    color: "white",
    padding: 5,
    marginBottom: 40,
  },
  img: {
    height: 36,
    width: 36,
    margin: 3,
    borderRadius: 35,
    borderColor: "black",
  },

  createAn: { fontSize: 40, marginRight: 0 },
  account: { fontSize: 40, marginLeft: 0 },
  createAccount: {
    marginBottom: "13%",
    marginTop: "0%",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingBottom: "17%",
    height: "100%",
  },

  text: {
    color: "white",
    textAlign: "center",
  },

  field: {
    flexDirection: "row",
    width: "90%",
  },
});
