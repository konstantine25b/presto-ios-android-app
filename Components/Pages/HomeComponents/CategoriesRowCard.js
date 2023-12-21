import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Styles/colors";

//es aris categoriebi ro weri homepagze magati cardi

const CategoriesRowCard = ({ props }) => {
  const navigation = useNavigation(); // am hookit chven onpressze gadavyavart titoeul restoranis pageze

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    // es aris imitom ro header ar gamochndes  (ushnod)
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          navigation.navigate("EachCategoryRestaurantsPage", {
            props: props,
          });
        }}
        style={{
          backgroundColor: "white",
          marginLeft: 10,
          borderRadius: 20,
        }}
      >
        <Image
          style={{
            width: 220,
            height: 160,
            borderRadius: 20,
            resizeMode: "cover",
          }}
          source={{
            uri: props.MainImage,
          }}
        />
        <View
          style={{
            padding: 4,
            position: "absolute",
            width: "100%",

            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              marginTop: 35,
              opacity: 0.8,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.mainColor,
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {props.Type}
            </Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default CategoriesRowCard;
