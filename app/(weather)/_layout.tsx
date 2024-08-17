import { Stack } from "expo-router";
import { View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff"
        },
        // headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <Stack.Screen name="index" options={{ title: "Weather" }} />
    </Stack>
  );
}
