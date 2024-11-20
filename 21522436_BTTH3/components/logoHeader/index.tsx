// 21522436 - Nguyễn Thị Hồng Nhung
import React from 'react';
import { View, Image } from 'react-native';

import { Text } from '~/components/ui/text';

export const LogoHeader = ({
  sizeImage,
  noText = false,
}: {
  sizeImage?: string;
  noText?: boolean;
}) => (
  <View className={`h-fit items-center `}>
    <Image
      source={require('~/assets/logo.png')}
      className={`aspect-square ${!sizeImage ? 'size-16' : sizeImage}`}
    />
    <Text className={`text-xl ${noText ? 'hidden' : ''}`}>NunNun App</Text>
  </View>
);

