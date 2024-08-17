import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={28}
              />
            )
          }}
        />
        <Tabs.Screen
          name="(weather)"
          options={{
            headerShown: false,
            title: "Weather",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "cloud" : "cloud-outline"}
                color={color}
                size={28}
              />
            ),
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
      </Tabs>
    </Provider>
  );
}
