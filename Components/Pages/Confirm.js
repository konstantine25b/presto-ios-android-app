import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../Features/BasketSlice";
import { selectRestaurant } from "../Features/RestaurantSlice";
import COLORS from "../Styles/colors";
import { API } from "../../Processing/PrestoAPI";
import LowerSide from "./ConfirmComponents/LowerSide";
import TableNum from "./ConfirmComponents/TableNum";
import TimeField from "./ConfirmComponents/TimeField";

const Confirm= () => {
  const navigation = useNavigation();
  const BasketTotal = useSelector(selectBasketTotal);
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);

  const [orderItems, setOrderItems] = useState([]);
  const [tableNum, setTableNum] = useState(-1);
  const [requestTime, setRequestTime] = useState();

  const onSubmit = (data) => {
    setTableNum(data.TableNumber);
  };
  const onSubmitTime = (data) => {
    setRequestTime(data.RequestTime);
  };

  /// axali

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < items.length; i++) {
      let eachItem = items[i];
      if (eachItem.unCheckedIngredients.length != 0) {
        let notes1 = "Without: ";
        for (let j = 0; j < eachItem.unCheckedIngredients.length - 1; j++) {
          notes1 = notes1 + eachItem.unCheckedIngredients[j] + ", ";
        }
        notes1 =
          notes1 +
          eachItem.unCheckedIngredients[
            eachItem.unCheckedIngredients.length - 1
          ];
        arr.push({
          dishId: eachItem.Id,
          notes: notes1,
        });
      } else {
        arr.push({
          dishId: eachItem.Id,
          notes: "",
        });
      }
    }
    setOrderItems(arr);
  }, [items]);

  const handleCreateOrder = async () => {
    let newTime;
    if (requestTime) {
      newTime = requestTime;
    } else {
      newTime = new Date();
      newTime.setMinutes(newTime.getMinutes() + 45);
    }

    if (tableNum <= 0) {
      const orderData = {
        restaurantId: restaurant.Id, // Replace with the desired restaurant ID
        orderRequestedDate: newTime,
        orderItems: orderItems,
      };
      // console.log(orderData);
      const createOrderSuccess = await API.createOrder(orderData);

      console.log(
        createOrderSuccess != -1
          ? "Order created successfully!"
          : "Order creation failed."
      );
      console.log(createOrderSuccess);
      createOrderSuccess != -1
        ? navigation.navigate("SuccessOrderPage")
        : navigation.navigate("FailOrderPage");
    } else {
      const orderData = {
        restaurantId: restaurant.Id, // Replace with the desired restaurant ID
        orderRequestedDate: newTime,
        orderItems: orderItems,
        tableID: tableNum,
      };

      const createOrderSuccess = await API.createOrder(orderData);

      console.log(
        createOrderSuccess != -1
          ? "Order created successfully!"
          : "Order creation failed."
      );
      console.log(createOrderSuccess);
      createOrderSuccess != -1
        ? navigation.navigate("SuccessOrderPage")
        : navigation.navigate("FailOrderPage");
    }
  };

  const handleSubmitOrder = () => {
    // console.log(restaurant);
    handleCreateOrder();
  };

  return (
    <>
      <LowerSide
        handleSubmitOrder={handleSubmitOrder}
        BasketTotal={BasketTotal}
      />
      <SafeAreaView>
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
              Order Now
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
              marginTop: 34,
              position: "absolute",
              zIndex: 1,
              top: -21,
              right: 10,
              padding: 5,
            }}
            onPress={navigation.goBack}
          >
            <XCircleIcon size={45} color={COLORS.mainColor} />
          </Pressable>
        </View>
        <ScrollView
          style={{
            paddingBottom: 410,
          }}
        >
          <TableNum onSubmit={onSubmit} />
          <TimeField onSubmitTime={onSubmitTime} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Confirm;
