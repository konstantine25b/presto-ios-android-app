import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasketWithIngredients,
} from "../../Features/BasketSlice";
import FoodCardLower from "./Components/FoodCardLower";
import FoodCardUpper from "./Components/FoodCardUpper";

const FoodCard = (props) => {
  // es aris tiroeuli kategoriis titoeuli foodis divis awyobis meqanizmi
  const { dishes } = props;

  const Id = dishes?.id; // aq titled gadavakete ise Id ewera
  const ApproxTime = dishes?.approxtime;
  const FoodImage = dishes?.image;
  const Title = dishes?.title;
  const Description = dishes?.description;
  const Price = dishes?.price;
  // const Ingredients = dishes?.ingredients;

  const [isPressed, setIsPressed] = useState(false); // amiti xdeba daechira tu ara imis kontroli

  const [sameIngredients, setSameIngredients] = useState([]);
  const items = useSelector((state) => selectBasketItemsWithId(state, Id)); // amis funqcia aris is rom basket itemsidan gvitxras romeli food ramdeni aqvs archeuli
 
  // console.log(1, items);
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
      <FoodCardUpper
        dishes={dishes}
        ApproxTime={ApproxTime}
        Price={Price}
        Description={Description}
        FoodImage={FoodImage}
      />

      {isPressed &&
        sameIngredients.map((item, index) => {
          return (
            <FoodCardLower
              key={index}
              index={index}
              item={item}
              removeItemFromBasket={removeItemFromBasket}
              addItemToBasket={addItemToBasket}
            />
          );
        })}
    </>
  );
};

export default FoodCard;
