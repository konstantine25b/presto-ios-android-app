import { Text, View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { clearBasket } from "../Features/BasketSlice";

const SuccessOrder = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    dispatch(clearBasket());
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.successPageContainer}>
        <Text style={styles.successIcon}>&#10003;</Text>
        <Text style={styles.successMessage}>Order Confirmed!</Text>
        <Text>Your order has been successfully placed.</Text>

        <Pressable
          style={styles.seeYourOrderButton}
          onPress={() => {
            navigation.navigate("Order");
          }}
        >
          <Text style={styles.buttonText}>See Your Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  successPageContainer: {
    alignItems: "center",
    padding: 20,
  },
  successIcon: {
    fontSize: 48,
    color: "#007bff",
  },
  successMessage: {
    fontSize: 24,
    color: "#007bff",
  },
  seeYourOrderButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SuccessOrder;
