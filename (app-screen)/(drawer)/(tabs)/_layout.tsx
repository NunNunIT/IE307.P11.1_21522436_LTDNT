// 21522436 - Nguyễn Thị Hồng Nhung
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Home, Component, Heart, User } from '~/lib/icons';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-xs ${focused ? 'text-teal-500' : 'text-zinc-500'} 
              dark:${focused ? 'text-teal-500' : 'text-zinc-300'}`}>
                Home
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Home
                fill={focused ? '#14b8a6' : '#fff'}
                className={`size-20  
                ${focused ? 'text-teal-500 dark:text-teal-500' : 'text-zinc-500 dark:text-zinc-300'}`}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-xs ${focused ? 'text-teal-500' : 'text-zinc-500'} 
              dark:${focused ? 'text-teal-500' : 'text-zinc-300'}`}>
                Categories
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Component
                fill={focused ? '#14b8a6' : '#fff'}
                className={`size-20  
                ${focused ? 'text-teal-500 dark:text-teal-500' : 'text-zinc-500 dark:text-zinc-300'}`}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            title: 'Favourites',
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-xs ${focused ? 'text-teal-500' : 'text-zinc-500'} 
              dark:${focused ? 'text-teal-500' : 'text-zinc-300'}`}>
                Favourites
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <View className="relative">
                <Heart
                  className={`size-20  
                ${focused ? 'text-teal-500 dark:text-teal-500' : 'text-zinc-500 dark:text-zinc-300'}`}
                  fill={focused ? '#14b8a6' : '#fff'}
                />
                <Text className="absolute -right-2 top-0 z-10 aspect-square size-4 rounded-full bg-red-600 text-center text-[0.5rem] text-white">
                  3
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarLabel: ({ focused }) => (
              <Text
                className={`text-xs ${focused ? 'text-teal-500' : 'text-zinc-500'} 
              dark:${focused ? 'text-teal-500' : 'text-zinc-300'}`}>
                Profile
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <User
                fill={focused ? '#14b8a6' : '#fff'}
                className={`size-20  
                ${focused ? 'text-teal-500 dark:text-teal-500' : 'text-zinc-500 dark:text-zinc-300'}`}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
