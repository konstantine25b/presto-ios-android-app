import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LargerCategoriesCard from "./AllCategoriesComponents/LargerCategoriesCard";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import COLORS from "../Styles/colors";
import { getCategoriesList } from "../../Processing/PrestoAPI";
import { useQuery } from "react-query";

// es aris page sadac aris yvela kategoriis chamonatvali
const gettingCategories = () => {
  // aqedan kategoriebi momaqvs
  let categories = getCategoriesList();
  return categories;
};
const AllCategories = () => {
  const navigation = useNavigation();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery(["allCategories"], () => gettingCategories(), {
    keepPreviousData: true,
    staleTime: 1000 * 300, // 5 mins
    onError: (error) => {
      console.log("Error getting All Restaurants:", error);
    },
  });

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

        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.mainColor} />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
          </View>
        ) : isError ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "red", fontSize: 16 }}>
              Error loading data.
            </Text>
            <Text>Please try again later.</Text>
          </View>
        ) : (
          <FlatList // amit chven vawyobt bevr titoeul foodze divs
            data={categories}
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: 150,
              alignSelf: "center",
              justifyContent: "space-around",
            }}
            renderItem={({ item }) => <LargerCategoriesCard props={item} />}
            keyExtractor={(item) => item.Type}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default AllCategories;
