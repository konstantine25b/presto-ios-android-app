import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import COLORS from "../../Styles/colors";
import RestaurantCard from "./RestaurantCard";
import { API } from "../../../Processing/PrestoAPI";
import { useNavigation } from "@react-navigation/native";

// ess aris homepageze roa futured near restaurantis cardebis mwkrivi

function FuturedRows({ title, description }) {
  const [toprests, setToprests] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    // this way we get all rests from our presto database

    handleGetTopRestaurants();
  }, []);

  const handleGetTopRestaurants = async () => {
    const restaurants = await API.getTopRestaurants(2);
    setToprests(JSON.parse(JSON.stringify(restaurants)));
  };

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
            navigation.navigate("TopRestaurants");
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
            Top Restaurants
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
        data={toprests}
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
