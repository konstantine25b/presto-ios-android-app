import { View, Text, Pressable } from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../../Styles/colors";

export default function EachCardInfoUpper({
  scrollOffset,
  showView,
  Title,
  addItemToBasket,
  itemCount,
  dishes
}) {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        style={{
          marginTop: 34,
          position: "absolute",
          zIndex: 1,
          top: -21,
          right: 10,
          padding: 5,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          elevation: 4,
          backgroundColor: "lightgray",
          alignContent: "center",
          borderRadius: 50,
        }}
        onPress={navigation.goBack}
      >
        {scrollOffset < 100 && <XMarkIcon size={40} color={COLORS.mainColor} />}
      </Pressable>
      {showView && (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            padding: 5,
            backgroundColor: COLORS.mainColor,
            width: "100%",
            height: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {Title}
          </Text>
          <Pressable onPress={navigation.goBack}>
            <XMarkIcon size={40} color="white" />
          </Pressable>
        </View>
      )}
      <Pressable
        onPressIn={() => {
          addItemToBasket();
        }}
        onPressOut={navigation.goBack}
        style={{
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
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
        >
          Add {itemCount.current} item to the basket for{" "}
          {Number(dishes?.price) * Number(itemCount.current)} ₾
        </Text>
      </Pressable>
    </>
  );
}
