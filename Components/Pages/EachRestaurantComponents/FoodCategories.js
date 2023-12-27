import { Text, Image, Pressable, StatusBar } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Styles/colors";

const FoodCategories = (props) => {
  const { categories } = props;

  const navigation = useNavigation();
  return (
    <Pressable // aris patar divi razec restornis titoeul kategoriasd vantavsebt
      onPress={() => {
        // amit masze dacherisas gadavyavart amave kategoriis meniu listshi
        navigation.navigate("EachCategoryMenuPage", {
          dishes: categories?.dishes,
          categorieTitle: categories?.title,
        });
        StatusBar.setBarStyle("dark-content", true);
      }}
      style={{
        marginTop: 15,
        width: "94%",
        alignItems: "center",
        justifyContent: "space-between",
        height: 120,
        backgroundColor: COLORS.mainColor,
        flexDirection: "row",
        padding: 20,
        marginLeft: "3%",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "700",
        }}
      >
        {categories?.title}
      </Text>
      <Image
        style={{ width: 100, height: 100, borderRadius: 10 }}
        source={{ uri: categories?.image }}
      />
    </Pressable>
  );
};

export default FoodCategories;
