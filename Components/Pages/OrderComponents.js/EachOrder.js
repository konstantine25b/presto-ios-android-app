import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { API } from "../../../Processing/PrestoAPI";
import COLORS from "../../Styles/colors";

const EachOrder = ({
  order,
  cancelingOrder,
  navigation,
  timeRemaining,
  formatTime,
}) => {
  if (!order) {
    // Skip null or undefined orders
    return null;
  }

  const [restName, setRestName] = useState();
  const ID = order.restaurantId;

  const { data: restname } = useQuery(["restname", ID], () => getRestName(ID), {
    keepPreviousData: true,
    staleTime: 1000 * 3, // 3 secs

    onError: (error) => {
      console.log("Error fetching confirmed orders:", error);
    },
  });

  let getRestName = async (restId) => {
    let restName = await API.getRestaurantById(restId);

    return restName?.title;
  };

  useEffect(() => {
    setRestName(restname);
  }, [restname]);

  const remainingTime = timeRemaining[order.id] || 0;
  const timeFormatted = formatTime(Math.max(remainingTime, 0));

  // Order status styles
  let statusStyle = { color: "blue" };
  let statusText = "Order is pending";

  // Order state styles
  let statusStyle1 = { color: "blue" };

  if (order.orderState === 0) {
    statusStyle1 = { color: "orange" };
    statusText = "Order is Pending";
  } else if (order.orderState === 1) {
    statusStyle1 = { color: "blue" };
    statusText = "Order is confirmed";
  } else if (order.orderState === 2) {
    statusStyle1 = { color: "red" };
    statusText = "Restaurant denied the order";
  }

  let orderStatus = order.orderState;

  let cancelButtonStyle = {
    backgroundColor: "red",
    color: "#fff",
  };

  let cancelButtonText = "Cancel Order";
  let cancelationInfo = null;
  let isCancelButtonActive = true;

  if (remainingTime <= 0) {
    statusStyle = { color: "red" };
    cancelButtonStyle = { backgroundColor: "gray", color: "#fff" };
    cancelButtonText = "Order Expired";
    cancelationInfo = (
      <Text style={{ color: "red" }}>Order cannot be canceled</Text>
    );
    isCancelButtonActive = false;
  } else if (remainingTime < 1800000) {
    // Less than 30 minutes (1800000 milliseconds)
    statusStyle = { color: "blue" };
    cancelButtonStyle = { backgroundColor: "gray", color: "#fff" };
    cancelButtonText = "Cancellation Not Possible";
    cancelationInfo = (
      <Text style={{ color: "red" }}>
        Cancellation not possible if less than 30 minutes left
      </Text>
    );
    isCancelButtonActive = false;
  } else if (remainingTime <= -86400000) {
    // Expired for more than 1 day (86400000 milliseconds)
    statusStyle = { color: "red" };
    cancelButtonStyle = { backgroundColor: "gray", color: "#fff" };
    cancelButtonText = "Order Expired";
    cancelationInfo = (
      <Text style={{ color: "red" }}>Order cannot be canceled</Text>
    );
    isCancelButtonActive = false;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.orderContainer,
        {
          borderColor:
            orderStatus === 0
              ? "orange"
              : orderStatus === 1
              ? "blue"
              : orderStatus === 2
              ? "red"
              : "mainColor",
          transform: [{ scale: pressed ? 1.03 : 1 }],
        },
      ]}
    >
      <Text style={styles.orderItem}>
        <Text style={{ fontWeight: "bold" }}>Restaurant Name: {restName}</Text>
      </Text>
      <Text style={styles.orderItem}>
        <Text style={{ fontWeight: "bold" }}>Order Status:</Text>{" "}
        <Text style={statusStyle1}>{statusText}</Text>
      </Text>
      <Text style={styles.orderItem}>
        <Text style={{ fontWeight: "bold" }}>
          Table Number: {order.orderTable > 0 ? order.orderTable : "None"}
        </Text>
      </Text>
      <Pressable
        style={styles.orderButton}
        onPress={() => {
          navigation.navigate("EachOrderPage", {
            state: { order: order },
          });
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          See Full Order Details
        </Text>
      </Pressable>
      <Text style={styles.orderItem}>
        <Text style={{ fontWeight: "bold" }}>Order Request Date:</Text>{" "}
        <Text style={statusStyle}>
          {new Date(order?.orderRequestedDate).toLocaleString()}
        </Text>
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>Time Remaining:</Text>{" "}
        <Text style={statusStyle}>{timeFormatted}</Text>
      </Text>
      <Text style={styles.orderItem}>
        <Text style={{ fontWeight: "bold" }}>Total Price:</Text> ₾
        {order?.totalPrice?.toFixed(2)}
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.cancelOrderButton,
          cancelButtonStyle,
          { transform: [{ scale: pressed ? 1.03 : 1 }] },
        ]}
        onPress={() => {
          if (isCancelButtonActive && remainingTime > 0) {
            cancelingOrder(order?.id);
          }
        }}
        disabled={!isCancelButtonActive}
      >
        <Text style={{ fontSize: 16 }}>{cancelButtonText}</Text>
      </Pressable>
      {cancelationInfo}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  orderDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 20,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.mainColor,
    marginTop: 20,
  },
  goBackDiv: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    zIndex: 2,
    marginTop: 40,
  },
  orderItem: {
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: COLORS.mainColor,
    padding: 10,
    borderRadius: 5,
  },
  orderButton: {
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: COLORS.mainColor,
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    marginTop: 10,
  },
  cancelOrderButton: {
    backgroundColor: "#ff0000",
    color: "white",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    cursor: "pointer",
  },
  orderNotes: {
    fontSize: 16,
    padding: 5,
    marginTop: 10,
  },
  backToHomeButton: {
    backgroundColor: COLORS.mainColor,
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 21,
    textDecorationLine: "none",
    marginTop: 20,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orderContainer: {
    width: "100%",
    borderRadius: 10,

    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: (props) =>
      props.orderStatus === 0
        ? "orange"
        : props.orderStatus === 1
        ? "blue"
        : props.orderStatus === 2
        ? "red"
        : COLORS.mainColor,
  },
  expiredOrdersContainer: {
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: COLORS.mainColor,
    paddingTop: 20,
  },
  orderSectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  LoadMoreBtn: {
    backgroundColor: "orange", // Adjust this based on your color scheme
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 21,
    textDecorationLine: "none",
    alignItems: "center",
    marginTop: 20,
    cursor: "pointer",
    transition: { backgroundColor: 0.3, transform: 0.2 },
  },
});

export default EachOrder;
