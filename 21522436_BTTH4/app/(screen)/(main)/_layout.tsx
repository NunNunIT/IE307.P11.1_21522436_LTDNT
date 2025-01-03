import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "~/provider/AuthProvider";
import Spinner from "react-native-loading-spinner-overlay";
import { CartCountProvider } from "@/provider/CartCount";

export default function NotesLayoutScreen() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href="/(screen)/auth" />;
  }

  return (
    <CartCountProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: ""
          }}
        />
        <Stack.Screen name="settings" options={{ title: "Cài đặt" }} />
        <Stack.Screen name="productDetail/[id]" options={{ title: "" }} />
        <Stack.Screen name="editProfile" options={{ title: "Sửa hồ sơ" }} />
      </Stack>
    </CartCountProvider>
  );
}
