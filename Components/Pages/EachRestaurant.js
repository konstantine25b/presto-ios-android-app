import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
} from "react-native";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
} from "react-native-heroicons/solid";

import { useDispatch, useSelector } from "react-redux";

import COLORS from "../Styles/colors";
import { API } from "../../Processing/PrestoAPI";
import { selectBasketItems } from "../Features/BasketSlice";
import { setRestaurant } from "../Features/RestaurantSlice";
import OrderNotification from "./Components/OrderNotification";
import Basket from "./Components/Basket";
import FoodCategories from "./EachRestaurantComponents/MenuCategories";

// es aris titoueli restornis page sadac sachmlis tipebia daxarisxebuli

const EachRestaurant = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showView, setShowView] = useState(false);
  const dispatch = useDispatch();

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

  // es aris titoeuli restornis page anu ert ert restorans ro daacher aq shemogiyvans
  const {
    params: {
      // es parametrebi und mivigot backendidan
      Id,
      Title,
      MainImage,
      Address,
      Genre,
      ShortDescription,
      Rating,
    },
  } = useRoute(); // am metodit destruqturacias vuketebt props ( am shemtxvevashi useNavigate hookidan migebul infos)

  const [restInfo, setRestInfo] = useState();
  // const [restaurantInfo, setRestaurantInfo] = useState([]); // amit vayenebt konkretuli restoarnis informacias

  const items = useSelector((state) => selectBasketItems(state)); // amit xdeba yvela itemsis amogeba basketidan ( gvchirdeba ro mati raodenoba gavigot)
  const navigation = useNavigation(); // es huki qmnis navigacias

  const handleGetRestaurantByTitle = async (restaurantTitle) => {
    // es davamate 10 oct
    const restaurantByTitle = await API.getRestaurantByTitle(restaurantTitle);
    // console.log(restaurantByTitle)
    setRestInfo(JSON.parse(JSON.stringify(restaurantByTitle)));
  };
  useLayoutEffect(() => {
    // es aris imitom ro header ar gamochndes  (ushnod)
    navigation.setOptions({
      headerShown: false,
    });
    StatusBar.setBarStyle("dark-content", true); // amit vashavebt status bars
    const gettingRestaurantsInfo = async () => {
      // am metodit mogvaqvs yvela restorani  da vsetavt mas reduxshi

      await handleGetRestaurantByTitle(Title);
    };
    gettingRestaurantsInfo();
  }, []);
  useEffect(() => {
    dispatch(
      setRestaurant({
        // am funqciit vagebinebt romeli restornidan vukvetavt
        Id,
        Title,
        MainImage,
        Address,
        Genre,
        ShortDescription,
        Rating,
      })
    ),
      [dispatch];
  }, [Id, dispatch]);

  return (
    <>
      {items.length > 0 ? <Basket theme={"light"} /> : null}

      {scrollOffset < 100 && <OrderNotification />}

      {scrollOffset < 100 && (
        <Pressable // es aris ukan gadasvlis gilaki
          style={{
            position: "absolute",
            marginTop: 50,
            marginLeft: 15,
            top: 0,
            backgroundColor: "lightgray",
            padding: 10,
            borderRadius: 22.5,
            zIndex: 1,
          }}
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon size={25} color={COLORS.mainColor} />
        </Pressable>
      )}

      {showView && (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            padding: 5,
            backgroundColor: COLORS.mainColor,
            width: "100%",
            height: 100,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingTop: 50,
          }}
        >
          <Pressable onPress={navigation.goBack}>
            <ArrowLeftIcon size={25} color="white" />
          </Pressable>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {restInfo.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StarIcon color="orange" opacity={0.7} size={22} />
            <Text
              style={{
                color: "white",
                fontSize: 14,
                paddingLeft: 4,
              }}
            >
              {restInfo.rating}
            </Text>
          </View>
        </View>
      )}

      <ScrollView
        style={{
          backgroundColor: "white",
          position: "relative",
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image // es aris ukana fonze background image roa eg
            source={{
              uri: restInfo?.images[0],
            }}
            style={{
              width: "100%",
              height: 220,
              backgroundColor: COLORS.mainColor,
              padding: 4,
            }}
          />
        </View>
        <View // aq aris agwera reitingis da adgilmdebareobis
          style={{
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <View style={{ padding: 14 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: COLORS.mainColor,
              }}
            >
              {restInfo?.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <StarIcon color="orange" opacity={0.7} size={22} />
                <Text>
                  {restInfo?.rating} . {restInfo?.genre}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MapPinIcon color={COLORS.mainColor} opacity={0.8} size={22} />
              <Text>{restInfo?.address}</Text>
            </View>
            <Text
              style={{
                color: "gray",
                marginTop: 10,
              }}
            >
              {restInfo?.description}
            </Text>
          </View>
        </View>
        <View // es aris menu ro weria eg
          style={{
            borderBottomColor: COLORS.mainColor,
            borderBottomWidth: 1,
            borderTopColor: COLORS.mainColor,
            borderTopWidth: 1,
            justifyContent: "center",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              padding: 13,

              fontWeight: "bold",
              fontSize: 35,
              color: COLORS.mainColor,
            }}
          >
            Menu
          </Text>
        </View>

        <View
          style={{
            paddingBottom: 130,
          }}
        >
          {restInfo?.categories?.map(
            (
              item // am metodit gadavurbent yvea categories elements da vawyobt matgan FoodCategories componentebs (ra kategoriebic aqvs restorans)
            ) => (
              <FoodCategories key={item.title} categories={item} />
            )
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default EachRestaurant;
