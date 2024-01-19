import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import RoomScreen from "./screens/RoomScreen";
import ReservationForm from "./screens/ReservationForm";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Room" component={RoomScreen} />
        <Stack.Screen name="Form" component={ReservationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;