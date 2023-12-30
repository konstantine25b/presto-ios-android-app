import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import FuturedRows from "./HomeComponents/FuturedTopRows";
import FuturedAllRestaurantsRow from "./HomeComponents/FuturedAllRestaurantsRow";
import FuturedCategoriesRows from "./HomeComponents/FuturedCategoriesRow";
import { useNavigation } from "@react-navigation/native";
import {
  MagnifyingGlassCircleIcon,
  UserIcon,
  QrCodeIcon,
} from "react-native-heroicons/solid";
import COLORS from "../Styles/colors";

// es aris mtavari page
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      {/* header*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 5,
          paddingTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 4,
            color: "black",
          }}
        >
          <Pressable
            style={{
              backgroundColor: COLORS.mainColor,
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate("NewProfileScreen", {
                UserName: "Konstantine Bakhutashvili",
              });
            }}
          >
            {/* <Avatar  label="Konstantine Bakhutashvili" size={35} color="#622A0F"/> */}
            <UserIcon size={37} color="lightgray" />
          </Pressable>

          {/* <View style={{ paddingLeft: 10, color: "#622A0F" }}>
            <Text
              style={{
                color: "#622A0F",
                flexDirection: "row",
                fontWeight: "800",
                fontSize: 18,
                paddingBottom: 4,
              }}
            >
              DoOrder
            </Text>

           
          </View> */}
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("Search", {
              transition: "fade",
            })
          }
          style={{
            flexDirection: "row",
            padding: 5,
            alignItems: "center",
            backgroundColor: "lightgray",
            flex: 0.9,
            borderRadius: 20,
          }}
        >
          <MagnifyingGlassCircleIcon style={{ color: "gray" }} />
          <Text style={{ paddingLeft: 5, color: "gray" }}>
            Restaurants and Cuisines
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Qr")}>
          <QrCodeIcon size={40} color={COLORS.mainColor}></QrCodeIcon>
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderColor: "gray",
          justifyContent: "center",

          padding: 10,
        }}
      ></View>

      {/* body*/}
      <ScrollView
        style={{
          backgroundColor: "whitesmoke",
        }}
      >
        {/* featured rows*/}

        <View
          style={{
            paddingBottom: 150,
          }}
        >
          <FuturedRows
            title="Top Restaurants"
            description="Discover top-rated dining experiences"
          />
          <FuturedCategoriesRows
            title="Restaurant Categories"
            description="Taste from all around the world"
          />
          <FuturedAllRestaurantsRow
            title="All Restaurants"
            description="From A to Z"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
