import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import COLORS from "../../../Styles/colors";
import {
  CheckIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import {
  addToBasket,
  removeFromBasketWithIngredients,
} from "../../../Features/BasketSlice";
import { useDispatch } from "react-redux";

export default function EachCardInfoLower({
  FoodImage,
  Title,
  ApproxTime,
  Description,
  Price,
  setUnCheckedIngredients,
  unCheckedIngredients,
  Ingredients,
  itemCount,
  Id,
  items,
}) {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasketWithIngredients({ Id, unCheckedIngredients }));
  };
  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        Id,
        ApproxTime,
        FoodImage,
        Title,
        Description,
        Price,
        unCheckedIngredients: [...unCheckedIngredients], // Use spread operator to create a new array
      })
    );
  };
  return (
    <>
      <View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: FoodImage }}
            style={{
              width: "100%",
              height: 330,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "600",
              }}
            >
              {Title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                }}
              >
                {Price} ₾
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                }}
              >
                Aprox. Time:{" "}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                }}
              >
                {ApproxTime}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 0.7,
              borderBottomColor: COLORS.mainColor,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "gray",
              }}
            >
              {Description}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            {Ingredients?.map((ingredient, index) => {
              const [isChecked, setIsChecked] = useState(true);

              return (
                <View
                  key={index}
                  style={{
                    padding: 13,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setIsChecked(!isChecked);
                      if (isChecked == true) {
                        setUnCheckedIngredients([
                          ...unCheckedIngredients,
                          ingredient,
                        ]);
                      } else {
                        const removeIndex = unCheckedIngredients.findIndex(
                          (item) => item == ingredient
                        );
                        let newUnCheckedIngredients = [...unCheckedIngredients];
                        newUnCheckedIngredients.splice(removeIndex, 1);
                        setUnCheckedIngredients(newUnCheckedIngredients);
                      }

                      // console.log(unCheckedIngredients)
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "90%",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "500",
                      }}
                    >
                      {ingredient}
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderWidth: 2,
                        borderColor: COLORS.mainColor,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isChecked ? (
                        <CheckIcon
                          color="blue"
                          style={{ fontWeight: "900" }}
                          size={27}
                        />
                      ) : null}
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              padding: 4,
              borderRadius: 4,
              paddingBottom: 150,
            }}
          >
            <Pressable
              disabled={itemCount.current == 1 ? true : false} // es 0 ze minusis gilaks tishavs
              onPress={() => {
                removeItemFromBasket();
                itemCount.current = itemCount.current - 1;
              }}
            >
              <MinusCircleIcon
                size={40}
                color={itemCount.current > 1 ? COLORS.mainColor : "gray"}
                style={{
                  marginRight: 10,
                }}
              />
            </Pressable>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "600",
              }}
            >
              {itemCount.current}
            </Text>
            <Pressable
              onPress={() => {
                addItemToBasket();
                itemCount.current = itemCount.current + 1;
              }}
            >
              <PlusCircleIcon
                size={40}
                color={COLORS.mainColor}
                style={{
                  marginLeft: 10,
                }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
