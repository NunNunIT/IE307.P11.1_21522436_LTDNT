// 21522436 - Nguyễn Thị Hồng Nhung

import Slider from '@react-native-community/slider';
import React from 'react';
import { View } from 'react-native';

import DarkSwitch from '~/components/darkModeOption/switch';
import { LogoHeader } from '~/components/logoHeader';
import { Text } from '~/components/ui/text';
import { useFontSize } from '~/provider/FontSizeProvider';

const SettingsScreen = () => {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <View className="flex-1 bg-white p-4 dark:bg-black">
      {/* Logo and App Name */}
      <LogoHeader sizeImage="size-32" />

      {/* Switches */}
      <View className="my-4 flex flex-row items-center justify-between">
        <Text className="text-black dark:text-white">Dark Mode</Text>
        <DarkSwitch />
      </View>

      <View className="w-full">
        <View className="my-4 flex flex-row items-center justify-between">
          <Text className="text-black dark:text-white">Font size</Text>
          <Text className="text-black dark:text-white">{fontSize}</Text>
        </View>
        <Slider
          className="w-full"
          minimumValue={12}
          maximumValue={36}
          step={2}
          value={fontSize}
          onValueChange={setFontSize}
          minimumTrackTintColor="#14b8a6"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#14b8a6"
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
