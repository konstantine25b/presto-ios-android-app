import React from "react";

import { View, ScrollView, Text, Image } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import COLORS from "../../Styles/colors";
import RestaurantCard from "./RestaurantCard";


// ess aris homepageze roa futured near restaurantis cardebis mwkrivi

function FuturedRows({ title, description, restaurants }) {
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
        <ArrowRightIcon
          style={{
            color: COLORS.mainColor,
          }}
        />
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
      <ScrollView
        style={{
          paddingTop: 4,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
      >
        {/* restaurant cards */}
        {restaurants.map((eachRestaurant) => {
          return <RestaurantCard key={eachRestaurant.id} props={eachRestaurant} />;
        })}
      </ScrollView>
    </View>
  );
}

export default FuturedRows;
