import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ArrowLeftIcon } from "react-native-heroicons/outline";

import { API } from "../../../Processing/PrestoAPI";
import LargerRestaurantCard from "../Components/LargerRestaurantCard";
import COLORS from "../../Styles/colors";

// es aris titoeluli categoriis page sadac aris amave kategoriis restornebi

const EachCategoryPage = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const {
    params: {
      // es parametrebi und mivigot backendidan
      props,
    },
  } = useRoute(); // am metodit destruqturacias vuketebt props ( am shemtxvevashi useNavigate hookidan migebul infos)

  useEffect(() => {
    const gettingRestaurantCategories = async () => {
      let arr1 = await API.getRestaurantsByTag(props.Type);

      setRestaurants(arr1);
    };
    gettingRestaurantCategories();
  }, []);

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

        <FlatList // amit chven vawyobt bevr titoeul foodze divs
          data={restaurants}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item }) => <LargerRestaurantCard props={item} />}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </>
  );
};

export default EachCategoryPage;
