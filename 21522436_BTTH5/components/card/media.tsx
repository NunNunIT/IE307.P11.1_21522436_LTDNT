import React from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

interface VideoCardProps {
  item?: {
    id: string;
    uri: string;
    mediaType: string
  };
  handleClick?: () => void;
}

export default function VideoCard({ item, handleClick }: VideoCardProps) {
  return (
    <View className="relative h-96 w-full">
      <TouchableOpacity
        onPress={() => router.push(`/videoDetail/${item?.id || ""}`)}
        className="w-full h-full"
      >
        {/* Image Section */}
        <Image
          source={{
            uri:
              item?.uri ||
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/a0/1a/5d/an-lam-retreats-saigon.jpg?w=300&h=-1&s=1",
          }}
          resizeMode="cover"
          className="w-full h-full object-cover rounded-lg"
        />
      </TouchableOpacity>
    </View>
  );
}
