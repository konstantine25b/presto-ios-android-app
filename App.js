import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import LogIn from "./Components/Authentication/LogIn";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./Components/store";
import Home from "./Components/Pages/Home";
import AllCategories from "./Components/Pages/AllCategories";
import AllRestaurants from "./Components/Pages/AllRestaurants";



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
             <Stack.Screen
              name="Home"
              component={Home}
              
            />
             <Stack.Screen
              name="AllCategories"
              component={AllCategories}
            />
            <Stack.Screen
              name="AllRestaurants"
              component={AllRestaurants}
            />
          
        </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
