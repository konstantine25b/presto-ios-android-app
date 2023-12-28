import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../Processing/PrestoAPI";
import COLORS from "../../Styles/colors";


export default function EachOrderDetails({ route }) {
  const { order } = route.params?.state || {};
  const navigation = useNavigation();

  const [fetchedDishes, setFetchedDishes] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [eachOrder, setEachOrder] = useState();

  // Calculate the time remaining based on the request date
  function calculateTimeRemaining() {
    const requestDate = new Date(order?.orderRequestedDate);
    const currentTime = new Date();
    const timeDifference = requestDate - currentTime;
    return Math.max(timeDifference, 0);
  }

  const cancelingOrder = async (orderId) => {
    // Ask the user for confirmation

    const cancel = API.cancelOrder(orderId);
    // console.log(cancel, orderId);
    cancel
      .then((result) => {
        // 'result' contains the resolved value of the Promise
        if (result) {
          // Filter out the canceled order from orders state
          console.log("order canceled");
          navigation.goBack();
        } else {
          console.log("Order cancellation failed.");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the Promise execution
        console.error(error);
      });
  };

  async function getDishesArr(order) {
    const eachOrder = await API.getOrderById(order.id);
    setEachOrder(eachOrder);

    const arr = eachOrder?.orderItems;
    const fetchedDishes = [];

    for (let i = 0; i < arr.length; i++) {
      const dish = await API.getDishById(arr[i].dish_id);
      fetchedDishes.push(dish);
      setFetchedDishes([...fetchedDishes]); // Update the state with the new dish
    }
    console.log(fetchedDishes);
  }

  useEffect(() => {
    getDishesArr(order);

    const requestDate = new Date(order?.orderRequestedDate);
    const updateRemainingTime = () => {
      const currentTime = new Date();
      const timeDifference = requestDate - currentTime;
      setTimeRemaining(Math.max(timeDifference, 0));
    };

    updateRemainingTime();

    const timer = setInterval(updateRemainingTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [order]);

  // Format the time remaining for display
  function formatTimeRemaining() {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }

  let statusStyle = { color: "blue" };
  let cancelButtonStyle = {
    backgroundColor: "red",
    color: "#fff",
  };
  let cancelButtonText = "Cancel Order";

  let isCancelButtonActive = true;
  if (timeRemaining <= 0) {
    statusStyle = { color: "red" };
    cancelButtonStyle = { backgroundColor: "black", color: "#fff" };
    cancelButtonText = "Order Expired";

    isCancelButtonActive = false;
  } else if (timeRemaining < 1800000) {
    // Less than 30 minutes (1800000 milliseconds)
    statusStyle = { color: "blue" };
    cancelButtonStyle = { backgroundColor: "black", color: "#fff" };
    cancelButtonText = "Cancellation Not Possible";

    isCancelButtonActive = false;
  } else if (timeRemaining <= -86400000) {
    // Expired for more than 1 day (86400000 milliseconds)
    statusStyle = { color: "red" };
    cancelButtonStyle = { backgroundColor: "black", color: "#fff" };
    cancelButtonText = "Order Expired";

    isCancelButtonActive = false;
  }

  // es aris konkretulad order statusistvis
  let statusStyle1 = { color: "blue" };
  let statusText = "Order is pending";
  if (order?.orderState === 0) {
    statusStyle1 = { color: "orange" };
    statusText = "Order is pending";
  } else if (order.orderState === 1) {
    statusStyle1 = { color: "blue" };
    statusText = "Order is confirmed";
  } else if (order?.orderState === 2) {
    statusStyle1 = { color: "red" };
    statusText = "Restaurant denied the order";
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.orderDetailsContainer}>
        <Text style={styles.orderTitle}>Order Details</Text>

        <View style={styles.orderItem}>
          <Text>
            <Text style={styles.boldText}>Order ID:</Text> {order?.id}
          </Text>
        </View>
        <View style={styles.orderItem}>
          <Text>
            <Text style={styles.boldText}>Order Status:</Text>{" "}
            <Text style={statusStyle1}>{statusText}</Text>
          </Text>
        </View>
        <View style={styles.orderItem}>
          <Text>
            <Text style={styles.boldText}>Table Number:</Text>{" "}
            {order?.orderTable > 0 ? order.orderTable : "None"}
          </Text>
        </View>
        <View style={styles.orderItem}>
          <Text>
            <Text>Order Request Date:</Text>{" "}
            {new Date(order?.orderRequestedDate).toLocaleString()}
          </Text>
        </View>
        <View style={styles.orderItem}>
          <Text>
            <Text>Order Sent Date:</Text>{" "}
            {order?.orderSent
              ? new Date(order?.orderSent).toLocaleString()
              : "Not sent yet"}
          </Text>
        </View>
        <View style={styles.orderItem}>
          <Text>
            <Text>Total Price:</Text> ₾{order?.totalPrice?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.orderItem}>
          <Text>
            <Text>Time Remaining:</Text>{" "}
            {timeRemaining < 1800000 ? (
              <Text style={{ color: "red" }}>{formatTimeRemaining()}</Text>
            ) : (
              <Text style={{ color: "blue" }}>{formatTimeRemaining()}</Text>
            )}
          </Text>
        </View>
        <View style={styles.orderItemContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Order Items:</Text>
          {fetchedDishes.map((dish, index) => (
            <View style={styles.orderItemDiv} key={index}>
              <View style={styles.orderItemText}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Item {index + 1}:</Text>{" "}
                  <Text>{dish ? dish?.title : "Unknown"}</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Notes:</Text>{" "}
                  <Text>
                    {eachOrder?.orderItems[index]?.notes || "No special notes"}
                  </Text>
                </Text>
              </View>
              <Image
                source={{
                  uri: dish ? dish?.image : "placeholder-image-url",
                }}
                style={styles.orderItemImage}
              />
            </View>
          ))}
        </View>
        <Pressable
          onPress={() => {
            if (isCancelButtonActive && timeRemaining > 0) {
              console.log(order.id);
              cancelingOrder(order?.id);
            }
          }}
          style={[styles.cancelOrderButton, cancelButtonStyle]}
          disabled={!isCancelButtonActive}
        >
          <Text style={{ color: "#fff" }}>{cancelButtonText}</Text>
        </Pressable>
        <Text style={styles.cancelationInfo}>
          Order cannot be canceled if less than 30 minutes remaining
        </Text>
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  orderDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    height: "100%",
  },
  orderTitle: {
    fontSize: 24,
    color: COLORS.mainColor,
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 10,
    fontSize: 18,
    backgroundColor: "white",
    borderColor: COLORS.mainColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  orderItemContainer: {
    marginTop: 20,
    width: "80%",
    backgroundColor: "white",
    borderColor: COLORS.mainColor,
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  orderItemDiv: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orderItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.mainColor,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    marginTop: 10,
    color: COLORS.mainColor,
  },
  orderNotes: {
    fontSize: 16,
    padding: 5,
    marginTop: 10,
  },
  remainingTimeContainer: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  timeRemaining: {
    fontSize: 24,
    marginLeft: 10,
  },
  cancelationInfo: {
    fontSize: 16,
    padding: 5,
    marginTop: 5,
    color: "red",
  },
  cancelOrderButton: {
    backgroundColor: "#ff0000",
    color: "white",
    padding: 10,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
    elevation: 5, // For Android shadow
  },
});
