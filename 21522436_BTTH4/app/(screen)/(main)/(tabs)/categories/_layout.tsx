import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { router, Slot } from "expo-router";
import { CATEGORIES } from "@/utils/data";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("1");

  return (
    <View className="h-full">
      <View className="w-full h-1/6 min-h-16 max-h-32 mb-2 px-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row gap-3"
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={`rounded-md w-[15%] aspect-[4/3] flex items-center justify-center shadow-md ${
                activeCategory === category.id
                  ? "bg-blue-500"
                  : "bg-white dark:bg-zinc-900"
              }`}
              onPress={() => {
                setActiveCategory(category.id);
                router.push(`/categories/${category.id}`);
              }}
            >
              <Image
                source={category.icon}
                className="w-12 h-12 mb-2"
                resizeMode="contain"
              />
              <Text
                className={`text-center text-sm font-bold ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-zinc-900"
                }`}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Slot />
    </View>
  );
}
