import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import COLORS from "../../Styles/colors";
import RestaurantCard from "./RestaurantCard";
import { API } from "../../../Processing/PrestoAPI";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";

// ess aris homepageze roa futured near restaurantis cardebis mwkrivi
const handleGetTopRestaurants = async () => {
  const restaurants = await API.getTopRestaurants(3);
  return JSON.parse(JSON.stringify(restaurants));
};
function FuturedRows({ title, description }) {
 
  const navigation = useNavigation(); 

  const {
    data: restaurants,
   
  } = useQuery(["topRestaurants"], () => handleGetTopRestaurants(), {
    keepPreviousData: true,
    staleTime: 1000 * 300, // 5 mins
    onError: (error) => {
      console.log("Error getting All Restaurants:", error);
    },
  });

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
