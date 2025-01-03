// 21522436 - Nguyễn Thị Hồng Nhung

import React, { useState } from 'react';
import { View } from 'react-native';

import DarkSwitch from '~/components/darkModeOption/switch';
import { LogoHeader } from '~/components/logoHeader';
import { Text } from '~/components/ui/text';

const SettingsAndFeedbackScreen = () => {
  return (
    <View className="flex-1 bg-white p-4 dark:bg-black">
      {/* Logo and App Name */}
      <LogoHeader sizeImage="size-32" />

      {/* Switches */}
      <View className="mb-4 flex flex-row justify-between">
        <Text className="text-black dark:text-white">Dark Mode</Text>
        <DarkSwitch />
      </View>
    </View>
  );
};

export default SettingsAndFeedbackScreen;
