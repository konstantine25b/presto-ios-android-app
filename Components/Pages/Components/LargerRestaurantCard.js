import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
import COLORS from "../../Styles/colors";

// es aris ufro didi restaurant cardi romelic all restaurants pageze gvxvdeba

const LargerRestaurantCard = ({ props }) => {
  const navigation = useNavigation(); // am hookit chven onpressze gadavyavart titoeul restoranis pageze

  useLayoutEffect(() => {
    // es aris imitom ro header ar gamochndes  (ushnod)
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        width: "100%",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("EachRestaurant", {
            Id: props.id,
            Title: props?.title,
            MainImage: props?.images[0],
            Address: props?.address,
            Genre: props?.genre,
            ShortDescription: props?.description,
            Rating: props?.rating,
          });
        }}
        style={{
          backgroundColor: "white",
          margin: 4,
          borderRadius: 2,
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 140,
            height: 120,
            borderRadius: 2,
          }}
          source={{
            uri: props?.images ? props.images[0] : null,
          }}
        />
        <View
          style={{
            padding: 4,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              marginTop: 4,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {props?.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StarIcon
              style={{
                color: COLORS.mainColor,
                opacity: 0.7,
              }}
            />
            <Text>
              {props?.rating} . {props?.genre}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MapPinIcon />
            <Text
              style={{
                marginTop: 4,

                fontSize: 13,
              }}
            >
              Nearby . {props?.address}
            </Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default LargerRestaurantCard;
