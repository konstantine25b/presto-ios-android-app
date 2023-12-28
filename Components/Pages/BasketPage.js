import {
  View,
  Text,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../Features/RestaurantSlice";
import { selectBasketItems } from "../Features/BasketSlice";
import COLORS from "../Styles/colors";
import LowerSide from "./BasketPageComponents/LowerSide";
import Items from "./BasketPageComponents/Items";

// es aris basket page romelic basketze ro daacher aq agmochndebi

const BasketPage = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);

  const [newGroupedItemsInBasket, setNewGroupedItemsInBasket] = useState([]);

  function areEqual(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }

        return false;
      });
    }

    return false;
  }
  useEffect(() => {
    let differnetItemsArr = [];
    for (let i = 0; i < items.length; i++) {
      if (i == 0) {
        differnetItemsArr.push([items[0], 1]);
      }

      if (i > 0) {
        let isAlreadyIn = false;
        for (let j = 0; j < differnetItemsArr.length; j++) {
          if (
            areEqual(
              items[i].unCheckedIngredients,
              differnetItemsArr[j][0].unCheckedIngredients
            ) &&
            differnetItemsArr[j][0].Title == items[i].Title
          ) {
            differnetItemsArr[j][1]++;
            isAlreadyIn = true;
            break;
          }
        }
        if (isAlreadyIn == false) {
          differnetItemsArr.push([items[i], 1]);
        }
      }
    }
    setNewGroupedItemsInBasket(differnetItemsArr);
  }, [items.length]);

  StatusBar.setBarStyle("dark-content", true);

  return (
    <>
      <LowerSide />

      <SafeAreaView>
        <View>
          <View
            style={{
              height: 80,

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.mainColor,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "500",
                  color: COLORS.mainColor,
                }}
              >
                Basket items
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                {restaurant.Title}
              </Text>
            </View>
            <Pressable
              style={{
                width: 45,
                backgroundColor: "lightgray",
                padding: 10,
                borderRadius: 22.5,
                marginTop: 28,
                position: "absolute",
                zIndex: 1,
                top: -21,
                left: 15,
              }}
              onPress={navigation.goBack}
            >
              <ArrowLeftIcon size={25} color={COLORS.mainColor} />
            </Pressable>
          </View>

          <ScrollView>
            <View
              style={{
                paddingBottom: 410,
              }}
            >
              {newGroupedItemsInBasket.map((items, index) => {
                return (
                  <Items
                    key={index}
                    items={items}
                    newGroupedItemsInBasket={newGroupedItemsInBasket}
                    index={index}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BasketPage;
