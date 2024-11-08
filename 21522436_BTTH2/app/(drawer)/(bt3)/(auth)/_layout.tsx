// 21522436 - Nguyễn Thị Hồng Nhun
import { Slot, useSegments } from 'expo-router';
import React from 'react';
import { View, ScrollView } from 'react-native';

import { LogoHeader } from '~/components/logoHeader';
import { Text } from '~/components/ui/text';

export default function AuthLayout() {
  const segments = useSegments() as string[];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex h-48 flex-col items-center justify-center bg-white py-2 dark:bg-zinc-900">
        <LogoHeader sizeImage="h-32" noText />
        <Text className="text-2xl font-semibold">
          {segments.includes('register') ? 'Đăng ký' : 'Đăng nhập'}
        </Text>
      </View>
      <Slot />
    </ScrollView>
  );
}
