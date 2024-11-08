// 21522436 - Nguyễn Thị Hồng Nhun
import { Slot } from 'expo-router';
import React from 'react';
import { View, ScrollView } from 'react-native';

import { LogoHeader } from '~/components/logoHeader';

export default function AuthLayout() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex h-48 flex-col items-center justify-center bg-white py-2 dark:bg-zinc-900">
        <LogoHeader sizeImage="h-32" />
      </View>
      <Slot />
    </ScrollView>
  );
}
