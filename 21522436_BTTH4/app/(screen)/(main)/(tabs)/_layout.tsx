import React from "react";
import { View, Image, Platform } from "react-native";
import { router, Tabs } from "expo-router";
import { ShoppingCart, Home, Component, User, Settings } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { HapticTab } from "@/components/HapticTab";
import { useCartCount } from "~/provider/CartCount"; // Import useCartCount

export default function TabLayout() {
  const { cartCount } = useCartCount(); // Sử dụng useCartCount

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "#14b8a6",
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
        headerLeft: () => (
          <Image
            source={require("~/assets/images/logo2.png")}
            resizeMode="cover"
            className="relative w-[120px] h-14 ml-2"
          />
        ),
        headerTitle: "",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ color }) => <Component color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) => (
            <View className="relative">
              <ShoppingCart color={color} />
              {cartCount > 0 && (
                <Text className="absolute -right-2 top-0 z-10 aspect-square size-4 rounded-full bg-red-600 text-center text-[0.5rem] text-white">
                  {cartCount}
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <User color={color} />,
          headerRight: () => (
            <View className="flex flex-row gap-3 mr-2">
              <Button
                size="icon"
                variant="ghost"
                onPress={() => router.push("/settings")}
              >
                <Settings className="size-6 text-black dark:text-white" />
              </Button>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
