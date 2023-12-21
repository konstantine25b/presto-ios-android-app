import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
import COLORS from "../../Styles/colors";

// es aris mtavar pageze ro gvxvdeba all resytaurant da futured restaurantsi cardebi

const RestaurantCard = ({ props }) => {
  const navigation = useNavigation(); // am hookit chven onpressze gadavyavart titoeul restoranis pageze

  useLayoutEffect(() => {
    // es aris imitom ro header ar gamochndes  (ushnod)
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          navigation.navigate("EachRestaurantPage", {
            Id: props?.id,
            Title: props?.title,
            MainImage: props?.images[0] ? props.images[0] : null,
            Address: props?.address,
            Genre: props?.genre,
            ShortDescription: props?.description,
            Rating: props?.rating,
          });
        }}
        style={{
          backgroundColor: "white",
          marginRight: 10,

          borderRadius: 20,
        }}
      >
        <Image
          style={{
            width: 220,
            height: 130,
            borderRadius: 20,
          }}
          source={{
            uri: props?.images[0] ? props.images[0] : null,
          }}
        />
        <View
          style={{
            padding: 4,
          }}
        >
          <Text
            style={{
              marginTop: 4,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {props.title}
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
              {props.rating} . {props.genre}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MapPinIcon />
            <Text style={{ fontSize: 13 }}>Nearby .</Text>
            {props?.address?.length < 20 ? (
              <Text style={{ fontSize: 11 }}>{props?.address}</Text>
            ) : (
              <Text style={{ fontSize: 11 }}>
                {props?.address?.substr(0, 20)}...
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default RestaurantCard;
