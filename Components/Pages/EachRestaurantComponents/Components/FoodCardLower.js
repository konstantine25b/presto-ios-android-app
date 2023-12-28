import { View, Text, Pressable } from "react-native";
import React from "react";
import COLORS from "../../../Styles/colors";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";


export default function FoodCardLower({ index, item, removeItemFromBasket , addItemToBasket}) {
  return (
    <View
      style={{
        marginLeft: "3%",
        marginRight: "3%",
        backgroundColor: "lightgray",
        padding: 5,
        marginTop: 2,
        borderRadius: 1,
        borderBottomColor: "lightgray",
        borderBottomWidth: 0.8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingHorizontal: "2%",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {item[1]}x
        </Text>
        <View
          style={{
            width: "60%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              paddingBottom: 2,
            }}
          >
            {" "}
            {item[0]?.Title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "gray",
              fontWeight: "500",
              marginLeft: "2%",
            }}
          >
            {item[0]?.unCheckedIngredients?.map((items, index) => {
              return index == 0 ? "Without: " + items : " , " + items;
            })}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
          }}
        >
          {" "}
          {item[0]?.Price} ₾
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          disabled={item[1] == 0 ? true : false} // es 0 ze minusis gilaks tishavs
          onPress={() => {
            removeItemFromBasket(item[0].unCheckedIngredients);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MinusCircleIcon
            size={30}
            color={item[1] > 0 ? COLORS.mainColor : "gray"}
            style={{}}
          />
          <Text style={{ fontSize: 12 }}>Remove</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            addItemToBasket(index);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 13 }}>Add</Text>
          <PlusCircleIcon size={30} color={COLORS.mainColor} style={{}} />
        </Pressable>
      </View>
    </View>
  );
}
