import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasketWithIngredients,
} from "../../Features/BasketSlice";
import COLORS from "../../Styles/colors";

export default function Items({ items, newGroupedItemsInBasket, index }) {
  const dispatch = useDispatch();
  const removeItemFromBasket = (Id, unCheckedIngredients) => {
    dispatch(removeFromBasketWithIngredients({ Id, unCheckedIngredients }));
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {items[1]} x
          </Text>
          <Image
            style={{
              marginLeft: 5,
              width: 80,
              height: 80,
            }}
            source={{
              uri: items[0]?.FoodImage,
            }}
          />
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
                marginLeft: 7,
                fontSize: 17,
                fontWeight: "500",
                paddingBottom: 5,
              }}
            >
              {items[0]?.Title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "gray",
                fontWeight: "500",
                marginLeft: "2%",
              }}
            >
              {items[0]?.unCheckedIngredients?.map((item, index) => {
                return index == 0 ? "Without: " + item : " , " + item;
              })}
            </Text>
          </View>
        </View>

        <Text>{items[0]?.Price} ₾</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            removeItemFromBasket(items[0].Id, items[0].unCheckedIngredients);
          }}
        >
          <MinusCircleIcon
            size={40}
            color={items.length > 0 ? COLORS.mainColor : "gray"}
            style={{
              marginRight: 10,
            }}
          />
          <Text>Remove</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            dispatch(
              addToBasket({
                Id: items[0]?.Title,
                ApproxTime: items[0]?.ApproxTime,
                FoodImage: items[0]?.FoodImage,
                Title: items[0]?.Title,
                Description: items[0]?.Description,
                Price: items[0]?.Price,
                unCheckedIngredients:
                  newGroupedItemsInBasket[index][0]?.unCheckedIngredients,
              })
            );
          }}
        >
          <Text>Add</Text>
          <PlusCircleIcon
            size={40}
            color={items.length > 0 ? COLORS.mainColor : "gray"}
            style={{
              marginRight: 10,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}
