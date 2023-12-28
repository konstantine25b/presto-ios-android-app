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

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              name="Log In"
              component={LogIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AllCategories" component={AllCategories} />
            <Stack.Screen name="AllRestaurants" component={AllRestaurants} />
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
            <Stack.Screen name="EachRestaurant" component={EachRestaurant} />
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
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
