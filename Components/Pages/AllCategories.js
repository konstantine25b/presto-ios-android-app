import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import LargerCategoriesCard from "./AllCategoriesComponents/LargerCategoriesCard";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import COLORS from "../Styles/colors";

// es aris page sadac aris yvela kategoriis chamonatvali
const AllCategories = () => {
  const navigation = useNavigation();
  const {
    params: {
      // es parametrebi und mivigot backendidan
      props,
    },
  } = useRoute(); // am metodit destruqturacias vuketebt props ( am shemtxvevashi useNavigate hookidan migebul infos)

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
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: COLORS.mainColor,
                  fontWeight: "bold",
                }}
              >
                All Categories
              </Text>
            </View>
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
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 150,
            alignSelf: "center",
            justifyContent: "space-around",
          }}
          renderItem={({ item }) => <LargerCategoriesCard props={item} />}
          keyExtractor={(item) => item.Type}
        />
      </SafeAreaView>
    </>
  );
};

export default AllCategories;
