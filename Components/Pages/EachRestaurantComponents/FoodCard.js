import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Styles/colors";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasketWithIngredients,
} from "../../Features/BasketSlice";

const FoodCard = (props) => {
  // es aris tiroeuli kategoriis titoeuli foodis divis awyobis meqanizmi
  const { dishes } = props;

  const Id = dishes?.id; // aq titled gadavakete ise Id ewera
  const ApproxTime = dishes?.approxtime;
  const FoodImage = dishes?.image;
  const Title = dishes?.title;
  const Description = dishes?.description;
  const Price = dishes?.price;
  const Ingredients = dishes?.ingredients;

  const [isPressed, setIsPressed] = useState(false); // amiti xdeba daechira tu ara imis kontroli

  const [sameIngredients, setSameIngredients] = useState([]);

  const items = useSelector((state) => selectBasketItemsWithId(state, Id)); // amis funqcia aris is rom basket itemsidan gvitxras romeli food ramdeni aqvs archeuli

  const dispatch = useDispatch();

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

  const addItemToBasket = (i) => {
    dispatch(
      addToBasket({
        Id,
        ApproxTime,
        FoodImage,
        Title,
        Description,
        Price,
        unCheckedIngredients: sameIngredients[i][0].unCheckedIngredients,
      })
    );
  };
  const removeItemFromBasket = (unCheckedIngredients) => {
    if (!items.length > 0) return;
    dispatch(removeFromBasketWithIngredients({ Id, unCheckedIngredients }));
  };

  const navigation = useNavigation();
  useEffect(() => {
    setIsPressed(items.length > 0 ? true : false);
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
            )
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
    setSameIngredients(differnetItemsArr);
  }, [items.length]);

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("EachFoodDetailedInfoModule", {
            dishes: dishes,
          });
        }}
        style={{
          width: "98%",
          marginLeft: "1%",
          marginTop: 15,

          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            //es marcxniv sataurs da agweras aketebs
            width: "55%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              paddingBottom: 10,
            }}
          >
            {dishes?.title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "gray",
            }}
          >
            {Description}
          </Text>
        </View>
        <View // es marjvena mxares rac aris yvelafers
          style={{
            alignItems: "stretch",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri: FoodImage,
            }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              marginTop: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 11,
                  color: "gray",
                }}
              >
                Aprox. Time:{" "}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                }}
              >
                {ApproxTime}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 11,
                  color: "gray",
                }}
              >
                Price:{" "}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                }}
              >
                {Price} ₾
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {isPressed &&
        sameIngredients.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginLeft: "3%",
                marginRight: "3%",
                backgroundColor: "#e1d6cf",
                padding: 5,
                marginTop: 2,
                borderRadius: 1,
                borderBottomColor: "lightgray",
                borderBottomWidth: 0.8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  paddingHorizontal: "2%",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {item[1]}x
                </Text>
                <View
                  style={{
                    width: "60%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "600",
                      paddingBottom: 2,
                    }}
                  >
                    {" "}
                    {item[0]?.Title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "gray",
                      fontWeight: "500",
                      marginLeft: "2%",
                    }}
                  >
                    {item[0]?.unCheckedIngredients?.map((items, index) => {
                      return index == 0 ? "Without: " + items : " , " + items;
                    })}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {" "}
                  {item[0]?.Price} ₾
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  disabled={item[1] == 0 ? true : false} // es 0 ze minusis gilaks tishavs
                  onPress={() => {
                    removeItemFromBasket(item[0].unCheckedIngredients);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MinusCircleIcon
                    size={30}
                    color={item[1] > 0 ? COLORS.mainColor : "gray"}
                    style={{}}
                  />
                  <Text style={{ fontSize: 12 }}>Remove</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    addItemToBasket(index);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 13 }}>Add</Text>
                  <PlusCircleIcon
                    size={30}
                    color={COLORS.mainColor}
                    style={{}}
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
    </>
  );
};

export default FoodCard;
