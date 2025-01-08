import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
