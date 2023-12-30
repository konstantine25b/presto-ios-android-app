import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { API } from "../../../Processing/PrestoAPI";
import LargerRestaurantCard from "../Components/LargerRestaurantCard";
import COLORS from "../../Styles/colors";
import { useQuery } from "react-query";

// es aris titoeluli categoriis page sadac aris amave kategoriis restornebi
const gettingRestaurantCategories = async (Type) => {
  let arr1 = await API.getRestaurantsByTag(Type);

  return arr1;
};
const EachCategoryPage = () => {
  const navigation = useNavigation();

  const {
    params: {
      // es parametrebi und mivigot backendidan
      props,
    },
  } = useRoute(); // am metodit destruqturacias vuketebt props ( am shemtxvevashi useNavigate hookidan migebul infos)

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery(["restaurants"], () => gettingRestaurantCategories(props.Type), {
    keepPreviousData: true,
    staleTime: 1000 * 2, // 5 mins
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
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 10,
            paddingHorizontal: 20,
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
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  color: COLORS.mainColor,
                  fontWeight: "500",
                }}
              >
                {props.Type}
              </Text>
            </View>
          </View>
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
        ) : 
       (<FlatList // amit chven vawyobt bevr titoeul foodze divs
          data={restaurants}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item }) => <LargerRestaurantCard props={item} />}
          keyExtractor={(item) => item.title}
        />)}
      </SafeAreaView>
    </>
  );
};

export default EachCategoryPage;
