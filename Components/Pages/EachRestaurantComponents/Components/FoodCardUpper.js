import { View, Text, Pressable,Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function FoodCardUpper({dishes , Description,ApproxTime, FoodImage, Price }) {
    const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EachFoodCardInfo", {
          dishes: dishes,
        });
      }}
      style={{
        width: "98%",
        marginLeft: "1%",
        marginTop: 15,

        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          //es marcxniv sataurs da agweras aketebs
          width: "55%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "black",
            paddingBottom: 10,
          }}
        >
          {dishes?.title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "gray",
          }}
        >
          {Description}
        </Text>
      </View>
      <View // es marjvena mxares rac aris yvelafers
        style={{
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{
            uri: FoodImage,
          }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 5,
          }}
        />
        <View
          style={{
            marginTop: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 11,
                color: "gray",
              }}
            >
              Aprox. Time:{" "}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              {ApproxTime}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 11,
                color: "gray",
              }}
            >
              Price:{" "}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              {Price} ₾
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
