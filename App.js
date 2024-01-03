import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import LogIn from "./Components/Authentication/LogIn";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./Components/store";
import Home from "./Components/Pages/Home";
import AllCategories from "./Components/Pages/AllCategories";
import AllRestaurants from "./Components/Pages/AllRestaurants";
import Search from "./Components/Pages/Search";
import EachCategoryPage from "./Components/Pages/AllCategoriesComponents/EachCategoryPage";
import EachRestaurant from "./Components/Pages/EachRestaurant";
import EachMenuCategory from "./Components/Pages/EachRestaurantComponents/EachMenuCategory";
import EachFoodCardInfo from "./Components/Pages/EachRestaurantComponents/EachFoodCardInfo";
import BasketPage from "./Components/Pages/BasketPage";
import Confirm from "./Components/Pages/Confirm";
import SuccessOrder from "./Components/Pages/SuccessOrder";
import FailOrder from "./Components/Pages/FailOrder";
import Order from "./Components/Pages/Order";
import EachOrderDetails from "./Components/Pages/OrderComponents.js/EachOrderDetails";
import COLORS from "./Components/Styles/colors";
import SignUp from "./Components/Authentication/SignUp";
import TopRestaurants from "./Components/Pages/TopRestaurants";
import Profile from "./Components/Profile/Profile";
import { useState } from "react";
import UserContext from "./Components/Authentication/Context/UserContext";
import Account from "./Components/Profile/Account";
import ChangePassword from "./Components/Profile/AccountComponents/ChangePassword";



const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();



export default function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Provider store={store}>
            <Stack.Navigator>
              <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="AllCategories" component={AllCategories} />
              <Stack.Screen
                name="AllRestaurants"
                component={AllRestaurants}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TopRestaurants"
                component={TopRestaurants}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EachCategoryPage"
                component={EachCategoryPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EachRestaurant"
                component={EachRestaurant}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EachMenuCategory"
                component={EachMenuCategory}
              />
              <Stack.Screen
                name="EachFoodCardInfo"
                component={EachFoodCardInfo}
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="BasketPage"
                component={BasketPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Confirm"
                options={{ headerShown: false }}
                component={Confirm}
              />
              <Stack.Screen
                name="Success"
                component={SuccessOrder}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Fail"
                component={FailOrder}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Order"
                component={Order}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EachOrder"
                component={EachOrderDetails}
                options={{
                  title: "Order's Detailed Info",
                  headerStyle: {
                    fontSize: 20,
                  },
                  headerTintColor: COLORS.mainColor,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: "Sign Up",
                  headerStyle: {
                    fontSize: 20,
                  },
                  headerTintColor: COLORS.mainColor,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "Profile",
                  headerStyle: {
                    fontSize: 20,
                  },
                  headerTintColor: COLORS.mainColor,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{
                  title: "Account Info",
                  headerStyle: {
                    fontSize: 20,
                  },
                  headerTintColor: COLORS.mainColor,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  title: "Edit Password",
                  headerStyle: {
                    fontSize: 20,
                  },
                  headerTintColor: COLORS.mainColor,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              />
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
