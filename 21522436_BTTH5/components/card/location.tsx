import React from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

interface LocationCardProps {
  item?: {
    id: string;
    img?: string;
    title?: string;
    address?: string;
  };
  handleClick?: () => void;
}

export default function LocationCard({ item, handleClick }: LocationCardProps) {
  return (
    <View className="relative h-96">
      <TouchableOpacity
        onPress={() => router.push(`/locationDetail/${item?.id || ""}`)}
        className="w-full"
      >
        {/* Image Section */}
        <Image
          source={{
            uri:
              item?.img ||
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/a0/1a/5d/an-lam-retreats-saigon.jpg?w=300&h=-1&s=1",
          }}
          resizeMode="cover"
          className="w-full h-56 object-cover rounded-lg"
        />

        {/* Content Section */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-semibold text-zinc-900 ">
            {item?.title || "Tên địa điểm"}
          </Text>
          <Text numberOfLines={3} className="text-sm text-zinc-900  mt-2">
            {item?.address || "Địa chỉ địa điểm"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
