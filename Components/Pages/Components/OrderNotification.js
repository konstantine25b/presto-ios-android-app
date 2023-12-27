import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";


const OrderNotification = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the page where the user can see their order
    navigation.navigate("OrderPage");
  };

  return (
    <Pressable style={styles.shoppingCartButton} onPress={handlePress}>
      <ShoppingCartIcon width="24" height="24" color="#fff" />
      <Text style={styles.orderCountText}>
        see your orders
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shoppingCartButton: {
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 10,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  orderCountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default OrderNotification;