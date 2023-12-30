import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";

import COLORS from "../../Styles/colors";
import CategoriesRowCard from "./CategoriesRowCard";
import { getCategoriesList } from "../../../Processing/PrestoAPI";
import { useQuery } from "react-query";

// ess aris homepageze roa categories restaurantis cardebis mwkrivi
const gettingCategories = () => {
  // aqedan kategoriebi momaqvs
  let categories = getCategoriesList();
  return categories;
};
function FuturedRows({ title, description }) {
  const navigation = useNavigation(); // am hookit chven onpressze gadavyavart titoeul restoranis pageze

  const {
    data: categories,
    
  } = useQuery(["allCategories"], () => gettingCategories(), {
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
            navigation.navigate("AllCategories");
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
            All Categories
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
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0, paddingVertical: 5 }}
        renderItem={({ item }) => <CategoriesRowCard props={item} />}
        keyExtractor={(item) => item.Type}
      />
    </View>
  );
}

export default FuturedRows;
