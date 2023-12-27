import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Styles/colors";

// es aris didi categories cardi romelic gvxvdeba eachCategories restaurant pageze

const CategoriesRowCard = ({ props }) => {
  // console.log(props)

  const navigation = useNavigation(); // am hookit chven onpressze gadavyavart titoeul restoranis pageze

  useLayoutEffect(() => {
    // es aris imitom ro header ar gamochndes  (ushnod)
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        width: "50%",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("EachCategoryRestaurantsPage", {
            props: props,
          });
        }}
        style={{
          width: "100%",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
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
