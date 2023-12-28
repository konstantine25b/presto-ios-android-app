import React from "react";
import { View, Text, Pressable } from "react-native";
import COLORS from "../../Styles/colors";

export default function LowerSide({
  BasketTotal,
  handleSubmitOrder,
}) {
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
            color: "lightgray",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Subtotal
        </Text>
        <Text
          style={{
            color: "lightgray",
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
            color: "lightgray",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Service Fee
        </Text>
        <Text
          style={{
            color: "lightgray",
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
          onPress={() => {
            handleSubmitOrder();
          }}
          style={{
            backgroundColor: "white",
            width: "85%",
            padding: 10,
            borderRadius: 8,
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
            Confirm Order
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
