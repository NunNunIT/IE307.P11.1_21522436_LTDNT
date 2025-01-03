import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAuth } from "~/provider/AuthProvider";
import Spinner from "react-native-loading-spinner-overlay";

export default function NotesLayoutScreen() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href="/(screen)/auth" />;
  }
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: ""
          }}
        />
        <Stack.Screen name="settings" options={{ title: "Cài đặt" }} />
        <Stack.Screen name="noti" options={{ title: "Thông báo" }} />
        <Stack.Screen name="notiDetail/[id]" options={{ title: "" }} />
        <Stack.Screen name="filter" options={{ title: "" }} />
        <Stack.Screen name="editProfile" options={{ title: "Sửa hồ sơ" }} />
        <Stack.Screen name="permissionError" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
