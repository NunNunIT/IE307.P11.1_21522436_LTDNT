import { FontAwesome } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function PlaceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Place",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("Navigating to addLocation");
                router.push("/addLocation");
              }}
              style={{ padding: 10, backgroundColor: "red" }}
              activeOpacity={0.7}
            >
              <FontAwesome name="plus-circle" size={24} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="addLocation"
        options={{
          title: "Add New Place",
        }}
      />
      <Stack.Screen name="locationDetail/[id]" />
      <Stack.Screen name="map/[id]" />
      <Stack.Screen name="choose-in-map" options={{ title: "Choose on Map" }} />
    </Stack>
  );
}
