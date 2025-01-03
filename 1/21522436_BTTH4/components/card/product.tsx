// 21522436 - Nguyễn Thị Hồng Nhung
import React from 'react';
import { View, Image } from 'react-native';

import { Text } from '~/components/ui/text';
import { Button } from '../ui/button';
import { Plus, Star } from '~/lib/icons/IconList';

interface ProductCardProps {
  data?: {
    image?: string;
    title?: string;
    price?: number;
    rating?: {
      rate?: number;
      count?: number;
    };
  };
  noText?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, noText = false }) => (
  <View className="flex w-full max-w-xs flex-col items-center justify-between rounded-lg bg-white shadow dark:bg-zinc-900">
    <Image
      source={{
        uri: data?.image || 'https://www.gasso.com/wp-content/uploads/2017/04/noimage.jpg',
      }}
      className="aspect-square w-full object-contain"
      resizeMode="contain"
    />
    <Text className="line-clamp-2 w-full px-3 pt-2 text-left text-xl">
      {data?.title || 'Tên sản phẩm'}
    </Text>
    <View className="flex w-full flex-row items-center justify-between gap-2 px-3 pb-2">
      <View className="flex flex-col gap-1">
        <Text className="font-semibold text-red-500">${data?.price?.toFixed(2) || '10.00'}</Text>
        <View className="flex flex-row items-center gap-1">
          <Text className="text-[#f59e0b]">{data?.rating?.rate?.toFixed(1) || '5'}</Text>
          <Star fill={'#f59e0b'} className="size-2 text-[#f59e0b]" />
          <Text className="text-zinc-600 dark:text-zinc-300">({data?.rating?.count})</Text>
        </View>
      </View>
      <Button variant="secondary" size="icon" className="rounded-full">
        <Plus className="size-6 text-zinc-600" />
      </Button>
    </View>
  </View>
);
