import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  ArrowLeftIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/outline";
import COLORS from "../Styles/colors";
import LargerRestaurantCard from "./AllRestaurantsComponents/LargerRestaurantCard";

// am pageze aris yvela restoranis chamonatvali
const AllRestaurantsPage = () => {
  const navigation = useNavigation();

  const {
    params: {
      // es parametrebi und mivigot backendidan
      props,
    },
  } = useRoute(); // am metodit destruqturacias vuketebt props ( am shemtxvevashi useNavigate hookidan migebul infos)

  console.log(props)
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
          <Pressable // es aris ukan gadasvlis gilaki
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
              onPress={() =>
                navigation.navigate("SearchPage", { props: props })
              }
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

        <FlatList // amit chven vawyobt bevr titoeul foodze divs
          data={props}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item }) => <LargerRestaurantCard  props={item} />}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </>
  );
};

export default AllRestaurantsPage;
