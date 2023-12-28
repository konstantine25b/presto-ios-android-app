import { SafeAreaView, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithIdAndIngredients,
} from "../../Features/BasketSlice";
import EachCardInfoUpper from "./Components/EachCardInfoUpper";
import EachCardInfoLower from "./Components/EachCardInfoLower";

const EachFoodCardInfo = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showView, setShowView] = useState(false);

  const handleScroll = (event) => {
    // amit vaketeb imas ro garkveul zomaze gamochndes view romelsac ukan daburunebis funqcia eqneba
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset > 100 && !showView) {
      setShowView(true);
    } else if (currentOffset <= 100 && showView) {
      setShowView(false);
    }
    setScrollOffset(currentOffset);
  };

  const {
    params: {
      // es parametrebi und mivigot backendidan
      dishes,
    },
  } = useRoute(); // am metodit destruqturacias vuketebt props ( am shemtxvevashi useNavigate hookidan migebul infos)

  const Id = dishes?.id;
  const ApproxTime = dishes?.approxtime;
  const Title = dishes?.title;
  const FoodImage = dishes?.image;
  const Description = dishes?.description;
  const Price = dishes?.price;
  const Ingredients = dishes?.ingredients;

  const itemCount = useRef(1); // es localurad am pageze ramden items nishnavs

  const [unCheckedIngredients, setUnCheckedIngredients] = useState([]);

  const items = useSelector((state) =>
    selectBasketItemsWithIdAndIngredients(state, Id, unCheckedIngredients)
  );

  const dispatch = useDispatch();
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
    <SafeAreaView
      style={{
        backgroundColor: "whitesmoke",
        height: "100%",
      }}
    >
      <EachCardInfoUpper
        scrollOffset={scrollOffset}
        showView={showView}
        Title={Title}
        addItemToBasket={addItemToBasket}
        itemCount={itemCount}
        dishes={dishes}
      />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <EachCardInfoLower
          FoodImage={FoodImage}
          Title={Title}
          ApproxTime={ApproxTime}
          Description={Description}
          Price={Price}
          setUnCheckedIngredients={setUnCheckedIngredients}
          unCheckedIngredients={unCheckedIngredients}
          Ingredients={Ingredients}
          itemCount={itemCount}
          Id={Id}
          items={items}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EachFoodCardInfo;
