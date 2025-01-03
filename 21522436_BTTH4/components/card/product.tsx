import React from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";

import { Text } from "~/components/ui/text";
import { Button } from "../ui/button";
import { Plus, Star } from "~/lib/icons";
import { router } from "expo-router";
import { supabase } from "@/supabase/supabase";
import { useAuth } from "~/provider/AuthProvider";
import { useCartCount } from "~/provider/CartCount"; // Import hook useCartCount

interface ProductCardProps {
  data?: {
    id?: number;
    image?: string;
    title?: string;
    price?: number;
    rating?: {
      rate?: number;
      count?: number;
    };
  };
  noText?: boolean;
  width?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  data,
  noText = false,
  width,
}) => {
  const { session } = useAuth();
  const { addCart, removeItem, cartCount } = useCartCount();

  return (
    <View
      className={`${
        width ? width : "w-full"
      } relative overflow-hidden flex flex-col items-center justify-between rounded-lg bg-white shadow dark:bg-zinc-900`}
    >
      <TouchableOpacity
        onPress={() =>
          router.push(`/productDetail/${data?.id}?name=${data?.title}`)
        }
        className="flex flex-col items-center justify-between"
      >
        <Image
          source={{
            uri:
              data?.image ||
              "https://www.gasso.com/wp-content/uploads/2017/04/noimage.jpg",
          }}
          className="aspect-square w-full object-contain bg-white"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(`/productDetail/${data?.id}?name=${data?.title}`)
        }
        className="line-clamp-2 w-full"
      >
        <Text className="line-clamp-2 w-full px-3 pt-2 text-left">
          {data?.title || "Tên sản phẩm"}
        </Text>
      </TouchableOpacity>

      <View className="flex w-full flex-row items-center justify-between gap-2 px-3 pb-2">
        <View className="flex flex-col gap-1">
          <Text className="font-semibold text-red-500">
            ${data?.price?.toFixed(2) || "10.00"}
          </Text>
          <View className="flex flex-row items-center gap-1">
            <Text className="text-[#f59e0b]">
              {data?.rating?.rate?.toFixed(1) || "0.00"}
            </Text>
            <Star fill={"#f59e0b"} className="size-2 text-[#f59e0b]" />
            <Text className="text-zinc-600 dark:text-zinc-300">
              ({data?.rating?.count})
            </Text>
          </View>
        </View>
        <Button
          onPress={() => addCart(data?.id, 1, data?.price)}
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          <Plus className="size-6 text-zinc-600" />
        </Button>
      </View>
    </View>
  );
};
