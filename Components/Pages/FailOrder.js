import { Text, View, Pressable, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FailOrder = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.failurePageContainer}>
        <Text style={styles.failureIcon}>&#10060;</Text>
        <Text style={styles.failureMessage}>Order Failed!</Text>
        <Text>Sorry, there was an issue processing your order.</Text>
        <Pressable
          style={styles.goBackButton}
          onPress={() => {
            navigation.navigate("BasketPage");
          }}
        >
          <Text style={styles.buttonText}>Go Back to Basket</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  failurePageContainer: {
    alignItems: "center",
    padding: 20,
  },
  failureIcon: {
    fontSize: 48,
    color: "#ff0000",
  },
  failureMessage: {
    fontSize: 24,
    color: "#ff0000",
  },
  goBackButton: {
    backgroundColor: "#ff0000",
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default FailOrder;
