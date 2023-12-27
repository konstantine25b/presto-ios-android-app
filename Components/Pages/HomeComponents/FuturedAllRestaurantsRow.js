import React from "react";

import {
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Styles/colors";
import RestaurantCard from "./RestaurantCard";

// ess aris homepageze roa all restaurantis cardebis mwkrivi

function FuturedRows({ title, description, restaurants }) {
  const navigation = useNavigation(); // am hookit chven onpressze gadavyavart titoeul restoranis pageze

  return (
    <View>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
          paddingLeft: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
          onPress={() => {
            navigation.navigate("AllRestaurants", {
              props: restaurants,
            });
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            {" "}
            All Restaurants
          </Text>
          <ArrowRightIcon
            style={{
              color: COLORS.mainColor,
            }}
          />
        </Pressable>
      </View>

      <Text
        style={{
          paddingLeft: 15,
          fontSize: 12,
          color: "gray",
        }}
      >
        {description}
      </Text>

      <FlatList // amit chven vawyobt bevr titoeul foodze divs
        data={restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5 }}
        renderItem={({ item }) => <RestaurantCard props={item} />}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

export default FuturedRows;
