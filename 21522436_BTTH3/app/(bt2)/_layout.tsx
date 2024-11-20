// 21522436 - Nguyễn Thị Hồng Nhung
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, View } from 'react-native';

import { Notebook, Settings } from '~/lib/icons/IconList';
import { FontSizeProvider } from '~/provider/FontSizeProvider';

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <FontSizeProvider>
      <Tabs>
        <Tabs.Screen
          name="(notes)"
          options={{
            title: 'Notes',
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-xs ${focused ? 'text-teal-500' : 'text-zinc-500'} 
              dark:${focused ? 'text-teal-500' : 'text-zinc-300'}`}>
                Notes
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Notebook
                fill={focused ? '#14b8a6' : '#fff'}
                className={`size-20  
                ${focused ? 'text-teal-500 dark:text-teal-500' : 'text-zinc-500 dark:text-zinc-300'}`}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colorScheme === 'light' ? '#14b8a6' : '#0d9488' },
            title: 'Settings',
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-xs ${focused ? 'text-teal-500' : 'text-zinc-500'} 
              dark:${focused ? 'text-teal-500' : 'text-zinc-300'}`}>
                Settings
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Settings
                fill={focused ? '#14b8a6' : '#fff'}
                className={`size-20  
                ${focused ? 'text-teal-500 dark:text-teal-500' : 'text-zinc-500 dark:text-zinc-300'}`}
              />
            ),
          }}
        />
      </Tabs>
    </FontSizeProvider>
  );
}
