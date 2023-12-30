import { StyleSheet, View } from "react-native";
import COLORS from "../Styles/colors.js";
import InputFields from "./LoginComponents/InputFields.js";
import UpperSide from "./LoginComponents/UpperSide.js";

export default function LogIn() {
  return (
    <View style={styles.container}>
      <UpperSide />
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
