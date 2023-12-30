import React from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/outline";
import COLORS from "../Styles/colors";
import LargerRestaurantCard from "./Components/LargerRestaurantCard";
import { API } from "../../Processing/PrestoAPI";
import { useQuery } from "react-query";

const handleGetRestaurants = async () => {
  const allRestaurants = await API.getRestaurants();
  return JSON.parse(JSON.stringify(allRestaurants));
};

const AllRestaurantsPage = () => {
  const navigation = useNavigation();

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery(["confirmedOrders"], () => handleGetRestaurants(), {
    keepPreviousData: true,
    staleTime: 1000 * 300, // 5 mins
    onError: (error) => {
      console.log("Error getting All Restaurants:", error);
    },
  });

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "gray",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            paddingBottom: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "lightgray",
              padding: 10,
              borderRadius: 22.5,
              zIndex: 12,
            }}
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={25} color={COLORS.mainColor} />
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={{
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                backgroundColor: "lightgray",
                flex: 0.8,
                borderRadius: 20,
              }}
            >
              <MagnifyingGlassCircleIcon style={{ color: "gray" }} />
              <Text style={{ paddingLeft: 5, color: "gray" }}>
                Restaurants and Cuisines
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 4,
              justifyContent: "space-between",
              color: "black",
            }}
          ></View>
        </View>

        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.mainColor} />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
          </View>
        ) : isError ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "red", fontSize: 16 }}>
              Error loading data.
            </Text>
            <Text>Please try again later.</Text>
          </View>
        ) : (
          <FlatList
            data={restaurants}
            contentContainerStyle={{ paddingBottom: 150 }}
            renderItem={({ item }) => <LargerRestaurantCard props={item} />}
            keyExtractor={(item) => item.title}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default AllRestaurantsPage;
