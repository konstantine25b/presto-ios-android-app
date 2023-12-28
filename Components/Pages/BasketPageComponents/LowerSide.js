import { View, Text, Pressable } from "react-native";
import React from "react";
import COLORS from "../../Styles/colors";
import { useSelector } from "react-redux";
import { selectBasketTotal } from "../../Features/BasketSlice";
import { useNavigation } from "@react-navigation/native";

export default function LowerSide() {
  const BasketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: COLORS.mainColor,
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Subtotal
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {BasketTotal} ₾
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: COLORS.mainColor,
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Service Fee
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {10} ₾
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: COLORS.mainColor,
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Total
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          {BasketTotal + 10} ₾
        </Text>
      </View>
      <View
        style={{
          paddingBottom: 50,
          padding: 10,
          backgroundColor: COLORS.mainColor,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("ConfirmPage")}
          style={{
            backgroundColor: "white",
            width: "70%",
            padding: 10,
            borderRadius: 4,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.mainColor,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Go to Payment
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
