import "~/global.css";

import * as React from "react";

import { Slot, SplashScreen } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { CameraProvider } from "@/components/CameraProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "~/provider/ThemeProvider";
import { Toaster } from "sonner-native";
import { NotificationProvider } from "@/provider/NotiProvider";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex flex-1">
      <ThemeProvider>
        <NotificationProvider>
          <Slot />
        </NotificationProvider>
        <PortalHost />
        <Toaster />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
