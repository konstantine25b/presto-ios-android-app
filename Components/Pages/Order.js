import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useQuery } from "react-query";
import COLORS from "../Styles/colors";
import { API } from "../../Processing/PrestoAPI";
import EachOrder from "./OrderComponents.js/EachOrder";


const fetchallOrders = async () => {
  const allOrders = await API.getOrders();
  return allOrders;
};
export default function Order() {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Home");
  };

  const {
    data: allOrders,
    isLoading,
    isError,
    refetch,
  } = useQuery(["orders"], () => fetchallOrders(), {
    keepPreviousData: true,
    staleTime: 1000 * 3, // 3 secs
    refetchInterval: 3000, // 3 secs
    refetchIntervalInBackground: true,
    onError: (error) => {
      console.log("Error fetching confirmed orders:", error);
    },
  });

  const [orders, setOrders] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const cancelingOrder = async (orderId) => {
    // Ask the user for confirmation
    try {
      const result = await API.cancelOrder(orderId);
      if (result) {
        // Filter out the canceled order from orders state
        const updatedOrders = orders.filter(
          (order) => order && order.id !== orderId
        );
        setOrders(updatedOrders);
      } else {
        console.log("Order cancellation failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(orders.length / itemsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useLayoutEffect(() => {
    if (allOrders) {
      const currentTime = new Date();
      allOrders.forEach((item) => {
        const requestTime = new Date(item?.orderRequestedDate);
        const timeDifference = requestTime - currentTime;
        setTimeRemaining((prevTimeRemaining) => ({
          ...prevTimeRemaining,
          [item?.id]: timeDifference,
        }));
      });
      setOrders(allOrders);
    }
  }, [allOrders]);

  useEffect(() => {
    // Update timeRemaining every second
    const timer = setInterval(() => {
      const updatedTimeRemaining = { ...timeRemaining };
      for (const orderId in updatedTimeRemaining) {
        updatedTimeRemaining[orderId] -= 1000; // Subtract one second
      }
      setTimeRemaining(updatedTimeRemaining);
    }, 1000);

    return () => {
      clearInterval(timer); // Cleanup interval on unmount
    };
  }, [timeRemaining]);

  const sortedOrders = orders.sort((a, b) => b.id - a.id);
  const paginatedOrders = sortedOrders.slice(start, end);
  return (
    <SafeAreaView>
      <Pressable style={styles.goBackDiv} onPress={handleNavigation}>
        <XMarkIcon
          style={{
            width: 40,
            height: 40,
          }}
          color={COLORS.mainColor}
        />
      </Pressable>

      <ScrollView style={styles.orderDetailsContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Order Details
        </Text>
        <Pressable
          style={styles.backToHomeButton}
          onPress={() => {
            handleNavigation();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 21 }}>
            Add Another Order or See Menu
          </Text>
        </Pressable>

        <View style={styles.avaibleOrdersContainer}>
          <Text style={styles.orderSectionTitle}>Orders</Text>
          {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
          {isError && <Text style={styles.errorText}>Error fetching data</Text>}

          {paginatedOrders?.map((order, index) => (
            <EachOrder
              key={index}
              order={order}
              data={allOrders}
              cancelingOrder={cancelingOrder}
              navigation={navigation}
              timeRemaining={timeRemaining}
             
            />
          ))}
          <View style={styles.paginationButtons}>
            <Pressable
              style={[
                styles.paginationButton,
                { opacity: currentPage === 1 ? 0.5 : 1 },
              ]}
              onPress={handlePrevPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>Previous</Text>
            </Pressable>
            <Pressable
              style={[
                styles.paginationButton,
                {
                  opacity:
                    currentPage === Math.ceil(orders.length / itemsPerPage)
                      ? 0.5
                      : 1,
                },
              ]}
              onPress={handleNextPage}
              disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
            >
              <Text style={styles.paginationButtonText}>Next</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  goBackIcon: {
    width: 40,
    height: 40,
  },
  orderDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backToHomeButton: {
    backgroundColor: COLORS.mainColor,
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 21,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 21,
  },
  avaibleOrdersContainer: {
    marginTop: 20,
  },
  orderSectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 21,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 21,
    textAlign: "center",
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: COLORS.mainColor,
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    textAlign: "center",
    width: "48%",
  },
  paginationButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.mainColor,
    marginTop: 20,
  },
  bottomSpacer: {
    marginBottom: 50,
  },
});
