import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import LogIn from "./Components/Authentication/LogIn";

import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Log In"
              component={LogIn}
              options={{ headerShown: false }}
            />
          
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
