import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import COLORS from "../../Styles/colors";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../Features/BasketSlice";

// es aris qvemot shekvetis micemis dros ro chndeba is pressable
const Basket = (props) => {
  const { theme } = props;
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("BasketPage");
      }}
      style={theme == "dark" ? darkStyles.mainButton : lightStyles.mainButton}
    >
      <View
        style={{
          backgroundColor: COLORS.mainColor,
          borderRadius: 5,

          padding: 3,
          paddingHorizontal: 9,
        }}
      >
        <Text
          style={
            theme == "dark" ? darkStyles.itemsLength : darkStyles.itemsLength
          }
        >
          {items.length}
        </Text>
      </View>
      <Text
        style={theme == "dark" ? darkStyles.basketText : lightStyles.basketText}
      >
        Order Now
      </Text>
      <Text
        style={
          theme == "dark" ? darkStyles.basketTotal : lightStyles.basketTotal
        }
      >
        {basketTotal} ₾
      </Text>
    </Pressable>
  );
};

export default Basket;

const darkStyles = StyleSheet.create({
  mainButton: {
    position: "absolute",
    width: "90%",
    height: 70,
    backgroundColor: COLORS.mainColor,
    opacity: 0.9,
    bottom: 30,
    alignSelf: "center",
    borderRadius: 10,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemsLength: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  basketText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  basketTotal: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});

const lightStyles = StyleSheet.create({
  mainButton: {
    position: "absolute",
    width: "90%",
    height: 70,
    backgroundColor: "white",
    opacity: 0.9,
    bottom: 30,
    alignSelf: "center",
    borderRadius: 10,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemsLength: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  basketText: {
    color: COLORS.mainColor,
    fontSize: 18,
    fontWeight: "700",
  },
  basketTotal: {
    color: COLORS.mainColor,
    fontSize: 18,
    fontWeight: "700",
  },
});
