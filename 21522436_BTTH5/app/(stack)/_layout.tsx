import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{
        title: '',
        headerShown: false
      }}/>
      <Stack.Screen name="image-preview" options={{
        title: "Image Preview"
      }}/>
    </Stack>
  )
}