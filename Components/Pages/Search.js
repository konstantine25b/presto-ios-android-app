import {
  View,
  TextInput,
  Button,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { API } from "../../Processing/PrestoAPI";
import COLORS from "../Styles/colors";
import LargerRestaurantCard from "./Components/LargerRestaurantCard";

const Search = () => {
  const [searchedWord, setSearchedWord] = useState("");

  const [searchedRest, setSearchedRest] = useState();

  const handleSearchRestaurants = async (searchedWord) => {
    const searchedRest1 = await API.searchRestaurants(searchedWord);

    setSearchedRest(JSON.parse(JSON.stringify(searchedRest1)));
  };

  useEffect(() => {
    handleSearchRestaurants(searchedWord);
  }, [searchedWord]);

  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      productName: "",
    },
  });
  const onSubmit = (data) => {
    setSearchedWord(data.productName);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          borderBottomWidth: 0.3,
          borderColor: COLORS.mainColor,
          paddingBottom: 20,
        }}
      >
        <Pressable // es aris ukan gadasvlis gilaki
          style={{
            padding: 10,

            zIndex: 12,
          }}
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon size={25} color={COLORS.mainColor} />
        </Pressable>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          style={{ alignItems: "center" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                backgroundColor: "lightgray",
                width: "70%",
                borderRadius: 20,
              }}
            >
              <MagnifyingGlassCircleIcon style={{ color: "gray" }} />
              <TextInput
                style={{ paddingLeft: 5, color: "black", fontSize: 15 }}
                placeholder="Products And Restaurants"
                onBlur={onBlur}
                autoFocus={true}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="productName"
        />
        <Button
          color={COLORS.mainColor}
          title="Search"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <FlatList // amit chven vawyobt bevr titoeul foodze divs
        data={searchedRest}
        contentContainerStyle={{
          paddingBottom: 150,
          marginTop: 20,
          paddingVertical: 20,
          gap: 10,
          borderTopWidth: 0.7,
          borderColor: "black",
        }}
        renderItem={({ item }) => <LargerRestaurantCard props={item} />}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

export default Search;
